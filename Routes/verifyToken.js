const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

let verifyToken = function (request, response, next) {
  // console.log(request.headers);
  if (request.headers.authorization) {
    let verify = jwt.verify(request.headers.authorization, process.env.SECRET);
    console.log(verify);

    if (verify) {
      request.userid = verify.id;

      next();
    } else {
      response.status(401).json({
        message: "Unauthorized",
      });
    }
  } else {
    response.status(401).json({
      message: "Unauthorized",
    });
  }
};

let verifyTokenStudent = function (request, response, next) {
  if (request.headers.authorization) {
    let verify = jwt.verify(request.headers.authorization, process.env.SECRET);
    console.log(verify);

    if (verify) {
      request.userid = verify.id;
      if (verify.role === "student") {
        next();
      } else {
        response.status(401).json({
          message: " You are not allowed here!",
        });
      }
    } else {
      response.status(401).json({
        message: "Unauthorized",
      });
    }
  } else {
    response.status(401).json({
      message: "Unauthorized",
    });
  }
};

let verifyTokenMentor = function (request, response, next) {
  if (request.headers.authorization) {
    let verify = jwt.verify(request.headers.authorization, process.env.SECRET);
    console.log(verify);

    if (verify) {
      request.userid = verify.id;
      if (verify.role === "mentor") {
        next();
      } else {
        response.status(401).json({
          message: " You are not allowed here!",
        });
      }
    } else {
      response.status(401).json({
        message: "Unauthorized",
      });
    }
  } else {
    response.status(401).json({
      message: "Unauthorized",
    });
  }
};

let verifyTokenAdmin = function (request, response, next) {
  if (request.headers.authorization) {
    let verify = jwt.verify(request.headers.authorization, process.env.SECRET);
    console.log(verify);

    if (verify) {
      request.userid = verify.id;
      if (verify.role === "admin") {
        next();
      } else {
        response.status(401).json({
          message: " You are not allowed here!",
        });
      }
    } else {
      response.status(401).json({
        message: "Unauthorized",
      });
    }
  } else {
    response.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = {
  verifyToken,
  verifyTokenAdmin,
  verifyTokenStudent,
  verifyTokenMentor,
};