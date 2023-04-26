<script lang="ts">
  import {
    calculatePlaylistDuration,
    extractPlaylistId,
    filterApiInstance,
  } from "./utils";
  import { type Instance } from "./utils";
  // https://api.invidious.io/instances.json?pretty=1
  import instances from "./instances.json";
  const apiHosts = filterApiInstance(instances as Instance[]);

  let timeLength: number = 0;
  let playlistId: string = "";
  let startIndex: number = 1;
  let endIndex: number = 2;
  let apiHost = "https://invidious.snopyta.org/api/v1";
  const sum = async () => {
    timeLength = await calculatePlaylistDuration(
      extractPlaylistId(playlistId),
      startIndex - 1,
      endIndex - 1,
      apiHost
    );
  };
</script>

<form id="playlistInfo">
  <label for="playlistId">YouTube Playlist ID<sup>1</sup></label>
  <input type="text" id="playlistId" bind:value={playlistId} required />
  <br />

  <label for="startIndex">Start index<sup>2</sup></label>
  <input
    type="number"
    id="startIndex"
    bind:value={startIndex}
    required
    min="1"
  />
  <br />

  <label for="endIndex">End index<sup>3</sup></label>
  <input type="number" id="endIndex" bind:value={endIndex} required min="2" />
  <br />

  <label for="apiHost">API host<sup>4</sup></label>
  <input list="apiHosts" id="apiHost" bind:value={apiHost} />
  <datalist id="apiHosts">
    {#each apiHosts as host}
      <option value={host} />
    {/each}
  </datalist>
  <br />

  <button type="button" on:click={sum}>Compute total duration:</button>
  <span>
    {timeLength} sec ({Math.round(timeLength / 60)} min)
  </span>
</form>

<p>Notes:</p>
<ol>
  <li>
    You can also paste the whole playlist URL, or a URL containing the <code
      >list</code
    > URL parameter.
  </li>
  <li>Index starts from 1, as displayed at YouTube website UI.</li>
  <li>Included.</li>
  <li>
    Accessing YouTubde Data API requires an API key, which is not suitable for a
    staic site. Thus, <a href="https://docs.invidious.io/api/">Invidious API</a>
    is used instead. You can choose from the list of available instances, or input
    your own. Invidious is an alternative frontend to YouTube not using official
    YouTube API.
  </li>
</ol>
