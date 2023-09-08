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
  let multiplePlaylist: boolean = false;
  let playlistId: string = "";
  let startIndex: number = 1;
  let endIndex: number = 0;
  let apiHost = apiHosts[0];
  const sum = async () => {
    timeLength = 0;
    for (const id of playlistId.split("\n")) {
      timeLength += await calculatePlaylistDuration(
        extractPlaylistId(id),
        startIndex - 1,
        endIndex - 1,
        apiHost
      );
    }
  };
</script>

<form id="playlistInfo">
  <label
    ><input type="checkbox" bind:checked={multiplePlaylist} />Multiple Mode</label
  >
  <label for="playlistId">YouTube Playlist URL<sup>1</sup></label>
  {#if multiplePlaylist}
    <textarea id="playlistId" bind:value={playlistId} required />
  {:else}
    <input type="text" id="playlistId" bind:value={playlistId} required />
  {/if}
  <br />
  {#if !multiplePlaylist}
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
    <input type="number" id="endIndex" bind:value={endIndex} required min="0" />
    <br />
  {/if}

  <label for="apiHost">API host<sup>{multiplePlaylist ? 2 : 4}</sup></label>
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
    You can also paste a YouTube video URL containing the <code>list</code> URL
    parameter.
    {#if multiplePlaylist}
      Please separate multiple URLs with the newline character (<code>\n</code
      >). Note that if repeated URLs are provideded, there will be <em>no</em> deduplication.
    {/if}
  </li>
  {#if !multiplePlaylist}
    <li>Index starts from 1, as displayed at YouTube website UI.</li>
    <li>Included. 0 is to calculate all videos in the playlist.</li>
  {/if}
  <li>
    Accessing YouTube Data API requires an API key, which is not suitable for a
    static site. Thus, <a href="https://docs.invidious.io/api/">Invidious API</a
    >
    is used instead. You can choose from the list of available instances, or input
    your own. Invidious is an alternative frontend to YouTube not using official
    YouTube API.
  </li>
</ol>
