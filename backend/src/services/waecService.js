const axios = require('axios');

const WAEC_BASE = process.env.WAEC_API_URL;
const WAEC_KEY = process.env.WAEC_API_KEY;

exports.getRandomQuestions = async (subject = 'general', count = 10) => {
  if (!WAEC_BASE) {
    // fallback: return an empty list
    return [];
  }
  try {
    const resp = await axios.get(`${WAEC_BASE}/questions`, {
      params: { subject, limit: count },
      headers: { 'x-api-key': WAEC_KEY }
    });
    return resp.data || [];
  } catch (err) {
    console.warn('WAEC service error:', err?.message || err);
    return [];
  }
};
