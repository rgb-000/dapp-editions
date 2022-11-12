// Next, React
import { FC, useEffect, useState } from 'react';
//import Link from 'next/link';
// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import IDL from '../../../idl.json';
import * as anchor from '@project-serum/anchor';
import { mintEditionTx, asyncTxs} from './utils';
import Timer from '../../utils/timer';
import { notify } from '../../utils/notifications';
export const programId = new anchor.web3.PublicKey(IDL.metadata.address);

const store = new anchor.web3.PublicKey(process.env.STORE);
export const HomeView: FC = ({}) => {
  const wallet = useWallet(),
    { connection } = useConnection(),
    provider = new anchor.AnchorProvider(connection, wallet, {}),
    program = new anchor.Program(IDL as anchor.Idl, programId, provider),
    balance = useUserSOLBalanceStore((s) => s.balance),
    { getUserSOLBalance } = useUserSOLBalanceStore(),
    [listing, setListing] = useState({
      mint: new anchor.web3.PublicKey(process.env.MINT),
      token: new anchor.web3.PublicKey(process.env.TOKEN),
      currency: new anchor.web3.PublicKey(process.env.CURRENCY),
    }),
    [clicked, setClicked] = useState(false),
    [index, setIndex] = useState(0),
    [sold, setSold] = useState(0),
    [total, setTotal] = useState(132),
    [name, setName] = useState('Cobalt'),
    [storeData, setStoreData] = useState<any>({ listings: [{ sold: 0 }] });

  useEffect(() => {
    (async () => {
      let store_data = await program.account.store.fetch(store);
      setStoreData(store_data);
      //@ts-ignore
      const index = store_data.listings.findIndex(
        (e) => e.mint.toBase58() === process.env.MINT,
      );
      setIndex(index);
    })();   
  }, []);
  
  useEffect(() => {
    if (wallet.publicKey) {
      let a = setInterval(() => {
        (async () => {
          let store_data = await program.account.store.fetch(store);
          setStoreData(store_data);
          //@ts-ignore      
          const index = store_data.listings.findIndex(
            (e) => e.mint.toBase58() === process.env.MINT,
          );
          setIndex(index);
        })();
      }, 10000);

      return () => {
        clearInterval(a);
      };
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  const Sold = storeData.listings[index]?.sold || 244 ; 
  const Total = /*storeData.listings[index]?.total || 'ø'*/ '∞';
  if (Sold === Total) {var clone = 'Sold Out :('} else {var clone = 'Mint'};
  return (
    
    <div className="mx-auto p-4">
      <div className="md:hero-content text-center flex flex-col">
        <h2 className="text-center text-3xl font-regular text-secondary]">
        {process.env.NAME}
        </h2>
        <div className="legend text-1xl font-regular text-secondary">
          <span>
            <i>Editions minted:</i> {Sold}<i>/</i>{Total} 
          </span> &nbsp;&nbsp;&nbsp;
          <span><i>Price:</i> {process.env.PRICE} <i>Pixels</i></span>
        </div>
        <div className="edition img flex flex-col">
          <img className="img" src={process.env.IMG}></img><i><Timer/></i>
        </div>
        {wallet.publicKey && (
          <button
            onClick={async () => {
              if (clicked) {
                return;
              }
              setClicked(true);

              const edition_try = Math.floor(storeData.listings[0].sold / 244),
                owner = new anchor.web3.PublicKey(process.env.OWNER),
                [store, store_bump] =
                  anchor.utils.publicKey.findProgramAddressSync(
                    [owner.toBytes(), Buffer.from('store')],
                    programId,
                  );

              const txs = await mintEditionTx(
                {
                  store_data: {
                    owner,
                  },
                  program,
                  store_bump,
                  store,
                },
                listing,
                index,
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
            className="mint text-center text-1xl px-6 py-3 text-black"
          >
            MINT PAUSED (WE WILL BE BACK SOON)
          </button>
        )}
      </div>
    </div>
  );
};
