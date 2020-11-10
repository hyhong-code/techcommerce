const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Cart = require("../models/Cart");

exports.createPaymenIntent = async (req, res, next) => {
  try {
    // Handle shop not found
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ errors: [{ msg: "User's cart not found." }] });
    }

    // Create a payment intent
    const { client_secret } = await stripe.paymentIntents.create({
      amount: Number(cart.totalAfterDiscount).toFixed(2) * 100,
      currency: "usd",
    });

    res.status(200).json({ clientSecret: client_secret });
  } catch (error) {
    console.error("[❌ paymentIntend ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

/*

{
  id: 'pi_1HlkqKF1X5EtJ3fQLgUWT7vx',
  object: 'payment_intent',
  amount: 100,
  amount_capturable: 0,
  amount_received: 0,
  application: null,
  application_fee_amount: null,
  canceled_at: null,
  cancellation_reason: null,
  capture_method: 'automatic',
  charges: {
    object: 'list',
    data: [],
    has_more: false,
    total_count: 0,
    url: '/v1/charges?payment_intent=pi_1HlkqKF1X5EtJ3fQLgUWT7vx'
  },
  client_secret: 'pi_1HlkqKF1X5EtJ3fQLgUWT7vx_secret_SABvkgwVQI9Ag1VAxhpf71ZGK',
  confirmation_method: 'automatic',
  created: 1604968576,
  currency: 'usd',
  customer: null,
  description: null,
  invoice: null,
  last_payment_error: null,
  livemode: false,
  metadata: {},
  next_action: null,
  on_behalf_of: null,
  payment_method: null,
  payment_method_options: {
    card: {
      installments: null,
      network: null,
      request_three_d_secure: 'automatic'
    }
  },
  payment_method_types: [ 'card' ],
  receipt_email: null,
  review: null,
  setup_future_usage: null,
  shipping: null,
  source: null,
  statement_descriptor: null,
  statement_descriptor_suffix: null,
  status: 'requires_payment_method',
  transfer_data: null,
  transfer_group: null
}

*/
