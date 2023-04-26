/* I asked Codeium Chat:
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

export const calculatePlaylistDuration = async (
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

/* I asked Codeium Chat:
Can you write a TypeScript function which accepts a string,
which may be a YouTube playlist ID, or a YouTube URL containing the playlist ID,
and returns the YouTube playlistID?

I do not think it is necessary to call match twice and test once.
Also, it is unnecessary to put the whole regex in a group.

I am a bit worried on corner cases for matching Playlist ID with `/PL[a-zA-Z0-9_-]+/`.
Special playlists may not use `PL` as prefix. [0](https://stackoverflow.com/q/19795987/)

Can you think of other ways to extract Playlist ID?
*/
function extractPlaylistId(input: string): string | undefined {
  const url = new URL(input);
  const playlistId = url.searchParams.get('list');

  return playlistId;
}
