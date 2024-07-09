const { z } = require("zod");

const ProductValidation = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 character" })
    .max(255, { message: "Name must not be more than 255 characters" }),

  price: z
    .string({ required_error: "Price is required" })
    .trim()
    .min(1, { message: "Name must be atleast 3 character" })
    .max(255, { message: "Name must not be more than 255 characters" }),

  discription: z.string({
    required_error: "Please provide discription of your product",
  }),

  category: z.string({ required_error: "Please Choose Correct Category" }),

  company: z.string({required_error: "Please Provide Company Name"}),

  seller: z
    .string({ required_error: "Provide the Product Seller Name" })
    .trim()
    .min(1, { message: "Name must be atleast 3 character" })
    .max(255, { message: "Name must not be more than 255 characters" }),

  stock: z
    .string({ required_error: "Please provide the product Stock" })
    .min(1, { message: "Stock must be atleast 1" })
    .max(100, { message: "Stock must not be more than 100" }),

});

module.exports = ProductValidation;
