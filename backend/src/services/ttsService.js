const textToSpeech = require('@google-cloud/text-to-speech');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || ''
});

const client = new textToSpeech.TextToSpeechClient();

exports.synthesizeTextAndUpload = async (text, voice = 'en-US-Wavenet-D') => {
  const request = {
    input: { text: String(text).slice(0, 5000) }, // limit size for safety
    voice: { languageCode: 'en-US', name: voice },
    audioConfig: { audioEncoding: 'MP3' }
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    const audioBuffer = response.audioContent;

    // upload buffer to Cloudinary (resource_type 'video' supports audio)
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'tts',
          resource_type: 'video',
          public_id: `tts-${Date.now()}`
        },
        (err, result) => {
          if (err) return reject(err);
          resolve(result.secure_url);
        }
      );
      streamifier.createReadStream(audioBuffer).pipe(uploadStream);
    });
  } catch (err) {
    console.warn('TTS error:', err?.message || err);
    return null;
  }
};
