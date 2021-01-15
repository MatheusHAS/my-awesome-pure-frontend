/**
 * Add a debounce time to dispatch function
 * @param {function} fn [custom function to dispath]
 * @param {number} wait [time to wait on debounce]
 */
const debounce = (fn, wait) => {
  let timeout

  return () => {
    const run = () => fn.apply(this, arguments)

    clearTimeout(timeout)
    timeout = setTimeout(run, wait)
  }
}

export default debounce
export { debounce }
