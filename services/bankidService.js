// services/bankidService.js
const axios = require('axios');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Load the .p12 file and passphrase from environment variables
const bankIdApiUrl = process.env.BANKID_API_URL;
const p12Path = path.resolve(process.env.BANKID_CERT_PATH);
const p12Passphrase = process.env.BANKID_CERT_PASSPHRASE;



// HTTPS agent with the .p12 certificate
const httpsAgent = new https.Agent({
  pfx: fs.readFileSync(p12Path),
  passphrase: p12Passphrase,
  rejectUnauthorized: false, // WARNING: only use this for testing, never in production
});


const startPhoneAuth = async (personalNumber, callInitiator, requirement = {}, userVisibleData, userNonVisibleData, userVisibleDataFormat) => {
  try {
    const requestBody = {
      personalNumber,
      callInitiator,
      requirement, // Include this only if there are specific requirements for the auth
    };

    // Add optional parameters if provided
    if (userVisibleData) requestBody.userVisibleData = userVisibleData;
    if (userNonVisibleData) requestBody.userNonVisibleData = userNonVisibleData;
    if (userVisibleDataFormat) requestBody.userVisibleDataFormat = userVisibleDataFormat;

    const response = await axios.post(`${bankIdApiUrl}/rp/v6.0/phone/auth`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
      httpsAgent, // Use the agent with the BankID certificate
    });

    return response.data; // This will contain the response from BankID, including the orderRef
  } catch (error) {
    console.error('Error starting BankID phone authentication:', error);
    throw error;
  }
};

const collectResult = async (orderRef) => {
  try {
    const response = await axios.post(`${bankIdApiUrl}/rp/v6.0/collect`, {
      orderRef,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      httpsAgent, // Use the agent with the BankID certificate
    });

    return response.data; // This will contain the response from BankID, including the status and possibly completionData
  } catch (error) {
    console.error('Error collecting BankID result:', error);
    throw error;
  }
};


module.exports = {
  startPhoneAuth,
  collectResult,
};