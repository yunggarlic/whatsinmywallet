import React, { useEffect, useState } from "react";
import { useWallet } from "@meshsdk/react";


interface SummaryProps {
  styles: SummaryStyles;
}

type SummaryStyles = {
  summary: string;
  left: string;
  right: string;
  send: string;
  receive: string;
};

const Summary: React.FC<SummaryProps> = ({ styles }): JSX.Element => {
  const { wallet, connected } = useWallet();
  const [lovelaceBalance, setLovelaceBalance] = useState<string>("0");

  useEffect(() => {
    const fetchBalance = async () => {
      let _lovelaceBalance: string = "0";
      let _balance: string = "0";
      if (connected) {
        //getLovelace is a method that returns the amount of lovelace in the wallet as a string
        //see: https://github.com/MeshJS/mesh/blob/a1debf3823f3f3653e1ad40b21a7515b522480bc/packages/module/src/wallet/browser.service.ts#L164
        _lovelaceBalance = await wallet.getLovelace();
      }
      setLovelaceBalance(_lovelaceBalance);
    };

    fetchBalance().catch(console.error);
  }, [connected, wallet]);
  return (
    <div className={styles.summary}>
      <div className={styles.left}>
        <h1>Summary</h1>
        <div>
          <h2>Total ADA: {parseInt(lovelaceBalance, 10) / 1000000}</h2>
          <span></span>
        </div>
      </div>
      <div className={styles.right}>
        <button className={styles.send}>Send ADA</button>
        <button className={styles.receive}>Receive ADA</button>
      </div>
    </div>
  );
};

export default Summary;
