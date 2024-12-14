import { Lucid , UTxO } from 'lucid-cardano'
import { createContext, useState, useEffect, useContext } from 'react'
import { Blockfrost } from 'lucid-cardano'

interface LucidContextType {
    lucid: Lucid | null
    setLucid: (lucid: Lucid) => void
    address: string | null
    connectWallet: () => Promise<void>
    getUtxos: () => Promise<UTxO[]>
}

const LucidContext = createContext<LucidContextType | undefined>(undefined);

export function LucidProvider({ children }: { children: React.ReactNode }) {
    const [lucid, setLucid] = useState<Lucid | null>(null);
    const [address, setAddress] = useState<string | null>(null);

    useEffect(() => {
        async function initlucid() {
          const lucidInstance = await Lucid.new(
            new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodHFmlDWqGiOpgWdvD4hQ63G0oW6yq8uKx"),
            "Preprod",
          );  
        //   console.log(lucidInstance);
          setLucid(lucidInstance);
        }
        initlucid();
      }, [])

      const connectWallet = async () => {
        if (!lucid) {
            throw new Error('Lucid instance not initialized');
        }
        const api = await window.cardano.nami.enable();
        await lucid.selectWallet(api);

        const addressResult = await lucid.wallet.address();
        setAddress(addressResult);
      }

      const getUtxos = async () => {
        if (!lucid) {
            throw new Error('Lucid instance not initialized');
        }

        const utxos = await lucid.wallet.getUtxos();
        return utxos;
      }

    return (
        <LucidContext.Provider value={{ lucid, setLucid , address, connectWallet , getUtxos }}>
            {children}
        </LucidContext.Provider>
    )
}

export const useLucid = () => {
    const context = useContext(LucidContext);
    if (!context) {
        throw new Error('useLucid must be used within a LucidProvider')
    }
    return context
}