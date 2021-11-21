import fs from 'fs';
import path from 'path';
import { web3 } from '@project-serum/anchor';

const createKeypairFromDeserializedKeypair = keypairDeserialized => {
  const arr = Object.values(keypairDeserialized._keypair.secretKey);
  const secret = new Uint8Array(arr);
  return web3.Keypair.fromSecretKey(secret);
};

const checkIfExists = async filepath => {
  try {
    await fs.promises.access(filepath, fs.constants.F_OK);
  } catch {
    fs.writeFileSync(filepath, '');
  }

  const fContent = fs.readFileSync(filepath, {
    encoding: 'utf-8'
  });

  if (!fContent) return;

  return JSON.parse(fContent);
};

const createKeypair = async () => {
  const filepath = path.join('src/keypair.json');
  const keypairDeserialized = await checkIfExists(filepath);

  if (!keypairDeserialized) {
    const keypair = web3.Keypair.generate();
    fs.writeFileSync(filepath, JSON.stringify(keypair));
    console.log('Keypair did not exist, created a new one', keypair);
  } else {
    try {
      const keypair = createKeypairFromDeserializedKeypair(keypairDeserialized);
      console.log('Keypair already exists', keypair);
    } catch (err) {
      console.log('Error creating keypair from file', err);
    }
  }
};

try {
  await createKeypair();
} catch (err) {
  console.error(err);
}
