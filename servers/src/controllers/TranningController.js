import Tranning from "../models/TranningModel.js";
import Candidate from "../models/CandidateModel.js";

export const getAllTranning = async (req, res) => {
  try {
    const tranning = await Tranning.findAll({ include: { model: Candidate } });
    res.status(200).json(tranning);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
