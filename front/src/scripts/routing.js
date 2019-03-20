/**
 * забирает из урла текущий хеш
 */
const getIdInHash = (location) => {
  return location.hash.match(/\w*$/gim)[0];
};
export { getIdInHash };
