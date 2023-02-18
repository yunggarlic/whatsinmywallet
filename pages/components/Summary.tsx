import React, { useEffect, useState } from "react";
import { useWallet } from "@meshsdk/react";

const Summary: React.FC = () => {
  const { wallet } = useWallet();
  const [balance, setBalance] = useState<string>("0");

  useEffect(() => {
    const fetchBalance = async () => {
      let _balance: string = "0";
      if (wallet) {
        //getLovelace is a method that returns the amount of lovelace in the wallet as a string
        //see: https://github.com/MeshJS/mesh/blob/a1debf3823f3f3653e1ad40b21a7515b522480bc/packages/module/src/wallet/browser.service.ts#L164
        _balance = await wallet.getLovelace();
      }
      setBalance(_balance);
    };

    fetchBalance().catch(console.error);
  }, [wallet]);
  return (
    <div className="summary">
      <div className="left">
        <h1>Summary</h1>
        <div>
          <h2>Total ADA: {balance}</h2>
        </div>
      </div>
      <div className="right">
        <button>Send ADA</button>
        <button>Receive ADA</button>
      </div>
    </div>
  );
};

export default Summary;
