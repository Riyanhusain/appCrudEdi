import Admin from "../models/AdminModel.js";
import Candidate from "../models/CandidateModel.js";
import Users from "../models/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const loginUser = async (req, res) => {
  const { Password, UserEmail } = req.body;
  if (!Password || !UserEmail) {
    return res
      .status(500)
      .json({ message: "email atau password tidak boleh kosong" });
  }
  try {
    const user = await Users.findOne({
      where: { UserEmail },
      include: [{ model: Candidate }, { model: Admin }],
    });
    if (!user) {
      return res.status(404).json({ message: "email tidak terdaftar" });
    }
    const match = await bcrypt.compare(Password, user.Password);
    if (!match) {
      res.status(500).json({ message: "password yang anda masukan salah" });
    }
    const payload = {
      userId: user.id,
      email: user.UserEmail,
      role: user.Role,
    };
    const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "60s",
    });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    await Users.update({ refreshToken }, { where: { id: user.id } });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(403);
  }
  try {
    const findRefreshToken = await Users.findOne({
      where: { refreshToken },
      include: [{ model: Candidate }, { model: Admin }],
    });
    if (!findRefreshToken) {
      return res.sendStatus(403);
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.sendStatus(403);
        } else {
          const payload = {
            userId: findRefreshToken.id,
            email: findRefreshToken.UserEmail,
            role: findRefreshToken.Role,
          };
          const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1d",
            }
          );
          res.json({ accessToken });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
export const registerUser = async (req, res) => {
  const { UserEmail, Password, ConfirmPassword, Role } = req.body;
  if (!UserEmail || !Password || !ConfirmPassword) {
    return res.status(500).json({ message: "lengkapi data anda" });
  }
  const users = await Users.findOne({ where: { UserEmail } });
  if (users) {
    return res.status(500).json({ message: "email sudah digunakan" });
  }
  if (Password !== ConfirmPassword) {
    return res.status(500).json({ message: "password tidak sama" });
  }
  console.log(req.body);
  const salt = await bcrypt.genSalt(10);
  const hashPasword = await bcrypt.hash(Password, salt);
  try {
    await Users.create({
      UserEmail,
      Password: hashPasword,
      Role,
    });
    res.status(200).json({ message: "anda berhasil mendaftar" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: message.error });
  }
};

export const logoutUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(403);
  }
  try {
    const findUser = await Users.findOne({ where: { refreshToken } });
    if (!findUser) {
      return res.sendStatus(403);
    }
    await Users.update({ refreshToken: null }, { where: { id: findUser.id } });
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "anda telah keluar" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
