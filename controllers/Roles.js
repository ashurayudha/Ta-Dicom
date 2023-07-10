import Dicoms from "../models/DicomModel.js";
import Roles from "../models/RoleModel.js";
import Users from "../models/UserModel.js";

// crete role
export const createRole = async (req, res) => {
  const { role, description } = req.body;
  try {
    await Roles.create({
      role: role,
      description: description,
    });
    res.status(201).json({ msg: "role created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get all role
export const getRole = async (req, res) => {
  try {
    const response = await Roles.findAll({
      attributes: ["id", "uuid", "role", "description"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get single role
export const getRoleById = async (req, res) => {
  try {
    const response = await Roles.findOne({
      attributes: ["id", "uuid", "role", "description"],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// update role
export const updateRole = async (req, res) => {
  const roleId = await Roles.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!roleId) return res.status(404).json({ msg: "role not found" });
  const { role, description } = req.body;
  try {
    await Roles.update(
      {
        role: role,
        description: description,
      },
      {
        where: {
          id: roleId.id,
        },
      }
    );
    res.status(200).json({ msg: "role updated" });
  } catch (error) {
    res.status(500).json({ msg: res.message });
  }
};

// delete role
export const deleteRole = async (req, res) => {
  const roleId = await Roles.findOne({
    where: {
      id: req.params.id,
    },
  });

  const user = await Users.findOne({
    where: {
      roleId: req.params.id,
    },
  });

  // if (user) return res.status(503).json({ msg: "role can't deleted because has some users" });

  if (!roleId) return res.status(404).json({ msg: "role not found" });

  if (!user) {
    try {
      await Roles.destroy({
        where: {
          id: roleId.id,
        },
      });
      res.status(200).json({ msg: "delete success" });
    } catch (error) {
      res.status(500).json({ msg: res.message });
    }
  } else {
    return res.status(503).json({ msg: "role can't deleted because has some users" });
  }
};
