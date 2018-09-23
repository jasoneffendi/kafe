export default (duration) => {
  let date = new Date(null)
  date.setSeconds(duration)
  let result = null
  if (duration - 3600 > 0) {
    result = date.toISOString().substr(11, 8)
  } else {
    result = date.toISOString().substr(14, 5)
  }
  console.log(result)
  return result
}
