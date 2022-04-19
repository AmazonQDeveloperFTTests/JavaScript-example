/*
    author: PatOnTheBack
    license: GPL-3.0 or later

    Modified from:
        https://github.com/TheAlgorithms/Python/blob/master/maths/findLcm.py

    More about LCM:
        https://en.wikipedia.org/wiki/Least_common_multiple
*/

'use strict'

// Find the LCM of two numbers.
const findLcm = (num1, num2) => {
  // If the input numbers are less than 1 return an error message.
  if (num1 < 1 || num2 < 1) {
    return 'Please enter values greater than zero.'
  }

  // If the input numbers are not integers return an error message.
  if (num1 !== Math.round(num1) || num2 !== Math.round(num2)) {
    return 'Please enter whole numbers.'
  }

  // Get the larger number between the two
  const maxNum = Math.max(num1, num2)
  let lcm = maxNum

  while (true) {
    if (!(lcm % num1) && !(lcm % num2)) break
    lcm += maxNum
  }
  return lcm
}

export { findLcm }
