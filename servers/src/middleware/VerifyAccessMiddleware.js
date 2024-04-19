export const hrdOnly = async (req, res, next) => {
  const role = req.users.role;
  if (role === "admin") {
    next();
  } else {
    return res.sendStatus(403);
  }
};
export const candidateOnly = async (req, res, next) => {
  const role = req.users.role;
  if (role === "candidate") {
    next();
  } else {
    return res.sendStatus(403);
  }
};
