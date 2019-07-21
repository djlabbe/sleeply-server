const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

function authenticate(request) {
  let authToken = request.req.get('Authorization') || '';
  let userId = null;

  if (authToken) {
    const jwtToken = jwt.verify(
      authToken.replace('Bearer ', ''),
      keys.jwtSecret
    );
    userId = jwtToken.userId;
  }

  if (!userId) throw new Error('Not authorized');
  return userId;
}

function admin(request) {
  let authToken = request.req.get('Authorization') || '';
  let userId = null;
  let role = null;

  if (authToken) {
    const jwtToken = jwt.verify(
      authToken.replace('Bearer ', ''),
      keys.jwtSecret
    );
    userId = jwtToken.userId;
    role = jwtToken.role;
  }

  if (!userId) throw new Error('Not authorized');
  if (role !== 'ADMIN') throw new Error('Not authorized');
  return userId;
}

module.exports = {
  authenticate,
  admin
};
