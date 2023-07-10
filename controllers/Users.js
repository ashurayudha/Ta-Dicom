import Users from "../models/UserModel.js";
import argon2 from "argon2";
import path from "path";
import fs from "fs";
// import Patients from "../models/PatientModel.js";
import Roles from "../models/RoleModel.js";
import User from "../models/UserModel.js";

// get all user
export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ["id", "uuid", "name", "email", "phoneNumber", "gender", "roleId", "createdAt", "updatedAt"],
      include: [
        {
          model: Roles,
          attributes: ["id", "uuid", "role", "description"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get user by id
export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ["id", "uuid", "name", "email", "phoneNumber", "gender", "roleId", "createdAt", "updatedAt"],
      include: [
        {
          model: Roles,
          attributes: ["id", "uuid", "role", "description"],
        },
      ],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// create user
export const createUser = async (req, res) => {
  const { name, email, phoneNumber, password, confirmPassword, role, gender } = req.body;
  if (password !== confirmPassword) return res.status(400).json({ msg: "password dan confirm password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await Users.create({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: hashPassword,
      roleId: role,
      gender: gender,
    });

    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    res.status(201).json({ user, msg: "Registration success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// update user
export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "user not found" });

  const name = req.body.name;
  const email = req.body.email;
  const gender = req.body.gender;
  const phoneNumber = req.body.phoneNumber;
  const role = req.body.role;
  const profileImage = req.body.profileImage;

  // const { name, email,  gender, phoneNumber, role, profileImage } = req.body;
  // try {
  //   await Users.update(
  //     {
  //       name: name,
  //       email: email,
  //       gender: gender,
  //       phoneNumber: phoneNumber,
  //       roleId: role,
  //     },
  //     {
  //       where: {
  //         id: user.id,
  //       },
  //     }
  //   );
  //   res.status(200).json({ msg: "user update success" });
  // } catch (error) {
  //   res.status(400).json({ msg: error.message });
  // }

  if(req.files !== null) {
      const profileImage = req.files.profileImage;

      const fileSizeProfile = profileImage.data.length;
      const extProfile = path.extname(profileImage.name);
      const fileNameProfile = profileImage.md5 + extProfile;

      const profileImageUrl = `images/${fileNameProfile}`;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (fileSizeProfile > 20000000) return res.status(422).json({ msg: "Image must be less than 20 MB" });
      profileImage.mv(`./public/images/${fileNameProfile}`, async (err) => {});

      try {
          await User.update(
          {
            name: name,
            email: email,
            gender: gender,
            phoneNumber: phoneNumber,
            role: role,
            profileImage: profileImageUrl
          },
          {
            where: {
              id: user.id,
            }
          }
        )
        res.status(200).json({ msg: "user update success" });
      } catch (error) {
        res.status(400).json({ msg: error.message });
      }
     
  }else{
    try {
      await User.update(
        {
          name: name,
          email: email,
          gender: gender,
          phoneNumber: phoneNumber,
          role: role
        },
        {
          where: {
            id: user.id,
          }
        }
      )
      res.status(200).json({ msg: "user update success" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
     
  }
};

// delete user
export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "user not found" });

  try {
    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "delete user success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};



// update user
export const updatePassword = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "user not found" });
  const { password, confirmPassword } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confirmPassword) return res.status(400).json({ msg: "password and password confirmation doesnt match" });
  try {
    await Users.update(
      {
        password: hashPassword,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "update password success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
