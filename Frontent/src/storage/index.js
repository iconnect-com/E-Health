export function getStoredUser() {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
}

export function setStoredUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

// STUB: save login token to local storage
export function setLoginToken(token) {
  localStorage.setItem('token', JSON.stringify(token));
}

// STUB: remove login token to local storage
export function removeToken() {
  localStorage.removeItem('token');
  localStorage.clear();
}

// STUB: get login token from local storage
export function getLoginToken() {
  const storedToken = localStorage.getItem('token');

  return storedToken ? JSON.parse(storedToken) : null;
}

export function loggedInUser() {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
}
