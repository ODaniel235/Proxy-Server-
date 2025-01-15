import ytdl from "@distube/ytdl-core";
import axios from "axios";
const options = (id) => {
  return {
    method: "GET",
    url: "https://youtube-mp36.p.rapidapi.com/dl",
    params: { id },
    headers: {
      "x-rapidapi-key": "dc38bf1d56msh85054e69143448ap149baejsn0c9237e04bd1",
      "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
    },
  };
};

// Usage Example
const handleFetchFromYt = async (req, res) => {
  try {
    const { link } = req.query;

    // Validate the provided YouTube URL
    if (!link || !ytdl.validateURL(link)) {
      console.error("Invalid URL provided:", link);
      return res.status(400).json({ error: "Invalid URL provided" });
    }

    console.log("Fetching video details for:", link);

    // Get basic info using ytdl-core
    const data = await ytdl.getBasicInfo(link);
    const videoId = data.videoDetails.videoId;

    if (!videoId) {
      console.error("Failed to extract video ID");
      return res.status(400).json({ error: "Failed to extract video ID" });
    }

    console.log("Video ID:", videoId);

    // Fetch MP3 link from RapidAPI
    /*     const fetchedData = await fetch(videoId);

    console.log("Fetched data from RapidAPI:", fetchedData);

    if (!fetchedData || fetchedData.status !== "ok") {
      console.error("Failed to fetch MP3 from RapidAPI:", fetchedData?.msg);
      return res
        .status(500)
        .json({ error: "Failed to fetch MP3 from RapidAPI" });
    }

    // Return the fetched data to the frontend
    res.status(200).json({
      title: fetchedData.title,
      mp3Link: fetchedData.link,
    }); */
    const object = options(videoId);
    const response = await axios.request(object);
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error in handleFetchFromYt:", err);
    res.status(500).json({ error: err.message });
  }
};

export default handleFetchFromYt;
