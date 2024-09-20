export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  };
  
  export const isClient = (req, res, next) => {
    if (req.user && req.user.role === 'client') {
      return next();
    }
    return res.status(403).json({ message: 'Access denied. Clients only.' });
  };
  