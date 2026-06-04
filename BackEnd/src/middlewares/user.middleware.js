import User from "../models/user.model.js";

async function userMiddleware(req, res, next) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Utilisateur non authentifié' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: 'Utilisateur introuvable' });
    }

    req.user = user;
    next();
  } 
  catch (err) {
    next(err);
  }
}

export default userMiddleware;