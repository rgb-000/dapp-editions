// Next, React
import { FC, useEffect, useState } from 'react';
//import Link from 'next/link';
// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import IDL from '../../../idl.json';
import * as anchor from '@project-serum/anchor';
import { mintEditionTx, asyncTxs } from './utils';
import { notify } from '../../utils/notifications';
export const programId = new anchor.web3.PublicKey(IDL.metadata.address);

const label1 = "Editions Left: ";
const label2 = "Price: ";
const img_001 = "https://arweave.net/ejqzdSe6s6NvVDEpHEjAOvsPnnbzVGy7ld-8cNtdPVY?ext=png";
const t_001 = "The Wall";
const p_001 = "240 Pixels";
const s_001 = "0/222";

const store = new anchor.web3.PublicKey(
  '7MWM9CjoD5SvRtVJ36TgZA3fh7qhDCT1J76nfEQ7TXFn',
);


export const HomeView: FC = ({ }) => {
  const wallet = useWallet(),
    { connection } = useConnection(),
    provider = new anchor.AnchorProvider(connection, wallet, {}),
    program = new anchor.Program(IDL, programId, provider),
    balance = useUserSOLBalanceStore((s) => s.balance),
    { getUserSOLBalance } = useUserSOLBalanceStore(),
    [listing, setListing] = useState({
      mint: new anchor.web3.PublicKey(
        '4hVL9JjZMm3aZs7JUWmSrmjHeyRmrYQcrzcdWdRDNPQ6',
      ),
      token: new anchor.web3.PublicKey(
        '4fZbkEYicCJxzZug5Fx6q27YHQ7EthLKpUqo8ZcjVYNj',
      ),
      currency: new anchor.web3.PublicKey(
        'So11111111111111111111111111111111111111112',
      ),
    }),
    [clicked, setClicked] = useState(false),
    [storeData, setStoreData] = useState();

  useEffect(() => {
    if (wallet.publicKey) {
      let a = setInterval(() => {
        (async () => {
          let store_data = await program.account.store.fetch(store);
          setStoreData(store_data);
        })();
      }, 10000);

      return () => {
        clearInterval(a);
      };
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  return (
    <div className="mx-auto p-4">

      <div className="md:hero-content text-center flex flex-col">

        <h2 className="text-center text-2xl font-regular text-primary]">
          {t_001}
        </h2>
        <div className="legend text-1xl font-regular text-secondary">
          <span>{label1}{s_001}</span>&nbsp;|&nbsp;<span>{label2}{p_001}</span></div>
        <div className="edition img flex flex-col"><img className='img' src={img_001}></img></div>
        {wallet.publicKey && storeData && (
          <button
            onClick={async () => {
              if (clicked) {
                return;
              }
              setClicked(true);

              const edition_try =
                0 + Math.floor(storeData.listings[0].sold / 244);

              const txs = await mintEditionTx(
                {
                  store_data: {
                    owner: new anchor.web3.PublicKey(
                      'VLawmZTgLAbdeqrU579ohsdey9H1h3Mi1UeUJpg2mQB',
                    ),
                  },
                  program,
                  store_bump: 255,
                  store,
                },
                listing,
                0,
                edition_try,
                1,
                setClicked,
                wallet,
              );

              try {
                await asyncTxs(txs, wallet, connection);
                notify({ type: 'success', message: 'Mint Successful!' });
              } catch (e: any) {
                notify({ type: 'error', message: `${e}` });
              }

              setClicked(false);
            }}
            className="text-center bg-sky-300 px-4 py-2 rounded-sm text-black"
          >
            {clicked ? 'Minting...' : 'Mint'}
          </button>
        )}
      </div>
    </div>
  );
};
