import Candidate from "../models/CandidateModel.js";
import Education from "../models/EducationModel.js";
import Experience from "../models/ExperienceModel.js";
import Tranning from "../models/TranningModel.js";
import Users from "../models/UsersModel.js";

export const getAllCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findAll({
      include: [
        { model: Education },
        { model: Experience },
        { model: Tranning },
      ],
    });
    res.status(200).json(candidate);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
export const biodataEntry = async (req, res) => {
  const UserEmail = req.users.email;

  const {
    CandidteName,
    Nik,
    PlaceOfBirth,
    DateOfBirth,
    Gender,
    Religion,
    BloodType,
    CandidateStatus,
    KtpAddress,
    DomicileAddress,
    PhoneNumber,
    Bestie,
    education,
    experiences,
    trannings,
  } = req.body;
  console.log(education);
  try {
    const candidate = await Candidate.create({
      CandidteName,
      Nik,
      PlaceOfBirth,
      DateOfBirth: new Date(DateOfBirth),
      Gender,
      Religion,
      BloodType,
      CandidateStatus,
      KtpAddress,
      DomicileAddress,
      PhoneNumber,
      Bestie,
    });
    await Users.update({ candidateId: candidate.id }, { where: { UserEmail } });
    if (education && education.length > 0) {
      await Education.bulkCreate(
        education.map((edu) => ({
          candidateId: candidate.id,
          GradeTitle: edu.GradeTitle,
          SchoolName: edu.SchoolName,
          Major: edu.Major,
          GraduateYear: edu.GraduateYear,
          GPA: edu.GPA,
        }))
      );
    }
    if (experiences && experiences.length > 0) {
      await Experience.bulkCreate(
        experiences.map((expr) => ({
          candidateId: candidate.id,
          CompanyName: expr.CompanyName,
          LastPosition: expr.LastPosition,
          Salary: expr.Salary,
          Year: expr.Year,
        }))
      );
    }
    if (trannings && trannings.length > 0) {
      await Tranning.bulkCreate(
        trannings.map((tran) => ({
          candidateId: candidate.id,
          TranningName: tran.TranningName,
          Sertification: tran.Sertification,
          TranningYear: tran.TranningYear,
        }))
      );
    }
    res.status(200).json({ message: "berhasil di tambahkan" });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const biodataUpdate = async (req, res) => {
  const userId = req.users.userId;
  const user = await Users.findOne({ where: { id: userId } });
  if (!user) {
    return res.sendStatus(403);
  }
  const {
    CandidteName,
    Nik,
    PlaceOfBirth,
    DateOfBirth,
    Gender,
    Religion,
    BloodType,
    CandidateStatus,
    KtpAddress,
    DomicileAddress,
    PhoneNumber,
    Bestie,
    education,
    experiences,
    trannings,
  } = req.body;

  try {
    const candidate = await Candidate.update(
      {
        CandidteName,
        Nik,
        PlaceOfBirth,
        DateOfBirth: new Date(DateOfBirth),
        Gender,
        Religion,
        BloodType,
        CandidateStatus,
        KtpAddress,
        DomicileAddress,
        PhoneNumber,
        Bestie,
      },
      { where: { id: user.candidateId } }
    );
    if (education && education.length > 0) {
      for (const edu of education) {
        const existingEducation = await Education.findOne({
          where: { candidateId: user.candidateId },
        });

        if (existingEducation) {
          await Education.update(
            {
              GradeTitle: edu.GradeTitle,
              SchoolName: edu.SchoolName,
              Major: edu.Major,
              GraduateYear: edu.GraduateYear,
              GPA: edu.GPA,
            },
            { where: { candidateId: user.candidateId } }
          );
        } else {
          await Education.create({
            candidateId: user.candidateId,
            GradeTitle: edu.GradeTitle,
            SchoolName: edu.SchoolName,
            Major: edu.Major,
            GraduateYear: edu.GraduateYear,
            GPA: edu.GPA,
          });
        }
      }
    }
    if (experiences && experiences.length > 0) {
      for (const expr of experiences) {
        const existingExperience = await Experience.findOne({
          where: { candidateId: user.candidateId },
        });

        if (existingExperience) {
          await Experience.update(
            {
              CompanyName: expr.CompanyName,
              LastPosition: expr.LastPosition,
              Salary: expr.Salary,
              Year: expr.Year,
            },
            { where: { candidateId: user.candidateId } }
          );
        } else {
          await Experience.create({
            candidateId: user.candidateId,
            CompanyName: expr.CompanyName,
            LastPosition: expr.LastPosition,
            Salary: expr.Salary,
            Year: expr.Year,
          });
        }
      }
    }
    if (trannings && trannings.length > 0) {
      for (const tran of trannings) {
        const existingTranning = await Tranning.findOne({
          where: { candidateId: user.candidateId },
        });

        if (existingTranning) {
          await Tranning.update(
            {
              TranningName: tran.TranningName,
              Sertification: tran.Sertification,
              TranningYear: tran.TranningYear,
            },
            { where: { candidateId: user.candidateId } }
          );
        } else {
          await Tranning.create({
            candidateId: user.candidateId,
            TranningName: tran.TranningName,
            Sertification: tran.Sertification,
            TranningYear: tran.TranningYear,
          });
        }
      }
    }
    res.status(200).json({ message: "berhasil diupdate" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getProfile = async (req, res) => {
  const userId = req.users.userId;
  if (!userId) {
    return res.sendStatus(403);
  }
  try {
    const profile = await Candidate.findOne({ where: { id: userId } });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getOneCandidate = async (req, res) => {
  const candidateId = req.params.id;
  try {
    const candidate = await Candidate.findOne({
      where: { id: candidateId },
      include: [
        { model: Education },
        { model: Experience },
        { model: Tranning },
      ],
    });
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteCandidate = async (req, res) => {
  const candidateId = req.params.id;
  try {
    await Candidate.destroy({ where: { id: candidateId } });
    res.status(200).json({ message: "candidate berhasil di hapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
