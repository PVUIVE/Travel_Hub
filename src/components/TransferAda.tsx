import { useState } from "react";
import { useLucid } from "../context/LucidProvider";

interface TransferAdaProps {
  defaultAddress: string;
  projectTitle: string;
  onClose: () => void;
  onSuccess: (amount: number) => void;
}

export const TransferAda: React.FC<TransferAdaProps> = ({ 
  defaultAddress, 
  onClose,
  onSuccess 
}) => {
    const { lucid } = useLucid();
    const [ada, setAda] = useState<number>(0);
    const [receiverAddress, setReceiverAddress] = useState<string>(defaultAddress);
    const [txHash, setTxHash] = useState<string>("");
    
    const transferAda = async () => {
        if (!lucid) {
            throw new Error('Lucid instance not initialized');
        }
        try {
            const tx = await lucid.newTx()
                .payToAddress(receiverAddress, { lovelace: BigInt(ada) * 1000000n })
                .complete();

            const signedTx = await tx.sign().complete();
            const txHashResult = await signedTx.submit();
            setTxHash(txHashResult);
            
        } catch (error) {
            console.error('Transfer failed:', error);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Book Your Travel Experience
                </h2>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amount of ADA for Booking
                        </label>
                        <input 
                            type="number" 
                            value={ada} 
                            onChange={(e) => setAda(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            placeholder="Enter amount of ADA" 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Travel Agency Wallet Address
                        </label>
                        <input 
                            type="text" 
                            value={receiverAddress} 
                            onChange={(e) => setReceiverAddress(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            placeholder="Wallet address" 
                        />
                    </div>

                    <button 
                        onClick={transferAda}
                        className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90 transition duration-300"
                    >
                        Confirm ADA Transfer
                    </button>

                    {txHash && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-800">
                                Transaction successful! Hash: 
                                <span className="font-mono break-all">
                                    {txHash}
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}