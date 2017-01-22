const errorObj = (obj) => {
  return new Error(JSON.stringify(obj));
}

const checkIsAdmin = ({ user }) => {
  const { isAdmin } = user;
  if (!isAdmin) {
    throw errorObj({error: 'Unauthorised'});
  }
}

module.exports = {
  checkIsAdmin, errorObj
}
