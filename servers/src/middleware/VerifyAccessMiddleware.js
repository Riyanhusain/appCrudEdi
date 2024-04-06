export const hrdOnly = async (req, res, next) => {
  const role = req.users.role;
  if (role === "admin") {
    next();
  } else {
    res.sendStatus(403);
  }
};
