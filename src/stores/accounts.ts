import { writable } from 'svelte/store';
import type { web3 } from '@project-serum/anchor';

export const baseAccount = writable(
  JSON.parse(localStorage.getItem('account:baseAccount'))
);

baseAccount.subscribe((account: web3.Keypair) =>
  localStorage.setItem('account:baseAccount', JSON.stringify(account))
);
