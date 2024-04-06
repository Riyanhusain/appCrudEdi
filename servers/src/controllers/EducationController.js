import Education from "../models/EducationModel.js";
import Candidate from "../models/CandidateModel.js";

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
