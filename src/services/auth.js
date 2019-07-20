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

module.exports = {
  authenticate
};
