import { get } from 'svelte/store';
import { walletAccount, isConnected } from '@stores/wallet';
import { baseAccount } from '@stores/accounts';
import { gifs } from '@stores/content';
import { svcontentIDL, svcontentMetadata } from '@stores/program';
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  SystemProgram
} from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';

export class Phantom {
  private baseAccount: web3.Keypair;
  private programID: PublicKey;
  private network: string;
  private opts: any;

  constructor() {
    if (!get(baseAccount)) baseAccount.set(web3.Keypair.generate());

    this.baseAccount = this.createBaseAccountFromLS(get(baseAccount));

    this.programID = new PublicKey(get(svcontentMetadata).address);
    this.network = clusterApiUrl('devnet');

    this.opts = {
      preflightCommitment: 'processed'
    };
  }

  private createProvider(): Provider {
    const connection = new Connection(
      this.network,
      this.opts.preflightCommitment
    );
    return new Provider(
      connection,
      window.solana,
      this.opts.preflightCommitment
    );
  }

  private createBaseAccountFromLS(baseAccountDeserialized: any): web3.Keypair {
    const arr = Object.values(baseAccountDeserialized._keypair.secretKey) as [];
    const secret = new Uint8Array(arr);
    return web3.Keypair.fromSecretKey(secret);
  }

  connect = async () => {
    try {
      const { solana } = window;

      if (!solana) {
        console.log(
          "WARN the solana object isn't accessible. Please install the phantom.app extension!"
        );
        throw new Error('Solana object unaccessible');
      }

      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());

      // Create the account for our Program
      const provider = this.createProvider();
      const program = new Program(get(svcontentIDL), this.programID, provider);

      await program.rpc.initialize({
        accounts: {
          baseAccount: this.baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId
        },
        signers: [this.baseAccount]
      });
      console.log(
        'Created a new BaseAccount w/ address:',
        this.baseAccount.publicKey.toString()
      );

      walletAccount.set(response.publicKey.toString());
      isConnected.set(true);
    } catch (err) {
      console.error('Error when connecting wallet', err);
    }
  };

  getGiftList = async () => {
    try {
      const provider = this.createProvider();
      const program = new Program(get(svcontentIDL), this.programID, provider);
      const account = await program.account.baseAccount.fetch(
        this.baseAccount.publicKey
      );

      console.log('Got the account', account);

      gifs.set(account.gifList);
    } catch (err) {
      console.error('Error when getting the GIF list', err);
    }
  };

  saveGifLink = async (link: string) => {
    try {
      const provider = this.createProvider();
      const program = new Program(get(svcontentIDL), this.programID, provider);

      await program.rpc.addGif(link, {
        accounts: {
          baseAccount: this.baseAccount.publicKey,
          user: provider.wallet.publicKey
        }
      });
      console.log('GIF successfuly saved on the blockchain', link);
    } catch (err) {
      console.log('Error when saving a GIF link', err);
    }
  };
}

export const checkWallet = async () => {
  try {
    const { solana } = window;

    if (!solana) {
      console.log(
        "WARN the solana object isn't accessible. Please install the phantom.app extension!"
      );
      throw new Error('Solana object unaccessible');
    }

    if (solana.isPhantom) {
      console.log('Phantom wallet found!');

      /*
       * The solana object gives us a function that will allow us to connect
       * directly with the user's wallet!
       */
      const response = await solana.connect({ onlyIfTrusted: true });
      console.log('Connected with Public Key:', response.publicKey.toString());

      if (response.publicKey.toString()) {
        walletAccount.set(response.publicKey.toString());
        isConnected.set(true);
      } else {
        walletAccount.set('');
        isConnected.set(false);
      }
    } else {
      console.log(
        "WARN the solana object isn't provided by Phantom. Please install the phantom.app extension!"
      );
      throw new Error('Phantom solana object unaccessible');
    }
  } catch (err) {
    console.log('Error when checking for authorized wallet', err);
  }
};
