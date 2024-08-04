const UserModel = require("../Models/Auth-Model");
const sendToken = require("../Validation/jwtToken");

const registration = async (req, resp) => {
  try {
    const { userName, email, phone, password } = req.body;

    const UserExists = await UserModel.findOne({ email });

    if (UserExists) {
      return resp.status(401).json({ message: "User Exists already" });
    }

    const UserCreated = await UserModel.create({
      userName,
      email,
      phone,
      password,
    });

    resp.status(201).send({
      msg: "Register Successful",
      token: await UserCreated.generateToken(),
      userId: UserCreated._id.toString(),
      UserCreated,
    });

  } catch (error) {
    //console.log(error);
    next(error);
  }
};

const loginData = async (req, resp) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return resp.status(401).json({ message: "Check Email And Password" });
    } else {
      const userlogin = await user.ComparePassword(password);


      if (userlogin) {
        resp.status(201).send({
          msg: "Login Successful",
          token: await user.generateToken(),
          userId: user._id.toString(),
          user,
        });
      }

    }
  } catch (error) {
    //console.log(error);
    next(error);
  }
};

const userProfile = async (req, resp) => {
  try {
    const currentUser = await UserModel.findOne(req.UserID);

    return resp.status(201).json({
      success: true,
      currentUser,
    });
  } catch (error) {
    //console.log(error);
    next()
  }
};

const updatePassword = async (req, resp) => {
  try {
      const passwordUpdate = await UserModel.findOne(req.UserID).select('+password');

      const isMatched = await passwordUpdate.ComparePassword(req.body.oldPassword);
      if(!isMatched)
      {
        return resp.status(401).json({message:"Old Password is Incorrect"});
      }

      passwordUpdate.password = req.body.password;
      await passwordUpdate.save();

      sendToken(passwordUpdate, 201, resp, "Password Updated Successfully");

  } catch (error) {
    console.log(error);
    next();
  }
}

const updateProfile = async (req, resp) => {
  try {

    const newUserData = {
      userName:req.body.userName,
      email:req.body.email,
      phone:req.body.phone
    }


    const newProfile = await UserModel.updateOne({_id:req.params.id}, {$set:newUserData})

     return resp.status(201).json({
      success:true,
      newProfile
     })

  } catch (error) {
    //console.log(error);
    next(error)
  }
}

const logout = async (req, resp) => {
  try {
    // resp.cookie("UserToken", null, {
    //   expires: new Date(Date.now()),
    //   httpOnly: true,
    // });

    resp.clearCookie("UserToken");

    resp.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};



module.exports = { registration, loginData, logout, userProfile, updatePassword, updateProfile};
