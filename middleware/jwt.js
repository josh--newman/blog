module.exports = (err, req, res) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'Invalid token'});
  }
}
