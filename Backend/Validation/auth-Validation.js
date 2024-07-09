const { z } = require("zod");

const AuthValidation = z.object({
  userName: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 character" })
    .max(255, { message: "Name must not be more than 255 characters" }),

  email: z
    .string({ required_error: "Email must be reauired" })
    .trim()
    .email({ message: "Invalid email" }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .max(20, { message: "Phone number not be greater than 20 character" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be atleast 6 charcaters" })
    .max(15, { message: "Password not be greater than 15 characters" }),
});

module.exports = AuthValidation;
