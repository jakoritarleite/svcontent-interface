import { writable } from 'svelte/store';

export const walletAccount = writable<string>(
  JSON.parse(localStorage.getItem('wallet:address')) as string
);

walletAccount.subscribe(account =>
  localStorage.setItem('wallet:address', JSON.stringify(account))
);

export const isConnected = writable<boolean>(
  JSON.parse(localStorage.getItem('wallet:isconnected')) as boolean
);

isConnected.subscribe(connection =>
  localStorage.setItem('wallet:isconnected', JSON.stringify(connection))
);
