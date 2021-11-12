import { walletAccount, isConnected } from '@stores/wallet';

export const connect = async () => {
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

    walletAccount.set(response.publicKey.toString());
    isConnected.set(true);
  } catch (err) {
    console.log('Error when connecting wallet', err);
  }
};

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
