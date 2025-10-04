const axios = require('axios');

const WAEC_BASE = process.env.WAEC_API_URL;
const WAEC_KEY = process.env.WAEC_API_KEY;

async function getQuestions(subject, count = 5, year = new Date().getFullYear()) {
  if (!WAEC_BASE) return [];

  try {
    const resp = await axios.get(`${WAEC_BASE}/questions`, {
      params: { subject, limit: count, year },
      headers: { 'x-api-key': WAEC_KEY },
    });
    return resp.data || [];
  } catch (err) {
    console.warn('WAEC service error:', err?.message || err);
    return [];
  }
}

module.exports = { getQuestions };
