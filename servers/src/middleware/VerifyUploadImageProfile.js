const verifyUploadImageProfile = async (req, res, next) => {
  const image = req.file.path;
  if (image === undefined) return res.status(404), json("file nya kosong");
  next();
};
export default verifyUploadImageProfile;
