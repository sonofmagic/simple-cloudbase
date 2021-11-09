const _ = require('lodash')

const upperCaseChars = []
for (let i = 0; i < 26; i++) {
  upperCaseChars.push(String.fromCharCode(65 + i))
}
const lowerCaseChars = []
for (let i = 0; i < 26; i++) {
  lowerCaseChars.push(String.fromCharCode(97 + i))
}
const numbers = []
for (let i = 0; i < 10; i++) {
  numbers.push(i)
}

const allChars = upperCaseChars.concat(lowerCaseChars).concat(numbers)
const lowerCaseAndNumbers = lowerCaseChars.concat(numbers)
function getRandomId (num) {
  return _.sampleSize(allChars, num).join('')
}
function getRandomIdWithoutCase (num) {
  return _.sampleSize(lowerCaseAndNumbers, num).join('')
}

/** @type {import('wx-server-sdk').ICloud.WXContext} */
const ctx = {
  APPID: `wx${getRandomIdWithoutCase(16)}`,
  CLIENTIP: '114.114.114.114',
  CLIENTIPV6: '::ffff:114.114.114.114',
  ENV: `dev-${getRandomIdWithoutCase(16)}`,
  UNIONID: getRandomId(28),
  SOURCE: 'wx_devtools',
  FROM_APPID: '',
  FROM_OPENID: '',
  FROM_UNIONID: '',
  OPENID: getRandomId(28),
  OPEN_DATA_INFO: ''
}

module.exports = ctx
