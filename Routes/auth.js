const { request, response } = require('express');
const User = require('../Models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { verifyToken, verifyTokenAdmin } = require('./verifyToken');


// Register Admin 
router.post('/addAdmin',verifyTokenAdmin, async (request,response)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(request.body.password, salt);
    request.body.password = hash;
    const newUser = new User({
        username: request.body.username,
        emailid: request.body.email,
        password: request.body.password,
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        phonenumber: request.body.phonenumber,
        emailid: request.body.emailid,
        isAdmin: request.body.isAdmin,
        isStudent: request.body.isStudent,
        isMentor: request.body.isMentor,
        id: request.body.id,
    });

    try{
        const savedUser = await newUser.save();
        response.status(200).json({
            message: "Admin added!",
            savedUser,
        });
    } catch (error) {
        response.status(500).json(error);
    }
});

// Register Student  
 router.post('/addStudent', verifyTokenAdmin,async (request,response)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(request.body.password, salt);
    request.body.password = hash;
    const newUser = new User({
        username: request.body.username,
        emailid: request.body.email,
        password: request.body.password,
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        phonenumber: request.body.phonenumber,
        emailid: request.body.emailid,
        isAdmin: request.body.isAdmin,
        isStudent: request.body.isStudent,
        isMentor: request.body.isMentor,
        id: request.body.id,
    });

    try{
        const savedUser = await newUser.save();
        response.status(200).json({
            message: 'Student added!',
            savedUser,
        });
    } catch (error) {
        response.status(500).json(error);
    }
 });

//  Register Mentor 

router.post('/addMentor', verifyTokenAdmin, async (request, response)=>{
    const  salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(request.body.password, salt);
    request.body.password = hash;
    const newUser = new User({
        username: request.body.username,
        emailid: request.body.email,
        password: request.body.password,
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        phonenumber: request.body.phonenumber,
        emailid: request.body.emailid,
        isAdmin: request.body.isAdmin,
        isStudent: request.body.isStudent,
        isMentor: request.body.isMentor,
        id: request.body.id, 
    });

    try {
      const savedUser = await newUser.save();
      response.status(200).json({
        message: "Mentor added!",
        savedUser,
      });
    } catch (error) {
        response.status(500).json(error);
    }
});

// Change password 
router.put("/changepassword", verifyToken, async (request, response) => {
    try {
      const user = await User.findOne({ username: request.body.username });
      // console.log(user);
      if (user) {
        const match = await bcrypt.compare(
          request.body.oldPassword,
          user.password
        );
        if (match) {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(request.body.newPassword, salt);
          request.body.newPassword = hash;
          try {
            await User.updateOne(
              { username: request.body.username },
              {
                $set: { password: request.body.newPassword },
              }
            );
            response.status(200).json({ message: "Password reset done!!" });
          } catch (error) {
            response.status(500).json(error);
          }
        } else {
          response.json({
            message: "Entered Old Password is incorrect!",
          });
        }
      } else {
        response.json({
          message: "Please try again by Logging In!",
        });
      }
    } catch (error) {
      response.status(500).json(error);
    }
  });

//   view profile 

router.get('/viewprofile/:username',verifyToken, async (request, response)=>{
    try {
        let user = await User.findOne({username: request.params.username});
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json(error);
    }
});
module.exports = router;

// Update profile 

router.put("/viewprofile/:id", verifyToken, async (request,response)=>{
    try{
        let user = await User.findOneAndUpdate(
            {id: request.params.id},
            {
                firstname: request.body.firstname,
                lastname: request.body.lastname,
                phonenumber: request.body.phonenumber,
                emailid: request.body.emailid,
            }
        );
        response.status(200).json({
            user,
            message: "User profile updated SuccessFully!",
        });
    } catch (error) {
        response.status(500).json({
            error,
        });
    }
});