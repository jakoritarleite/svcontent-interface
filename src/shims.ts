// This is needed to fix an error of anchor's dependency when using vite
// See this issue for more information: https://github.com/project-serum/anchor/issues/986

import { Buffer } from 'buffer';
// @ts-ignore
window.Buffer = Buffer;
