export const validateDonation = (req, res, next) => {
  const { campaign, amount, purpose, message } = req.body;

  // Check if required fields exist
  if (!campaign || !amount || !purpose || !message) {
    return res.status(400).json({
      success: false,
      message: 'campaign, amount, purpose, and message are required'
    });
  }
  
  // Ensure amount is positive number
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'amount must be a positive number'
    });
  }

  // Ensure purpose and message are strings
  if (typeof purpose !== 'string' || typeof message !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'purpose and message must be strings'
    });
  }
  
  next();

};

