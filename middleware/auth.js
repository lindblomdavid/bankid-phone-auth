const apiKeyFromSecrets = process.env.APP_API_KEY;

const auth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (
    !apiKey ||
    !apiKeyFromSecrets ||
    apiKey.trim() !== apiKeyFromSecrets.trim()
  ) {
    res.status(401).json({ msg: 'Invalid API key' });
  } else {
    next();
  }
};

module.exports = auth;
