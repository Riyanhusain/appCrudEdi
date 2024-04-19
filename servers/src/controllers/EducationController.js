import Education from "../models/EducationModel.js";
import Candidate from "../models/CandidateModel.js";
import Users from "../models/UsersModel.js";

export const getAllEducation = async (req, res) => {
  try {
    const education = await Education.findAll({
      include: { model: Candidate },
    });
    res.status(200).json(education);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
export const getOneEducation = async (req, res) => {
  try {
    const education = await Education.findOne({ where: { id: req.params.id } });
    res.status(200).json(education);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
export const createEducation = async (req, res) => {
  const { GradeTitle, SchoolName, Major, GraduateYear, GPA, candidateId } =
    req.body;
  const userId = req.users.userId;
  const user = await Users.findOne({ where: { id: userId } });
  if (!user) {
    return res.sendStatus(403);
  }
  try {
    await Education.create({
      GradeTitle,
      SchoolName,
      Major,
      GraduateYear,
      GPA,
      candidateId: user.candidateId,
    });
    res.status(200).json({ message: "data berhasil ditambah" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const editEducation = async (req, res) => {
  const { GradeTitle, SchoolName, Major, GraduateYear, GPA, candidateId } =
    req.body;
  const userId = req.users.userId;

  const user = await Users.findOne({ where: { id: userId } });
  if (!user) {
    return res.sendStatus(403);
  }
  try {
    await Education.update(
      {
        GradeTitle,
        SchoolName,
        Major,
        GraduateYear,
        GPA,
        // candidateId: user.candidateId,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json({ message: "data berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteEducation = async (req, res) => {
  const userId = req.users.userId;

  const user = await Users.findOne({ where: { id: userId } });
  if (!user) {
    return res.sendStatus(403);
  }
  try {
    await Education.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
