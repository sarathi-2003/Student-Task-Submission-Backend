const User = require("../Models/User");
const bcrypt = require('bcrypt');
const router = require("express").Router();
const Assignment = require('../Models/Assignment');
const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const { verifyTokenMentor } = require("./verifyToken");


//  Login Student
router.post("/", async (request, response) => {
    try {
      const user = await User.findOne({ username: request.body.username });
      if (user) {
        const match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
          const token = jwt.sign(
            { id: user._id, username: user.username, role: "mentor" },
            process.env.SECRET 
          );
          if (user.isMentor) {
            response.status(200).json({
              user,
              message: "Successfully logged in!",
              token,
            });
          } else {
            response.json({
              message: "You are not a MENTOR",
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

//   Add Assignment 
router.post('/add-assignment', verifyTokenMentor, async (request, response)=>{
    const newAssignment = new Assignment ({
        title: request.body.title,
        links: request.body.assignmentLinks,
    });
    try {
        const savedAssignment = await newAssignment.save();
        response.status(200).json({
            message: "Assignment Added!",
            savedAssignment,
        });
    } catch (error) {
        response.status(500).json(error);
    }
});

// View Submitted Assignments
router.get(
    "View-submitted-assignments",
    verifyTokenMentor,
    async (request, response) =>{
        try {
            const assignment = await Assignment.find();
            const { title, submitted} = assignment;
            response.status(200).json(assignment);
        } catch (error) {
            response.status(500).json(error);
        }
    }
);

// delete assignment 
router.delete(
    "/View-submitted-assignments/:id",
    verifyTokenMentor,
    async (request, response) =>{
        try{
            await Assignment.findByIdAndDelete(request.params.id);
            response.status(200).json({
                message: "Deleted Successfully!",
            });
        } catch (error){
            response.status(500).json(error);
        }
    }
);
module.exports = router;