/* eslint-disable */
// import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51Qi3QWFTuUh3joMaSvvWImpxEsVkMEVxNYLGU7JEPEvdCFONyAB1AvdRHqpEsVeKmqQ1CDS5APopTr4W0AwAbAwV00Bvrmq9zs',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const response = await fetch(
      `/api/v1/bookings/checkout-session/${tourId}`,
    );
    const session = await response.json();

    if (!response.ok) {
      throw new Error(
        session.message ||
          'Failed to retrieve checkout session.',
      );
    }

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err.message || 'An error occurred.');
  }
};
