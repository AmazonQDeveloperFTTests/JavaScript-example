/**
* Sliding Window:
* This pattern involve creating a window which can either be
* an array or numbers from one position to another.
*
* Depending on a certain condition, the window either increases
* or closes (and a new window is created).
*
* Very useful for keeping track of a subset of data in an
* array/string etc.
*
* Time Complexity: Best - O(n);
*
* Examples:
* slidingWindow([1,2,5,2,8,1,5],2) // returns 10
* slidingWindow([1,2,5,2,8,1,5],15) // returns null
* slidingWindow([5,2,6,9],3) // returns 17
 * @param {[Int]} arr - An array of integers on which we will perform the test.
 * @param {Int} num - An integer that displays the size of the window you want to check.
 * @returns {Int / Null} - Returns a total of N consecutive numbers or null
 */

function slidingWindow (arr, num) {
  // Edge Case:
  // If the length of the array shorter than the window size (num) return null.
  if (arr.length < num) return null
  // The highest amount of consecutive numbers
  let maxSum = 0
  // Temp amount of consecutive numbers - For comparative purposes
  let tempSum = 0
  // loop over the array {num} times and save their total amount in {maxSum}
  for (let i = 0; i < num; i++) {
    maxSum += arr[i]
  }
  // initialize {tempSum} to {maxSum}.
  tempSum = maxSum
  // loop over the array n times
  for (let i = num; i < arr.length; i++) {
    // Add the next num in the array and remove the first one
    tempSum = tempSum - arr[i - num] + arr[i]
    // save the largest number between {maxNum} and {tempNum} in maxSum.
    maxSum = Math.max(maxSum, tempSum)
  }
  return maxSum
}

// ↓↓↓↓↓↓↓↓↓↓↓↓ Test The Function ↓↓↓↓↓↓↓↓↓↓↓↓

console.log(slidingWindow([1, 2, 5, 2, 8, 1, 5], 2)) // return 10
console.log(slidingWindow([1, 2, 5, 2, 8, 1, 5], 15)) // return null
console.log(slidingWindow([5, 2, 6, 9], 3)) // return 17
