<script lang="ts">
  import { calculatePlaylistDuration, extractPlaylistId } from "./utils"

  let timeLength: number = 0
  let playlistId: string = ""
  let startIndex: number = 1
  let endIndex: number = 2
  const sum = async () => {
    timeLength = await calculatePlaylistDuration(extractPlaylistId(playlistId), startIndex - 1, endIndex - 1)
  }
</script>

<form id="playlistInfo">
  <label for="playlistId">YouTube Playlist ID<sup>1</sup></label>
  <input type="text" id="playlistId" bind:value={playlistId} required>
  <br>
  <label for="startIndex">Start index<sup>2</sup></label>
  <input type="number" id="startIndex" bind:value={startIndex} required min=1>
  <br>
  <label for="endIndex">End index<sup>3</sup></label>
  <input type="number" id="endIndex" bind:value={endIndex} required min=2>
  <br>
  <button type="button" on:click={sum}>Compute total duration:</button>
  <span>
    {timeLength} sec
    ({Math.round(timeLength/60)} min)
  </span>
</form>

<p>Notes:</p>
<ol>
<li>You can also paste the whole playlist URL, or a URL containing the <code>list</code> URL parameter.</li>
<li>Index starts from 1, as displayed at YouTube website UI.</li>
<li>Included.</li>
</ol>
