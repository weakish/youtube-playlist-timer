/*
I asked Codeium Chat:

Write a TypeScript program accepts three arguments:
1) playlist id,
2) the starting video index,
3) the ending viedo index,
and returns the total length (playtime) of all videos
between the starting video (included) and the ending video (included).
The individual length of the videos are fetched from quering invidious REST API.
*/
import axios from "axios";

type Video = {
  id: string;
  duration: number;
};

const fetchVideoDuration = async (videoId: string): Promise<number> => {
  const response = await axios.get(
    `https://invidious.snopyta.org/api/v1/videos/${videoId}`,
  );
  const { duration } = response.data as Video;
  return duration;
};

const calculatePlaylistDuration = async (
  playlistId: string,
  startIndex: number,
  endIndex: number,
): Promise<number> => {
  const response = await axios.get(
    `https://invidious.snopyta.org/api/v1/playlists/${playlistId}`,
  );
  const { videos } = response.data;

  let totalDuration = 0;
  for (let i = startIndex; i <= endIndex; i++) {
    const video = videos[i];
    const duration = await fetchVideoDuration(video.id);
    totalDuration += duration;
  }

  return totalDuration;
};

// Example usage:
calculatePlaylistDuration("playlistId", 2, 5).then((duration) =>
  console.log(duration)
);
