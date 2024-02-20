import express from "express";
import cors from "cors";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51ORXzoSJw2K8vE8VD2oQVGBddvWOc3FH6V4zWFgrSnrZ03mlhLCgHsWIoQi0KP7KsN2jYBQMHEcRadJdy9vOwo4J004rVFL2EV"
);

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-payment-intent", async (req, res) => {
  const { items, amount, shipping } = req.body;
  // console.log(req.body);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    description: "e-commerce",
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    shipping: {
      address: {
        line1: shipping.add1,
        line2: shipping.add2,
        city: shipping.city,
        country: shipping.country,
        postal_code: shipping.pincode,
      },
      name: shipping.name,
      phone: shipping.number,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(1012, () => console.log("Node server listening on port 1012!"));
