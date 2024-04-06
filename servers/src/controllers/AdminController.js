import Admin from "../models/AdminModel.js";
import Users from "../models/UsersModel.js";
import bcrypt from "bcrypt";

export const getAllAdmin = async (req, res) => {
  try {
    const admin = await Admin.findAll();
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createAdmin = async (req, res) => {
  const { Password, UserEmail, Role, AdminName, ConfirmPassword } = req.body;
  const findEmail = await Users.findOne({ where: { UserEmail } });
  if (findEmail) {
    return res.status(503).json({ message: "email sudah digunakan" });
  }
  if (Password !== ConfirmPassword) {
    return res.status(500).json({ message: "password tidak sama" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(Password, salt);
  try {
    const admin = await Admin.create({
      AdminName,
    });
    await Users.create({
      Password: hashPassword,
      UserEmail,
      Role,
      adminId: admin.id,
    });
    res.status(200).json({ message: "admin berhasil ditambah" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
