import Tranning from "../models/TranningModel.js";
import Candidate from "../models/CandidateModel.js";
import Users from "../models/UsersModel.js";

export const getAllTranning = async (req, res) => {
  try {
    const tranning = await Tranning.findAll({ include: { model: Candidate } });
    res.status(200).json(tranning);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
export const createTranning = async (req, res) => {
  const { TranningName, Sertification, TranningYear, candidateId } = req.body;
  const userId = req.users.userId;
  const user = await Users.findOne({ where: { id: userId } });
  if (!user) {
    return res.sendStatus(403);
  }
  console.log(req.body);
  console.log(user.candidateId);
  try {
    await Tranning.create({
      TranningName,
      Sertification,
      TranningYear,
      candidateId: user.candidateId,
    });
    res.status(200).json({ message: "data berhasil ditambah" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const updateTranning = async (req, res) => {
  const { TranningName, Sertification, TranningYear, candidateId } = req.body;
  const userId = req.users.userId;
  const user = await Users.findOne({ where: { id: userId } });
  if (!user) {
    return res.sendStatus(403);
  }
  try {
    await Tranning.update(
      {
        TranningName,
        Sertification,
        TranningYear,
        // candidateId: user.candidateId,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json({ message: "data berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const deleteTranning = async (req, res) => {
  const userId = req.users.userId;
  const user = await Users.findOne({ where: { id: userId } });
  if (!user) {
    return res.sendStatus(403);
  }
  try {
    await Tranning.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
