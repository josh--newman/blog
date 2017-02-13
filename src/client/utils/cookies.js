export const getCookie = (name) => {
  let value = `; ${document.cookie}`;
  let parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

export const parseToken = (token = '') => {
  if (!token) { return false; }
  const pieces = token.split('.');

  if (pieces.length !== 3) { return false; }

  const decoded = window.atob(pieces[1]);
  try {
    return JSON.parse(decoded)
  } catch(e) {
    return false;
  }
}

export const getUser = () => {
  return parseToken(getCookie('jwt'));
}

export const logout = () => {
  document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  window.location.replace('/');
}

export const validateUser = () => {
  const user = getUser();
  if (user && user.isAdmin) {
    return true;
  }
  return false;
}
