<script lang="ts">
  import { slide } from 'svelte/transition';
  import { isConnected } from '@stores/wallet';
  import * as phantom from '@app/lib/phantom';

  export let show: boolean = false;

  const onKeydown = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'Escape':
        show = false;
        break;
    }
  };

  isConnected.subscribe(value => {
    if (value) {
      show = false;
    }
  });

  $: show;
</script>

<svelte:window on:keydown={onKeydown} />

{#if show}
  <div class="modal-bg">
    <div transition:slide class="modal">
      <div>
        <h1>Connect your wallet</h1>
        <p>
          By connecting your wallet you’ll be able to send and see messages on
          the blockchain
        </p>
      </div>
      <div class="wallets">
        <button class="wallet-button" on:click={phantom.connect}>
          Phantom
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: absolute;

    height: 100vh;
    width: 100vw;

    top: 0;
    left: 0;

    background-color: #fffcf5;

    padding: 50px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 100px;
  }

  .modal h1 {
    font-size: 22px;
    text-align: center;
  }

  .modal p {
    margin-top: 30px;
  }

  .wallets {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .wallet-button {
    background-color: #ede9d7;

    font-size: 15px;
    font-weight: bold;

    width: 100%;
    height: 73px;

    border: none;
    border-radius: 10px;
    outline: none;

    display: flex;
    align-items: center;
    gap: 25px;

    padding: 25px;

    transition: opacity 0.2s ease;
  }

  .wallet-button:not(:disabled):hover {
    opacity: 0.7;
  }

  @media only screen and (min-width: 620px) {
    .modal-bg {
      position: absolute;

      height: 100vh;
      width: 100vw;

      top: 0;
      left: 0;

      background: rgba(0, 0, 0, 0.2);
      z-index: 99;
    }

    .modal {
      height: 437px;
      width: 50ch;

      border-radius: 10px;

      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      gap: 0;
      justify-content: space-between;
    }
  }
</style>
