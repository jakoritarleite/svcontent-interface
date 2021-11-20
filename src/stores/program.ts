import { readable } from 'svelte/store';
import type { Idl } from '@project-serum/anchor';
import idl from '@app/idls/svcontent.json';

export const svcontentIDL = readable<Idl>(idl as Idl);

export const svcontentMetadata = readable(idl.metadata);
