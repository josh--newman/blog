module.exports = function formatError(err) {
  return JSON.parse(err.message);
}
