/**
 *
 * @param {string} date
 * @returns {string} - date formatted
 */
export const dateFormatter = (date) => {
  if (!date) return null;
  const strDate = date.split("/");
  return `${strDate[1]}/${strDate[0]}/${strDate[2]}`;
};
/**
 *
 * @param {string} date
 * @returns {string} - date formatted
 */
export const newDateFormatter = (date) => {
  if (!date) return null;
  else {
    const dateStr = `${("00" + date.getDate()).slice(-2)}/${(
      "00" +
      (date.getMonth() + 1)
    ).slice(-2)}/${date.getFullYear()}`;
    return dateStr;
  }
};
