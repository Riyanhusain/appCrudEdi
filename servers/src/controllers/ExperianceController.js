import Experience from "../models/ExperienceModel.js";
import Candidate from "../models/CandidateModel.js";

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
