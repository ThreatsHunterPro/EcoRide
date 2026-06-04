import jwt from 'jsonwebtoken';

/**
 * Authentication Middleware
 * Checks JWT validity in request headers
 */
export default function authMiddleware (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied: No token provided.' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid token format (Bearer required).' });
  }

  const token = parts[1];

  jwt.verify(token, process.env.JWT_SECRET || process.env.SECRET_KEY, (err, userPayload) => {
    if (err) {
      return res.status(403).json({ error: 'Session expired or invalid token.' });
    }

    req.user = userPayload; 
    next();
  });
};