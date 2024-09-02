import axios from 'axios';
import { Buffer } from 'buffer'; // Import the Buffer from the buffer package

const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY || '';
const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET || '';
const MPESA_LIPA_NA_MPESA_SHORTCODE = process.env.MPESA_LIPA_NA_MPESA_SHORTCODE || '';
const MPESA_LIPA_NA_MPESA_PASSKEY = process.env.MPESA_LIPA_NA_MPESA_PASSKEY || '';

const BASE_URL = 'https://sandbox.safaricom.co.ke';
const TOKEN_URL = `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`;
const LIPA_NA_MPESA_URL = `${BASE_URL}/mpesa/stkpush/v1/processrequest`;

const getAuthToken = async () => {
  try {
    const { data } = await axios.post(TOKEN_URL, {}, {
      auth: {
        username: MPESA_CONSUMER_KEY,
        password: MPESA_CONSUMER_SECRET,
      },
    });
    return data.access_token;
  } catch (error) {
    console.error('Failed to fetch token', error);
    throw error;
  }
};

export const lipaNaMpesa = async (phoneNumber: string, amount: number) => {
  try {
    const token = await getAuthToken();
    const response = await axios.post(
      LIPA_NA_MPESA_URL,
      {
        "BusinessShortCode": MPESA_LIPA_NA_MPESA_SHORTCODE,
        "Password": Buffer.from(`${MPESA_LIPA_NA_MPESA_SHORTCODE}${MPESA_LIPA_NA_MPESA_PASSKEY}${new Date().toISOString()}`).toString('base64'),
        "Timestamp": new Date().toISOString(),
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phoneNumber,
        "PartyB": MPESA_LIPA_NA_MPESA_SHORTCODE,
        "PhoneNumber": phoneNumber,
        "CallBackURL": "https://example.com/callback",
        "AccountReference": "Test123",
        "TransactionDesc": "Payment for testing"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to initiate payment', error);
    throw error;
  }
};
