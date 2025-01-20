const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../prisma/prisma");
const jwt = require("jsonwebtoken");
const { validateShift, validateUsers } = require("../Model/HRManager");
const { DateTime } = require("luxon");

const router = express.Router();

router.post("/create-shift", async (req, res) => {
  try {
    const {
      name,
      description,
      morningIn,
      morningOut,
      afternoonIn,
      afternoonOut,
      allowedLateMinutes,
      totalServerdHrPerDay,
      scantimeOut,
    } = req.body;

    // Validate the incoming data
    const { error } = validateShift(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Parse and format the date strings to ensure they are valid ISO-8601 DateTime strings
    const formattedMorningIn = DateTime.fromISO(morningIn, {
      zone: "local",
    }).toISO();
    const formattedMorningOut = DateTime.fromISO(morningOut, {
      zone: "local",
    }).toISO();
    const formattedAfternoonIn = DateTime.fromISO(afternoonIn, {
      zone: "local",
    }).toISO();
    const formattedAfternoonOut = DateTime.fromISO(afternoonOut, {
      zone: "local",
    }).toISO();

    // Store the data in the database
    await prisma.shift.create({
      data: {
        name,
        description,
        morningIn: formattedMorningIn,
        morningOut: formattedMorningOut,
        afternoonIn: formattedAfternoonIn,
        afternoonOut: formattedAfternoonOut,
        allowedLateMinutes,
        totalServerdHrPerDay,
        scantimeOut,
      },
    });

    res.status(201).json({ message: "Shift Created Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error!" });
  }
});

//update shift
router.put("/update-shift/:id", async (req, res) => {
  try {
    const {
      name,
      description,
      morningIn,
      morningOut,
      afternoonIn,
      afternoonOut,
      allowedLateMinutes,
      totalServerdHrPerDay,
      scantimeOut,
    } = req.body;
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID parameter!" });
    }
    const { error } = validateShift(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const formattedMorningIn = DateTime.fromISO(morningIn, {
      zone: "local",
    }).toISO();
    const formattedMorningOut = DateTime.fromISO(morningOut, {
      zone: "local",
    }).toISO();
    const formattedAfternoonIn = DateTime.fromISO(afternoonIn, {
      zone: "local",
    }).toISO();
    const formattedAfternoonOut = DateTime.fromISO(afternoonOut, {
      zone: "local",
    }).toISO();

    await prisma.shift.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        morningIn: formattedMorningIn,
        morningOut: formattedMorningOut,
        afternoonIn: formattedAfternoonIn,
        afternoonOut: formattedAfternoonOut,
        allowedLateMinutes,
        totalServerdHrPerDay,
        scantimeOut,
      },
    });
    res.status(200).json({ message: "Update Shift Succefully," });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error!" });
  }
});
router.post("/create-position", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name required!" });
    }
    await prisma.position.create({ data: { name: name } });
    res.status(201).json({ message: "Postition Created Succfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error!" });
  }
});
router.get("/get-shift", async (req, res) => {
  try {
    const shift = await prisma.shift.findMany({
      orderBy: { id: "desc" },
      include: {
        Employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            middleName: true,
            email: true,
            Position: { select: { name: true } },
          },
        },
      },
    });
    const employee = await prisma;
    res.status(200).json({ shift });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server errro" });
  }
});

router.get("/get-employee", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { firstName: "asc" },
    });
  } catch (error) {}
});

router.post("/create-user", async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      password,
      region,
      city,
      emergencyContactName,
      emergencyContactPhone,
      role,
    } = req.body;

    const { error } = validateUsers(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const hasedPassword = await bcrypt.hash(password, 10);
    const emails = await prisma.user.findUnique({ where: { email } });
    if (emails) {
      return res.status(400).json({ error: "Email Already Registered!" });
    }
    await prisma.user.create({
      data: {
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        password: hasedPassword,
        region,
        city,
        emergencyContactName,
        emergencyContactPhone,
        role,
      },
    });
    res.status(201).json({ message: "User Created Succefully !" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error!" });
  }
});

// get employees
router.get("/get-edmployee", async (req, res) => {
  try {
    const employee = await prisma.employee.findMany({
      orderBy: { firstName: "asc" },
      select: {
        id: true,
        age: true,
        bankAccountNumber: true,
        city: true,
        email: true,
        emergencyContactName: true,
        emergencyContactPhone: true,
        firstName: true,
        gender: true,
        idCard: true,
        lastName: true,
        middleName: true,
        monthlySalary: true,
        Payment: true,
        phoneNumber: true,
        profilePicture: true,
        region: true,
        shifts: { select: { name: true } },
        createdAt: true,
        Position: { select: { name: true } },
      },
    });
    res.status(200).json({ employee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});
module.exports = router;
