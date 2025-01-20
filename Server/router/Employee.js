const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../prisma/prisma");
const jwt = require("jsonwebtoken");
const validateEmployee = require("../Model/Employee");
const { relativeTimeRounding } = require("moment-timezone");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath =
      file.fieldname === "idImg" ? "./Images/IdCard" : "./Images/Profile";
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const email = req.body.email || "unknown-email"; // Use email from req.body or fallback
    const prefix = file.fieldname === "idImg" ? "id" : "profile";
    cb(null, Date.now() + `-${prefix}-${email}-${file.originalname}`);
  },
});

// Multer Setup
const upload = multer({ storage }).fields([
  { name: "idImg", maxCount: 1 },
  { name: "profileImg", maxCount: 1 },
]);

// Create Employee Endpoint
router.post("/create-employee", upload, async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      age,
      lastName,
      email,
      phoneNumber,
      region,
      city,
      emergencyContactName,
      emergencyContactPhone,
      shiftId,
      bankAccountNumber,
      monthlySalary,
      position,
      gender,
    } = req.body;

    // Validate the employee input
    const { error } = validateEmployee(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Default Password
    const defaultPassword = "12345678";
    // Hash password
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Check if email already exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { email },
    });
    if (existingEmployee) {
      return res.status(400).json({ error: "Email already registered!" });
    }

    // Verify shift and position existence
    const shift = await prisma.shift.findUnique({
      where: { id: parseInt(shiftId) },
    });
    if (!shift) {
      return res.status(404).json({ error: "Shift not found!" });
    }

    const positionRecord = await prisma.position.findUnique({
      where: { id: parseInt(position) },
    });
    if (!positionRecord) {
      return res.status(404).json({ error: "Position not found!" });
    }

    // Extract file paths
    const profilePicturePath = req.files?.profileImg?.[0]?.path;
    const idCardPath = req.files?.idImg?.[0]?.path;

    if (!profilePicturePath || !idCardPath) {
      return res
        .status(400)
        .json({ error: "Both profile picture and ID card are required!" });
    }

    // Create the employee
    await prisma.employee.create({
      data: {
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
        region,
        city,
        emergencyContactName,
        emergencyContactPhone,
        idCard: idCardPath,
        profilePicture: profilePicturePath,
        shiftId: parseInt(shiftId),
        bankAccountNumber,
        monthlySalary: parseFloat(monthlySalary),
        positionId: parseInt(position),
        gender,
        age: parseInt(age),
      },
    });

    res.status(201).json({ message: "Employee created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.error(error);
  }
});

// info for creating employee
router.get("/get-info-create", async (req, res) => {
  try {
    const shift = await prisma.shift.findMany({ orderBy: { name: "asc" } });
    const position = await prisma.position.findMany({
      orderBy: { name: "asc" },
    });
    res.status(200).json({ position, shift });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error!" });
  }
});

//create new postition
router.post("/create-position", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required!" });
    }
    await prisma.position.create({
      data: { name: name },
    });
    res.status(201).json({ message: "Postition Created Succfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});
module.exports = router;
