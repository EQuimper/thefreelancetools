/**
 * Capitalize first letter
 *
 * @param  {string} str - The word we want to capitalize
 * @returns {string}
 */
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
