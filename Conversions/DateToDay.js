/*
                    DateToDay Method
                    ----------------
    The DateToDay method takes a date in string format and
    returns the name of a day. The approach behind this method
    is very simple, we first take a string date and check
    whether their date is valid or not, if the date is valid
    then we do this But apply the algorithm shown below. The
    algorithm shown below gives us the number of the day and
    finally converts it to the name of the day.

    Algorithm & Explanation : https://en.wikipedia.org/wiki/Zeller%27s_congruence
*/

// Array holding name of the day: Saturday - Sunday - Friday => 0 - 1 - 6
const daysNameArr = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

const DateToDay = (date) => {
  // firstly, check that input is a string or not.
  if (typeof date !== 'string') {
    return new TypeError('Argument is not a string.')
  }
  // extract the date
  let [day, month, year] = date.split('/').map((x) => Number(x))
  // check the data are valid or not.
  if (day < 1 || day > 31 || month > 12 || month < 1) {
    return new TypeError('Date is not valid.')
  }

  // In case of Jan and Feb:
  // Year: we consider it as previous year
  // e.g., 1/1/1987 here year is 1986 (-1)
  // Month: we consider value as 13 & 14 respectively
  if (month < 3) {
    year--
    month += 12
  }

  // divide year to century and yearDigit value.
  const yearDigit = (year % 100)
  const century = Math.floor(year / 100)

  /**
   * Algorithm implementation
   *
   * In the mathematics modulo operations, truncated division is used mostly in most of programming languages.
   * Truncation defines quotient part (integer part) q = trunc(a/n), remainder has same sign as dividend.
   * -2 mod 7 return result of -2 => console.log(-2 % 7) => -2
   *
   * To overcome this problem, to ensure positive numerator, formula is modified by replacing -2J with +5J (J => century)
   *
   * Following example shows issue with modulo division
   * 1. For date 2/3/2014 with old formula - (2 * century) weekDay comes as -6 and wrong day
   * 2. With computer logic + (5 * century) it gives proper valid day as Sunday
   */
  const weekDay = (day + Math.floor((month + 1) * 2.6) + yearDigit + Math.floor(yearDigit / 4) + Math.floor(century / 4) + (5 * century)) % 7

  // return the weekDay name.
  return daysNameArr[weekDay]
}

// Example : DateToDay("18/12/2020") => Friday

export { DateToDay }
