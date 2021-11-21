import { readable } from 'svelte/store';
import keypair from '@app/keypair.json';

export const baseAccount = readable(keypair);
