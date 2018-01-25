const formatTime = (date, mun) => {
  if (mun != 0) {
    date.setMonth(date.getMonth() + mun);
  }
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = mun != 0 ? new Date(year, month, 0).getDate() : date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}