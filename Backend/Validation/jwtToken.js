const sendToken = async (user, statusCode, resp, message) => {
  //create  jwt token
  const token = await user.generateToken();

  //option foe cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    //secure: process.env.NODE_ENV === 'production',
    //secure:true,
  };

  resp.status(statusCode).cookie("UserToken", token, options).json({
    success: true,
    message,
    token,
    user,
  });
};

module.exports = sendToken;
