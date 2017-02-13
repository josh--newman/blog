const omit = require('lodash/omit');

module.exports = function formatError(err) {
  const originalErr = err.originalError;
  if (!originalErr) return err;

  const locations = err.locations;
  const path = err.path;
  if (originalErr.statusCode) {
    const fields = omit(originalErr, 'stack', 'originalError');
    return Object.assign(fields, {
      message: originalErr.message,
      locations,
      path,
    });
  }
  return err;
}
