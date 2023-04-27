type Video = {
  id: string;
  lengthSeconds: number;
  index: number;
};

type Playlist = {
  videos: Video[];
};

const fetchPlaylist = async (
  playlistId: string,
  apiHost: string
): Promise<Playlist> => {
  const response = await fetch(`${apiHost}/api/v1/playlists/${playlistId}`);
  const data = await response.json();
  return data as Playlist;
};

export const calculatePlaylistDuration = async (
  playlistId: string,
  startIndex: number,
  endIndex: number,
  apiHost: string
): Promise<number> => {
  const { videos } = await fetchPlaylist(playlistId, apiHost);

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

export function extractPlaylistId(input: string): string | undefined {
  const url = new URL(input);
  const playlistId = url.searchParams.get("list");

  return playlistId;
}

type InstanceInfo = {
  api: boolean;
  uri: string;
};
export type Instance = [string, InstanceInfo];

export function filterApiInstance(instances: Instance[]): string[] {
  return instances.filter(([_, { api }]) => api).map(([_, { uri }]) => uri);
}
