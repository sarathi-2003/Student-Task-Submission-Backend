const User = require("../Models/User");
const Assignment = require('../Models/Assignment');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { verifyTokenStudent } = require("./verifyToken");
const { default: mongoose } = require("mongoose");

//Login Student
router.post("/", async (request, response) => {
    try {
      const user = await User.findOne({ username: request.body.username });
      if (user) {
        const match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
          const token = jwt.sign(
            { id: user._id, username: user.username, role: "student" },
            process.env.SECRET
          );
          if (user.isStudent) {
            response.status(200).json({
              user,
              message: "Successfully logged in!",
              token,
            });
          } else {
            response.json({
              message: "You are not a STUDENT",
            });
          }
        } else {
          response.json({
            message: "Password Incorrect",
          });
        }
      } else {
        response.json({
          message: "User not found!",
        });
      }
    } catch (error) {
      response.status(500).json(error);
    }
  });
  
  //view assignment
  router.get(
    "/view-assignment",
    verifyTokenStudent,
    async (request, response) => {
      try {
        const assignment = await Assignment.find();
        if (assignment) {
          response.status(200).json(assignment);
        } else {
          response.json({ message: "No Assignments!!" });
        }
      } catch (error) {
        response.status(500).json(error);
      }
    }
  );
  
  //view submit assignment
  router.get(
    "/submit-assignment/:taskId/:username",
    verifyTokenStudent,
    async (request, response) => {
      try {
        const assignment = await Assignment.findById({
          _id: mongoose.Types.ObjectId(request.params.taskId),
        });
  
        response.status(200).json(assignment);
      } catch (error) {
        response.status(500).json(error);
      }
    }
  );
  
  //submit assignment
  router.put(
    "/submit-assignment/:taskId",
    verifyTokenStudent,
    async (request, response) => {
      try {
        const stuname = request.body.username;
        const links = request.body.link;
        const stuid = request.body.userid;
        const assignment = await Assignment.findOneAndUpdate(
          { _id: request.params.taskId },
          {
            $push: {
              submitted: {
                studentId: stuid,
                studentName: stuname,
                assignmentLinks: [...links],
              },
            },
          },
          { new: true }
        );
        response.status(200).json({
          message: `Submitted successfully!`,
        });
      } catch (error) {
        response.status(500).json(error);
      }
    }
  );
  module.exports = router;