import Candidate from "../models/CandidateModel.js";
import Education from "../models/EducationModel.js";
import Experience from "../models/ExperienceModel.js";
import Tranning from "../models/TranningModel.js";
import Users from "../models/UsersModel.js";

export const getAllCandidate = async (req, res) => {
  try {
    const candidates = await Candidate.findAll({
      include: [
        { model: Education, order: [["GraduateYear", "DESC"]], limit: 1 },
        { model: Experience },
        { model: Tranning },
      ],
    });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const biodataEntry = async (req, res) => {
  const UserEmail = req.users.email;
  const {
    CandidatePosition,
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
    const candidate = await Candidate.create({
      CandidteName,
      CandidatePosition,
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
    CandidatePosition,
    Bestie,
  } = req.body;
  let image = "";
  let url = "";
  if (req.file) {
    const { filename } = req.file;
    image = filename;
    url = `${req.protocol}://${req.get("host")}/images/${filename}`;
  }

  try {
    console.log(
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
      CandidatePosition,
      Bestie
    );
    if (!user.candidateId) {
      const candidate = await Candidate.create({
        CandidteName,
        CandidatePosition,
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
        Image: image,
        url: url,
      });
      await Users.update(
        { candidateId: candidate.id },
        { where: { id: userId } }
      );
    } else {
      const candidate = await Candidate.update(
        {
          CandidteName: CandidteName || user.CandidateName,
          Nik: Nik || user.Nik,
          PlaceOfBirth: PlaceOfBirth || user.PlaceOfBirth,
          DateOfBirth: DateOfBirth || user.DateOfBirth,
          Gender: Gender || user.Gender,
          Religion: Religion || user.Religion,
          BloodType: BloodType || user.BloodType,
          CandidateStatus: CandidateStatus || user.CandidateStatus,
          KtpAddress: KtpAddress || user.KtpAddress,
          DomicileAddress: DomicileAddress || user.DomicileAddress,
          PhoneNumber: PhoneNumber || user.PhoneNumber,
          Bestie: Bestie || user.Bestie,
          CandidatePosition: CandidatePosition || user.CandidatePosition,
          Image: image || user.image,
          url: url || user.url,
        },
        { where: { id: user.candidateId } }
      );
    }

    res.status(200).json({ message: "berhasil diupdate" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const biodataUpdateAdmin = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const user = await Candidate.findOne({ where: { id: userId } });
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
    CandidatePosition,
    Bestie,
  } = req.body;

  let image = "";
  let url = "";
  if (req.file) {
    const { filename } = req.file;
    image = filename;
    url = `${req.protocol}://${req.get("host")}/images/${filename}`;
  }

  try {
    const candidate = await Candidate.update(
      {
        CandidteName: CandidteName || user.CandidateName,
        Nik: Nik || user.Nik,
        PlaceOfBirth: PlaceOfBirth || user.PlaceOfBirth,
        DateOfBirth: DateOfBirth || user.DateOfBirth,
        Gender: Gender || user.Gender,
        Religion: Religion || user.Religion,
        BloodType: BloodType || user.BloodType,
        CandidateStatus: CandidateStatus || user.CandidateStatus,
        KtpAddress: KtpAddress || user.KtpAddress,
        DomicileAddress: DomicileAddress || user.DomicileAddress,
        PhoneNumber: PhoneNumber || user.PhoneNumber,
        Bestie: Bestie || user.Bestie,
        CandidatePosition: CandidatePosition || user.CandidatePosition,
        Image: image || user.image,
        url: url || user.url,
      },
      { where: { id: req.params.id } }
    );

    res.status(200).json({ message: "berhasil diupdate" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getProfile = async (req, res) => {
  const userId = req.users.userId;
  const user = await Users.findOne({ where: { id: userId } });
  if (!user) {
    return res.sendStatus(403);
  }
  try {
    const profile = await Candidate.findOne({
      where: { id: user.candidateId },
      include: [
        { model: Education },
        { model: Experience },
        { model: Tranning },
      ],
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getOneCandidate = async (req, res) => {
  const candidateId = req.params.id;
  const userId = req.users.userId;
  const user = await Users.findOne({ where: { id: userId } });
  if (!user) {
    return res.sendStatus(403);
  }
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
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
