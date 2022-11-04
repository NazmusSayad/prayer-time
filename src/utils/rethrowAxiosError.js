export default err => {
  throw new Error(err.response?.data?.message || err.message)
}