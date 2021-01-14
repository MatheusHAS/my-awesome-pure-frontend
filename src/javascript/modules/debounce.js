const debounce = (fn, wait) => {
  let timeout;

  return () => {
    const run = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(run, wait);
  };
};

export default debounce;
export { debounce };
