import * as anchor from '@project-serum/anchor';
import { programId } from './index';

export const systemProgram = new anchor.web3.PublicKey(
  '11111111111111111111111111111111',
);
export const metaProgram = new anchor.web3.PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
);

export const rent = new anchor.web3.PublicKey(
  'SysvarRent111111111111111111111111111111111',
);

export const associatedTokenProgram = anchor.utils.token.ASSOCIATED_PROGRAM_ID;
export const tokenProgram = anchor.utils.token.TOKEN_PROGRAM_ID;

export async function asyncTxs(
  raw_txs: [anchor.web3.Transaction[], any[]],
  wallet: any,
  connection: any,
) {
  const rbh = (await connection.getRecentBlockhash()).blockhash;
  for (let i = 0, l = raw_txs[0].length; i < l; i++) {
    const [tx, signers] = [raw_txs[0][i], raw_txs[1][i]];
    tx.setSigners(wallet.publicKey);

    tx.recentBlockhash = rbh;
    tx.feePayer = wallet.publicKey;

    for (let j = 0, l2 = signers.length; j < l2; j++) {
      tx.sign(signers[j]);
    }
  }
  const signed_txs = await wallet.signAllTransactions(raw_txs[0]);

  const promises = signed_txs.map((e: any) => {
    return anchor.web3.sendAndConfirmRawTransaction(connection, e.serialize(), {
      commitment: 'finalized',
      skipPreflight: true,
    });
  });

  return Promise.all(promises).catch((e) => {
    let error = `Error occurred. ${e}`;

    if (elogs !== undefined) {
      error = e.logs[e.logs.length - 3].split(' ').splice(2).join(' ');
      if (error.indexOf('0x1') > -1) {
        error = 'Insufficient funds.';
      }
    }

    throw error;
  });
}

export async function mintEditionTx(
  main: any,
  listing: any,
  index: number,
  edition_try: number,
  mints: number,
  cb: any,
  wallet: any,
) {
  const master_token = listing.token,
    master_mint = listing.mint,
    master_meta = anchor.utils.publicKey.findProgramAddressSync(
      [Buffer.from('metadata'), metaProgram.toBuffer(), master_mint.toBuffer()],
      metaProgram,
    )[0],
    master_me = anchor.utils.publicKey.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        metaProgram.toBuffer(),
        master_mint.toBuffer(),
        Buffer.from('edition'),
      ],
      metaProgram,
    )[0],
    user = anchor.utils.publicKey.findProgramAddressSync(
      [master_mint.toBuffer(), wallet.publicKey.toBuffer()],
      programId,
    )[0];

  const edMarker1 = anchor.utils.publicKey.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        metaProgram.toBuffer(),
        master_mint.toBuffer(),
        Buffer.from('edition'),
        Buffer.from(String(edition_try)),
      ],
      metaProgram,
    )[0],
    edMarker2 = anchor.utils.publicKey.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        metaProgram.toBuffer(),
        master_mint.toBuffer(),
        Buffer.from('edition'),
        Buffer.from(String(edition_try + 1)),
      ],
      metaProgram,
    )[0],
    edMarker3 = anchor.utils.publicKey.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        metaProgram.toBuffer(),
        master_mint.toBuffer(),
        Buffer.from('edition'),
        Buffer.from(String(edition_try + 2)),
      ],
      metaProgram,
    )[0],
    edMarker4 = anchor.utils.publicKey.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        metaProgram.toBuffer(),
        master_mint.toBuffer(),
        Buffer.from('edition'),
        Buffer.from(String(edition_try + 3)),
      ],
      metaProgram,
    )[0],
    tokenCurrencyPayer = anchor.utils.publicKey.findProgramAddressSync(
      [
        wallet.publicKey.toBuffer(),
        tokenProgram.toBuffer(),
        listing.currency.toBuffer(),
      ],
      associatedTokenProgram,
    )[0],
    tokenCurrencyRecip = anchor.utils.publicKey.findProgramAddressSync(
      [
        main.store_data.owner.toBuffer(),
        tokenProgram.toBuffer(),
        listing.currency.toBuffer(),
      ],
      associatedTokenProgram,
    )[0];

  let ret = [[], []];

  for (let i = 0; i < mints; i++) {
    const newMint = anchor.web3.Keypair.generate(),
      newToken = anchor.utils.publicKey.findProgramAddressSync(
        [
          wallet.publicKey.toBuffer(),
          tokenProgram.toBuffer(),
          newMint.publicKey.toBuffer(),
        ],
        associatedTokenProgram,
      )[0],
      newMeta = anchor.utils.publicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          metaProgram.toBuffer(),
          newMint.publicKey.toBuffer(),
        ],
        metaProgram,
      )[0],
      newMe = anchor.utils.publicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          metaProgram.toBuffer(),
          newMint.publicKey.toBuffer(),
          Buffer.from('edition'),
        ],
        metaProgram,
      )[0],
      tx = new anchor.web3.Transaction(),
      signers = [newMint];

    tx.add(
      await main.program.instruction.mintEdition(
        index,
        main.store_bump,
        edition_try,
        {
          accounts: {
            payer: wallet.publicKey,
            user,
            store: main.store,
            newMint: newMint.publicKey,
            newMeta,
            newMe,
            newToken,
            token: master_token,
            mint: master_mint,
            meta: master_meta,
            me: master_me,
            edMarker1,
            edMarker2,
            edMarker3,
            edMarker4,
            currency: listing.currency,
            tokenCurrencyPayer,
            tokenCurrencyRecip,
            tokenProgram,
            associatedTokenProgram,
            metaProgram,
            systemProgram,
            rent,
          },
        },
      ),
    );

    ret[0].push(tx);
    ret[1].push(signers);
  }

  return ret;
}
