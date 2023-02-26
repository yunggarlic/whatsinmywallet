import React, { useEffect, useState } from "react";
import { useWallet } from "@meshsdk/react";
import { SendAda } from './'

interface SummaryProps {
  styles: SummaryStyles;
}

type SummaryStyles = {
  summary: string;
  left: string;
  right: string;
  send: string;
  receive: string;
  toggleLovelace: string;
  sendModal: string;
};

const Summary: React.FC<SummaryProps> = ({ styles }): JSX.Element => {
  const { wallet, connected } = useWallet();
  const [showLovelace, setShowLovelace] = useState<boolean>(false);
  const [lovelaceBalance, setLovelaceBalance] = useState<string>("0");
  const [showSendWindow, setShowSendWindow] = useState<boolean>(false);
  const [showReceiveWindow, setShowReceiveWindow] = useState<boolean>(false);

  useEffect(() => {
    const fetchBalance = async () => {
      let _lovelaceBalance: string = "0";
      if (connected) {
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
          <span>Total:</span>{" "}
          <span>
            {showLovelace
              ? lovelaceBalance
              : parseInt(lovelaceBalance, 10) / 1000000 + "₳"}
          </span>
        </div>
        <button
          className={styles.toggleLovelace}
          onClick={() => setShowLovelace(!showLovelace)}
        >
          Show in {showLovelace ? "ADA" : "Lovelace"}
        </button>
      </div>
      <div className={styles.right}>
        <button onClick={() => setShowSendWindow(true)} className={styles.send}>
          Send ADA
        </button>
        <button className={styles.receive}>Receive ADA</button>
        {showSendWindow ? <SendAda styles={styles.sendModal} /> : <></>}
      </div>
    </div>
  );
};

export default Summary;
