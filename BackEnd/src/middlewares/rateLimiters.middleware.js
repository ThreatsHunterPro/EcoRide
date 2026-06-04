import rateLimit from 'express-rate-limit';

const createRateLimiter = ({ windowMs, max, errorMessage }) => {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        status: false,
        errorCode: 'RATE_LIMIT_EXCEEDED',
        message: errorMessage,
      });
    },
  });
};

export const loginLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 10,
  errorMessage: 'Trop de tentatives de connexion. Réessayez dans 5 minutes.',
});

export const usersLimiter = createRateLimiter({
  windowMs: 1 * 60 * 1000,
  max: 5,
  errorMessage: 'Trop de requêtes sur le service utilisateur.',
});