const debounce = (method, delay = 100) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      method(...args);
    }, delay);
  }
}
const util = {
  debounce
};
export default util;