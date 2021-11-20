<script lang="ts">
  import { onMount } from 'svelte';
  import { isConnected } from '@stores/wallet';
  // import { phantonUtils } from '@stores/accounts'; 
  import * as phantom from '@app/lib/phantom';
  import Button from '@components/Button.svelte';
  import ConnectWalletModal from '@components/ConnectWalletModal.svelte';
  import Input from '@components/Input.svelte';
  import Content from '@components/Content.svelte';

  // let phantomUtils: phantom.Phantom;
  let showConnectWalletModal: boolean = false;

  onMount(async () => {
    try {
      await phantom.checkWallet();

      if ($isConnected) {
        // phantomUtils = new phantom.Phantom();
        // phantomUtils.getGiftList();
      }
    } catch (err) {
      console.log(err);
    }
  });

  $: isConnected;
</script>

<main>
  <header>
    <h1>SVContent</h1>
    {#if !$isConnected}
      <Button
        on:click={() => (showConnectWalletModal = !showConnectWalletModal)}
        >Connect</Button
      >
    {/if}
  </header>
  <h1 class="description">
    View your gallery of stimulating visual content on the blockchain
  </h1>
  <Input />
  <Content />
  <ConnectWalletModal bind:show={showConnectWalletModal} />
</main>

<style>
  main {
    font-family: 'Poppins', sans-serif;

    max-width: 30ch;
    margin-inline: auto;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 100px;
  }

  header h1 {
    font-size: 20px;
  }

  .description {
    font-size: 25px;
    margin-inline: auto;

    margin-top: 70px;
  }

  @media only screen and (min-width: 620px) {
    main {
      max-width: 60ch;
    }

    header h1 {
      font-size: 25px;
    }

    .description {
      font-size: 30px;
    }
  }
</style>
