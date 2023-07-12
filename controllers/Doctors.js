import Doctors from "../models/DoctorModel.js";
import Users from "../models/UserModel.js";

// get all doctor
export const getAllDoctor = async (req, res) => {
  try {
    let response;
    if (req.roleId === 1) {
      response = await Doctors.findAll({
        attributes: [
          "id",
          "uuid",
          "userId",
          "strNumber",
          "birthDate",
          "address",
          "specialization",
          "practicePlace",
          "note",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: Users,
            attributes: [
              "id",
              "uuid",
              "name",
              "email",
              "phoneNumber",
              "gender",
              "roleId",
              "createdAt",
              "updatedAt",
            ],
          },
        ],
      });
    } else {
      response = await Doctors.findAll({
        attributes: [
          "id",
          "uuid",
          "userId",
          "strNumber",
          "birthDate",
          "address",
          "specialization",
          "practicePlace",
          "note",
          "createdAt",
          "updatedAt",
        ],
        where: { userId: req.userId },
        include: [
          {
            model: Users,
            attributes: [
              "id",
              "uuid",
              "name",
              "email",
              "phoneNumber",
              "gender",
              "roleId",
              "createdAt",
              "updatedAt",
            ],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// create doctor
export const createDoctor = async (req, res) => {
  const {
    userId,
    strNumber,
    birthDate,
    address,
    specialization,
    practicePlace,
    note,
  } = req.body;
  const doctor = await Doctors.findOne({
    where: {
      userId: userId,
    },
  });

  if (doctor) return res.status(403).json({ msg: "rejected" });

  try {
    await Doctors.create({
      userId: userId,
      strNumber: strNumber,
      // birthDate: birthDate,
      address: address,

      specialization: specialization,
      practicePlace: practicePlace,
      note: note,
    });
    res.status(201).json({ msg: "doctor created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// single doctor
export const getDoctorById = async (req, res) => {
  try {
    const response = await Doctors.findOne({
      attributes: [
        "id",
        "uuid",
        "userId",
        "strNumber",
        "birthDate",
        "address",
        // "pasien",
        "specialization",
        "practicePlace",
        "note",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Users,
          attributes: [
            "id",
            "uuid",
            "name",
            "email",
            "phoneNumber",
            "gender",
            // "pasien",
            "roleId",
            "createdAt",
            "updatedAt",
          ],
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

// delete doctor
export const deleteDoctor = async (req, res) => {};

// update doctor
export const updateDoctor = async (req, res) => {
  const {
    userId,
    strNumber,
    birthDate,
    address,
    // pasien,
    specialization,
    practicePlace,
    note,
  } = req.body;
  const doctor = await Doctors.findOne({
    where: {
      userId: req.params.id,
    },
  });

  try {
    await Doctors.update(
      {
        userId: userId,
        strNumber: strNumber,
        birthDate: birthDate,
        address: address,
        // pasien: pasien,
        specialization: specialization,
        practicePlace: practicePlace,
        note: note,
      },
      {
        where: {
          id: doctor.id,
        },
      },
    );
    res.status(200).json({ msg: "doctor updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
