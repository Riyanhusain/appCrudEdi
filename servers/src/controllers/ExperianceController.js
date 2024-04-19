import Experience from "../models/ExperienceModel.js";
import Candidate from "../models/CandidateModel.js";
import Users from "../models/UsersModel.js";

export const getAllExperience = async (req, res) => {
  try {
    const experience = await Experience.findAll({
      include: { model: Candidate },
    });
    res.status(200).json(experience);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
export const createExperience = async (req, res) => {
  const { CompanyName, LastPosition, Salary, Year, candidateId } = req.body;
  const userId = req.users.userId;
  const user = await Users.findOne({ where: { id: userId } });
  if (!user) {
    return res.sendStatus(403);
  }
  try {
    await Experience.create({
      CompanyName,
      LastPosition,
      Salary,
      Year,
      candidateId: user.candidateId,
    });
    res.status(200).json({ message: "data berhasil ditambah" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const updateExperience = async (req, res) => {
  const { CompanyName, LastPosition, Salary, Year, candidateId } = req.body;
  const userId = req.users.userId;
  const user = await Users.findOne({ where: { id: userId } });
  if (!user) {
    return res.sendStatus(403);
  }
  try {
    await Experience.update(
      {
        CompanyName,
        LastPosition,
        Salary,
        Year,
        // candidateId: user.candidateId,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json({ message: "data berhasil diubah" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const deleteExperience = async (req, res) => {
  const userId = req.users.userId;

  const user = await Users.findOne({ where: { id: userId } });
  if (!user) {
    return res.sendStatus(403);
  }
  try {
    await Experience.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
