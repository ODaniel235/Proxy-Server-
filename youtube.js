import ytdl from "@distube/ytdl-core";
const getAudioAsBase64 = async (url) => {
  try {
    const audioStream = await ytdl(url, {
      filter: "audioonly",
      quality: "highestaudio",
    });

    const chunks = [];
    return new Promise((resolve, reject) => {
      audioStream.on("data", (chunk) => {
        chunks.push(chunk);
        console.log(chunk);
      });

      audioStream.on("end", () => {
        const audioBuffer = Buffer.concat(chunks);
        const base64Audio = audioBuffer.toString("base64");
        resolve(base64Audio);
      });

      audioStream.on("error", (error) => reject(error));
    });
  } catch (error) {
    throw new Error(`Error processing audio: ${error.message}`);
  }
};
export const fetchFromYt = async (req, res) => {
  try {
    const { link } = req.query;
    console.log("Receieved request at ===>", link);
    const base64Audio = await getAudioAsBase64(link);
    console.log(base64Audio);
    // Send Base64 response
    res.json({ success: true, base64: base64Audio });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
