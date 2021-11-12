<script lang="ts">
  import { slide } from 'svelte/transition';
  import { beforeUpdate } from 'svelte';
  import { isConnected } from '@stores/wallet';
  //   import * as phantom from '@app/lib/phantom';

  const TEST_GIFS = [
    'https://66.media.tumblr.com/b5fd635d1a9be5c6a0c6e32530e52034/tumblr_mvsfl5mzeq1r2p77io1_500.gif',
    'https://66.media.tumblr.com/21875129514baa285a8cb4acc663a7e4/tumblr_nnz6pdtFN61r5zofqo1_500.gif',
    'https://66.media.tumblr.com/c884e9f64a9d6f1943c4e6c3b379fc32/tumblr_o2jnylZx1d1sdoea6o1_540.gif',
    'https://66.media.tumblr.com/68b58cf719caa3683dc665504a7d5567/tumblr_occ8ytguxR1u0c1b5o1_500.gif',
    'https://66.media.tumblr.com/24bf028f7fc3548a89b98654c0afed21/tumblr_ow27di8eG91u5k06fo1_1280.jpg',
    'https://66.media.tumblr.com/6171b03c3f37db32c1305329373174a5/tumblr_nqsq8ywIvX1rsy327o1_1280.jpg'
  ];

  beforeUpdate(() => {
    // phantom.getContent();
  });

  $: isConnected;
</script>

<div class="content">
  {#if $isConnected}
    {#each TEST_GIFS as gif}
      <div class="media" transition:slide>
        <img src={gif} alt={gif} />
      </div>
    {/each}
  {/if}
</div>

<style>
  .content {
    padding-bottom: 65px;
  }

  .media {
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
</style>
