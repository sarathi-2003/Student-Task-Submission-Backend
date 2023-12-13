const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { request, response } = require("express");
const router = require("express").Router();
const jwt = require('jsonwebtoken');
const { verifyTokenAdmin } = require("./verifyToken");


//  Login Admin 

router.post("/", async (request, response) => {
    try {
      const user = await User.findOne({ username: request.body.username });
      if (user) {
        const match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
          const token = jwt.sign(
            { id: user._id, username: user.username, role: "admin" },
            process.env.SECRET 
          );
          if (user.isAdmin) {
            response.status(200).json({
              user,
              message: "Successfully logged in!",
              token,
            });
          } else {
            response.json({
              message: "You are not a ADMIN",
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
  

  // find student
  router.get(
    "/View-users/students",
    verifyTokenAdmin,
    async(request, response) => {
      try{
        const student = await User.find({ isStudent:true}).select({
          _id:0,
          password: 0,
          isAdmin: 0,
          isStudent: 0,
          isMentor: 0,
          _v: 0,
        });
        response.status(200).json(student);
      } catch (error){
        response.status(500).json(error);
      }
    }
  );

  // find mentor 
  router.get(
    "View-users/mentors",
    verifyTokenAdmin,
    async (request,response)=>{
      try{
        const student = await User.find({isMentor: true}).select({
          _id: 0,
          password:0,
          isAdmin:0,
          isStudent:0,
          isMentor: 0,
          _v: 0,
        });
        response.status(200).json(student);
      } catch (error){
        response.status(500).json(error);
      }
    }
  );

  // find admin 
  router.get(
    "/View-users/admins",
    verifyTokenAdmin,
    async(request,response)=>{
      try {
        const student = await User.find({isAdmin: true}).select({
          _id: 0,
          password: 0,
          isAdmin: 0,
          isStudent: 0,
          isMentor:0,
          _v:0,
        });
        response.status(200).json(student);
      } catch (error){
        response.status(500).json(error);
      }
    }
  );

  // delete 
  router.delete(
    "/delete-user/:id",
    verifyTokenAdmin,
    async(request,response) =>{
      try {
        await User.findOneAndDelete({id: request.params.id});
        response.status(200).json({
          message:'deleted',
        }); 
      } catch (error){
        response.status(500).json(error);
      }
    }
  );

  module.exports = router;