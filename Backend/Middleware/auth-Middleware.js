const jwt = require("jsonwebtoken");
const UserModel = require("../Models/Auth-Model");

const authMiddleware = async(req, resp, next) => {
    
      //const token = req.cookies.UserToken;

      const token = req.header("Authorization");


      if(!token)
      {
         return resp.status(401).json({message:"Invalid HTTPs token not provided 401"});
      }

      const jwtToken = token.replace("Bearer", "").trim();

      try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_TOKEN);

        const userData = await UserModel.findOne({email:isVerified.email}).select({
          password:0,
        })

        req.user = userData;
        req.token = token;
        req.UserID = userData._id;

        next();

      } catch (error) {
         resp.status(405).json({message:"Unauthorize Access"});
      }
}

module.exports = authMiddleware;