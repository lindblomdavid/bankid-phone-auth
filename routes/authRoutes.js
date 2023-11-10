// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bankIdService = require('../services/bankidService'); // Adjust the path as needed

router.post('/start-phone-auth', async (req, res) => {
  try {
    const { personalNumber, callInitiator, requirement, userVisibleData, userNonVisibleData, userVisibleDataFormat } = req.body;

    // Validate required parameters
    if (!personalNumber || !callInitiator) {
      return res.status(400).json({ error: "Personal number and call initiator are required" });
    }

    const authResponse = await bankIdService.startPhoneAuth(personalNumber, callInitiator, requirement, userVisibleData, userNonVisibleData, userVisibleDataFormat);
    res.json(authResponse);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.post('/collect', async (req, res) => {
  try {
    const { orderRef } = req.body;

    // Validate required parameter
    if (!orderRef) {
      return res.status(400).json({ error: "orderRef is required" });
    }

    const collectResponse = await bankIdService.collectResult(orderRef);
    res.json(collectResponse);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});



module.exports = router;
