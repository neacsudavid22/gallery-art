// middleware/generateAudio.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateAudio = async (req, res, next) => {
  try {
    const description = req.body.description || 'No description provided';

    const response = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: description,
    });

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    req.audio_blob = buffer;
    req.audio_mime = "audio/mpeg"; 

    next(); 
  } catch (error) {
    console.error("Audio generation failed:", error);
    return res.status(500).json({ error: "Failed to generate audio description." });
  }
};
