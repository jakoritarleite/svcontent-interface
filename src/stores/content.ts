import { writable } from 'svelte/store';
import type { PublicKey } from '@solana/web3.js';

type Upvote = {
  userAddress: PublicKey;
};

type GIF = {
  upvotes: Array<Upvote>;
  gifLink: string;
  userAddress: PublicKey;
};

export const gifCount = writable(0);

export const gifs = writable<Array<GIF>>();
