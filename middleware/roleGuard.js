roleGuard = (role) => (req, res, next) => {
    // console.log(req.user);
    if (!req.user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (!role.some((role) => req.user.role.includes(role))) {
      return res.status(403).json({ message: "role not match" });
    }
    next();
  };
  
  module.exports = roleGuard;
  