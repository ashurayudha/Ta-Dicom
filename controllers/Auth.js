import User from "../models/UserModel.js";
import Roles from "../models/RoleModel.js";
import argon2 from "argon2";

// login
export const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Wrong Password" });
  req.session.userId = user.uuid;
  // const uuid = user.uuid;
  // const name = user.name;
  // const email = user.email;
  // const phoneNumber = user.phoneNumber;
  // const gender = user.gender;
  // const role = user.roleId;
  res.status(200).json({ msg: "Login success" });
};

// get me
export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please login to your account!" });
  }
  const user = await User.findOne({
    attributes: ["id", "uuid", "name", "email", "phoneNumber", "profileImage", "gender", "roleId", "createdAt", "updatedAt"],
    where: {
      uuid: req.session.userId,
    },
    include: [
      {
        model: Roles,
        attributes: ["id", "uuid", "role", "description"],
      },
    ],
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.status(200).json(user);
};

// logout
export const Logout = (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please login to your account!" });
  }
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ msg: "Can't logout" });
    res.status(200).json({ msg: "You have been logout" });
  });
};
