const parseIp = (req) =>
  req.headers['x-forwarded-for']?.split(',').shift()
  || req.socket?.remoteAddress

const parseBoolean = (str) => {
  switch (str) {
    case "false" || "False":
      return false
    case "true" || "True":
      return true
    case "" || null || undefined:
      return false
    default:
      return true
  }  
}
const isString = (str) => typeof(str) === 'string' || str instanceof String;

const isArray = (arr) => arr instanceof Array;

module.exports = {
  parseIp,
  parseBoolean,
  isString,
  isArray,
}