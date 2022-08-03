import { dateFormatter } from "./dateFormatter";

/**
 *
 * @param {Array} data
 * @param {number} index
 * @returns {number} - sorted data
 */
export const ascName = (data, index) => {
  data.sort(function (a, b) {
    if (b[index] < a[index]) {
      return 1;
    }
    if (b[index] > a[index]) {
      return -1;
    }
    return 0;
  });
};

/**
 *
 * @param {Array} data
 * @param {number} index
 * @returns {number} - sorted data
 */
export const descName = (data, index) => {
  data.sort(function (a, b) {
    if (b[index] < a[index]) {
      return -1;
    }
    if (b[index] > a[index]) {
      return 1;
    }
    return 0;
  });
};

/**
 *
 * @param {Array} data
 * @param {number} index
 * @returns {number} - sorted data
 */
export const ascDate = (data, index) => {
  data.sort(function (a, b) {
    return (
      new Date(dateFormatter(a[index])) - new Date(dateFormatter(b[index]))
    );
  });
};

/**
 *
 *
 * @param {Array} data
 * @param {number} index
 * @returns {number} - sorted data
 */
export const descDate = (data, index) => {
  data.sort(function (a, b) {
    return (
      new Date(dateFormatter(b[index])) - new Date(dateFormatter(a[index]))
    );
  });
};
