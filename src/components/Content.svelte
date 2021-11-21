<script lang="ts">
  import { slide } from 'svelte/transition';
  import { isConnected } from '@stores/wallet';
  import { gifs } from '@stores/content';
  import * as phantom from '@app/lib/phantom';
  import HeartIcon from './assets/HeartIcon.svelte';

  let phantomWeb3: phantom.Phantom = new phantom.Phantom();

  if ($isConnected) {
    phantomWeb3.getGiftList();
  }

  const upvote = async (link: string) => {
    await phantomWeb3.upvote(link);
    await phantomWeb3.getGiftList();
  };

  $: gifs;
  $: isConnected;
</script>

<div class="content">
  {#if $isConnected}
    {#if $gifs}
      {#each $gifs.reverse() as gif}
        <div class="media" transition:slide>
          <div class="interactions">
            <p class="sender_address">{gif.userAddress.toString()}</p>
            <button on:click={() => upvote(gif.gifLink)} class="upvotes">
              {gif.upvotes.length}
              <HeartIcon style="margin-left:5px" />
            </button>
          </div>
          <img src={gif.gifLink} alt={gif.gifLink} />
        </div>
      {/each}
    {/if}
  {/if}
</div>

<style>
  .content {
    padding-bottom: 65px;
  }

  .media {
    position: relative;
    width: 100%;

    margin-top: 15px;
  }

  .media img {
    width: 100%;

    border-radius: 50px;

    transition: border-radius cubic-bezier(0.4, 0, 0.2, 1) 250ms;
  }

  .media img:hover {
    border-radius: 30px;
  }

  .media .interactions {
    width: calc(100% - 50px);

    display: flex;
    justify-content: space-between;

    position: absolute;

    bottom: 30px;

    margin-left: 25px;
    margin-right: 25px;
  }

  .media p,
  .media button {
    display: flex;
    align-items: center;

    background-color: #e8e6d0;
    font-weight: bold;

    padding: 7.5px;
    padding-inline: 12.5px;
    border-radius: 20px;
  }

  .media .upvotes {
    outline: none;
    border: none;

    font-weight: bold;

    transition: border-radius cubic-bezier(0.4, 0, 0.2, 1) 250ms;
  }

  .media .upvotes:hover {
    border-radius: 15px;
  }
</style>
