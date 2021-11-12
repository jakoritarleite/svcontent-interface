<script lang="ts">
  type ButtonVariant = 'primary' | 'secondary' | 'simple';
  export let variant: ButtonVariant = 'primary';
  export let style: string = '';
  $: buttonClass = [variant].join(' ');
</script>

<button class={buttonClass} {style} on:click>
  <div>
    <slot />
  </div>
</button>

<style>
  button {
    border: none;
    outline: none;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: opacity 0.2s ease;
  }

  button:hover {
    opacity: 0.4;
  }

  .primary {
    background: #f6f1eb;
    color: #00251b;
    padding: 10px 25px;
    border-radius: 10px;
  }

  .secondary {
    color: white;
  }

  .simple {
    background: transparent;
    color: #007aff;
  }
</style>
