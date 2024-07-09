const mongoose = require("mongoose");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const SaltRound = await bcyrpt.genSalt(10);
    const hash_password = await bcyrpt.hash(user.password, SaltRound);
    user.password = hash_password;
    console.log(hash_password);
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.ComparePassword = async function(password)
{
    return bcyrpt.compare(password, this.password);
}

UserSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        UserId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const UserModel = new mongoose.model("User", UserSchema);

module.exports = UserModel;
