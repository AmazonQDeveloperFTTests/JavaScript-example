const list = []
// https://en.wikipedia.org/wiki/Generalizations_of_Fibonacci_numbers#Extension_to_negative_integers
const FibonacciIterative = (nth) => {
  const sign = nth < 0
  if (sign) n = -n
  const sequence = [0]

  if (nth >= 1) sequence.push(1)
  if (nth >= 2) sequence.push(sign ? -1 : 1)

  for (let i = 2; i < nth; i++) {
    sequence.push(
      sign ?
      sequence[i - 2] - sequence[i - 1]
      :
      sequence[i - 1] + sequence[i - 2]
    )
  }

  return sequence
}

const FibonacciRecursive = (number) => {
  return (() => {
    switch (list.length) {
      case 0:
        list.push(0)
        return FibonacciRecursive(number)
      case 1:
        list.push(1)
        return FibonacciRecursive(number)
      case number + 1:
        return list
      default:
        const sgn = number < 0
        list.push(
          sgn ?
          list.at(-2) - list.at(-1)
          :
          list.at(-1) + list.at(-2)
        )
        return FibonacciRecursive(number)
    }
  })()
}

const dict = new Map()

const FibonacciRecursiveDP = (stairs) => {
  const sgn = stairs < 0
  if (sgn) stairs *= -1

  if (stairs === 0) return 0
  if (stairs === 1) return 1

  // Memoize stair count
  if (dict.has(stairs)) return dict.get(stairs)

  const res = sgn
    ? FibonacciRecursiveDP(stairs - 1) - FibonacciRecursiveDP(stairs)
    : FibonacciRecursiveDP(stairs) + FibonacciRecursiveDP(stairs - 1)

  dict.set(stairs, res)

  return res
}

// Algorithms
// Calculates Fibonacci(n) such that Fibonacci(n) = Fibonacci(n - 1) + Fibonacci(n - 2)
// Fibonacci(0) = Fibonacci(1) = 1
// Uses a bottom up dynamic programming approach
// Solve each sub-problem once, using results of previous sub-problems
// which are n-1 and n-2 for Fibonacci numbers
// Although this algorithm is linear in space and time as a function
// of the input value n, it is exponential in the size of n as
// a function of the number of input bits
// @Satzyakiz

const FibonacciDpWithoutRecursion = (number) => {
  const sgn = number < 0
  if (sgn) number *= -1
  const table = [0]
  table.push(1)
  table.push(sgn ? -1 : 1)
  for (let i = 2; i < number; ++i) {
    table.push(
      sgn ?
      table[i - 1] - table[i]
      :
      table[i] + table[i - 1]
    )
  }
  return table
}

// Using Matrix exponentiation to find n-th fibonacci in O(log n) time

const copyMatrix = (A) => {
  return A.map(row => row.map(cell => cell))
}

const Identity = (size) => {
  const isBigInt = typeof size === 'bigint'
  const ZERO = isBigInt ? 0n : 0
  const ONE = isBigInt ? 1n : 1
  size = Number(size)
  const I = Array(size).fill(null).map(() => Array(size).fill())
  return I.map((row, rowIdx) => row.map((_col, colIdx) => {
    return rowIdx === colIdx ? ONE : ZERO
  }))
}

// A of size (l x m) and B of size (m x n)
// product C will be of size (l x n).
// both matrices must have same-type numeric values
// either both BigInt or both Number
const matrixMultiply = (A, B) => {
  A = copyMatrix(A)
  B = copyMatrix(B)
  const isBigInt = typeof A[0][0] === 'bigint'
  const l = A.length
  const m = B.length
  const n = B[0].length // Assuming non-empty matrices
  const C = Array(l).fill(null).map(() => Array(n).fill())
  for (let i = 0; i < l; i++) {
    for (let j = 0; j < n; j++) {
      C[i][j] = isBigInt ? 0n : 0
      for (let k = 0; k < m; k++) {
        C[i][j] += A[i][k] * B[k][j]
      }
    }
  }
  return C
}

/**
 * Computes A raised to the power n i.e. pow(A, n) where A is a square matrix
 * @param {*} A the square matrix
 * @param {*} n the exponent
 */
// A is a square matrix
const matrixExpo = (A, n) => {
  A = copyMatrix(A)
  const isBigInt = typeof n === 'bigint'
  const ZERO = isBigInt ? 0n : 0
  const TWO = isBigInt ? 2n : 2

  // Just like Binary exponentiation mentioned in ./BinaryExponentiationIterative.js
  let result = Identity((isBigInt ? BigInt : Number)(A.length)) // Identity matrix
  while (n > ZERO) {
    if (n % TWO !== ZERO) result = matrixMultiply(result, A)
    n /= TWO
    if (!isBigInt) n = Math.floor(n)
    if (n > ZERO) A = matrixMultiply(A, A)
  }
  return result
}

const FibonacciMatrixExpo = (n) => {
  // F(0) = 0, F(1) = 1
  // F(n) = F(n-1) + F(n-2)
  // Consider below matrix multiplication:

  // | F(n) |   |1  1|   |F(n-1)|
  // |      | = |    | * |      |
  // |F(n-1)|   |1  0|   |F(n-2)|

  // Let's rewrite it as F(n, n-1) = A * F(n-1, n-2)
  // or                  F(n, n-1) = A * A * F(n-2, n-3)
  // or                  F(n, n-1) = pow(A, n-1) * F(1, 0)

  if (n === 0 || n === 0n) return n

  const sgn = n < 0
  if (sgn) n = -n

  const isBigInt = typeof n === 'bigint'
  const ZERO = isBigInt ? 0n : 0
  const ONE = isBigInt ? 1n : 1

  const A = [
    [ONE, ONE],
    [ONE, ZERO]
  ]

  const poweredA = matrixExpo(A, n - ONE) // A raised to the power n-1
  let F = [
    [ONE],
    [ZERO]
  ]
  F = matrixMultiply(poweredA, F)
  return F[0][0] * (sgn ? (-ONE) ** (n + ONE) : ONE)
}

export { FibonacciDpWithoutRecursion }
export { FibonacciIterative }
export { FibonacciRecursive }
export { FibonacciRecursiveDP }
export { FibonacciMatrixExpo }
