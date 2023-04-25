/*
I asked Codeium Chat:

Write a TypeScript program accepts three arguments:
1) playlist id,
2) the starting video index,
3) the ending viedo index,
and returns the total length (playtime) of all videos
between the starting video (included) and the ending video (included).
The individual length of the videos are fetched from quering invidious REST API.

`/api/v1/playlists/:plid` already includes lengthSeconds for each video in the playlists.
Thus there is no need to query `/api/v1/videos/:videoid` seperately.
Besides, please use fetch API instead.

In the videos array, every video has a "index" key.
I would check that key to make sure it matches the array index
(throws an error if mismatch is found).
*/
type Video = {
  id: string;
  lengthSeconds: number;
  index: number;
};

type Playlist = {
  videos: Video[];
};

const fetchPlaylist = async (playlistId: string): Promise<Playlist> => {
  const response = await fetch(
    `https://invidious.snopyta.org/api/v1/playlists/${playlistId}`,
  );
  const data = await response.json();
  return data as Playlist;
};

const calculatePlaylistDuration = async (
  playlistId: string,
  startIndex: number,
  endIndex: number,
): Promise<number> => {
  const { videos } = await fetchPlaylist(playlistId);

  let totalDuration = 0;
  for (let i = startIndex; i <= endIndex; i++) {
    const video = videos[i];
    if (video.index !== i) {
      throw new Error(`Video index mismatch at index ${i}`);
    }
    totalDuration += video.lengthSeconds;
  }

  return totalDuration;
};

// Example usage:
// const samplePlaylistId = ""
// calculatePlaylistDuration(samplePlaylistId, 43, 47).then((duration) =>
//   console.log(duration)
// );
