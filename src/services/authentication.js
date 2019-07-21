const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

function tradeTokenForUser(authToken) {
  let userId = authToken
    ? jwt.verify(authToken.replace('Bearer ', ''), keys.jwtSecret).userId
    : null;

  return userId;
}

function requireAuth(user) {
  if (!user) throw new Error('Not authorized');
}

function requireAdmin(user) {
  if (user.role !== 'ADMIN') throw new Error('Not authorized');
}

// Not currently used. Previously, this was called on every graph end point,
// resulting in a lot of extra processing for complex queries.
function authenticateRequest(request) {
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

// Not currently used. Previously, this was called on every graph end point,
// resulting in a lot of extra processing for complex queries.
function authenticateAdminRequest(request) {
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
  tradeTokenForUser,
  requireAuth,
  requireAdmin,
  authenticateRequest,
  authenticateAdminRequest
};
