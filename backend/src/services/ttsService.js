require("dotenv").config();
const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");
const path = require("path");
const fileService = require("./fileServices");

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

const client = new textToSpeech.TextToSpeechClient({
  credentials: {
    client_email: serviceAccount.client_email,
    private_key: serviceAccount.private_key.replace(/\\n/g, "\n"),
  },
});

exports.synthesizeTextAndUpload = async (text) => {
  try {
    const request = {
      input: { text },
      voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "MP3" },
    };

    const [response] = await client.synthesizeSpeech(request);

    const tempDir = path.join(__dirname, "../temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  
    const tempFilePath = path.join(tempDir, `output-${Date.now()}.mp3`);
    await util.promisify(fs.writeFile)(tempFilePath, response.audioContent, "binary");

    const fileUrl = await fileService.uploadFileToCloudinary(tempFilePath, "tts-audios");

    fs.unlinkSync(tempFilePath);

    return fileUrl;
  } catch (error) {
  console.error(" GOOGLE TTS ERROR:", JSON.stringify(error, null, 2));
  throw new Error("Failed to generate voice");
}

};
