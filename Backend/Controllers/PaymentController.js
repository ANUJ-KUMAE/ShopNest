const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const PaymentProcess = async (req, resp, next) => {
  const { amount, shipping } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    // amount: req.body.amount,
    amount,
    currency: "INR",
    description: "ShopNest",
    // shipping: {
    //   name: 'Anuj Kumar',
    //   address: {
    //     line1: 'Patahi',
    //     city: 'Muzaffarpur',
    //     state: 'BR',
    //     postal_code: '843113',
    //     country: 'IN',
    //   },
    // },
    shipping: {
      name: shipping.name,
      address: {
        line1: shipping.address.line1,
        city: shipping.address.city,
        state: "BR",
        postal_code: shipping.address.postal_code,
        country: "IN",
      },
    },

    metadata: { integration_check: "accept_a_payment" },
  });

  resp.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
};

const SendStripe = async (req, resp, next) => {
  resp.status(201).json({
    stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
};

module.exports = { PaymentProcess, SendStripe };
