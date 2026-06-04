/**
 * Admin Restriction Middleware
 * Checks the role_id decoded by authMiddleware
 */
export default function adminMiddleware(req, res, next) {
  // FIXED: Check for role_id === 1 instead of role === 'admin'
  if (!req.user || Number(req.user.role_id) !== 1) {
    return res.status(403).json({ 
      error: 'Access denied: Administrator rights required.' 
    });
  }
  next();
};