/**
 * забирает из урла текущий хеш
 */
const getIdInHash = () => {
  return document.location.hash.match(/\w*$/gim)[0];
};
export { getIdInHash };
