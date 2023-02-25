import React, { useEffect } from "react";
import { useWallet } from "@meshsdk/react";
import { Summary, Disconnect } from "./components";
import { useRouter } from "next/router";
import styles from "../styles/Dashboard.module.css";
import { Rubik } from "@next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const Dashboard = () => {
  const { connected, wallet, disconnect } = useWallet();
  const router = useRouter();

  const summaryStyles = {
    summary: styles.summary,
    left: styles.left,
    right: styles.right,
    send: styles.send,
    receive: styles.receive,
  }

  useEffect(() => {
    if (connected) {
      console.log("wallet connected");
      console.log(typeof wallet)
    } else {
      console.log("wallet not connected, rerouting to home");
      router.push("/");
    }
  }, [connected, router]);

  return (
    <>
      {connected ? (
        <div className={`${styles.dashboardContainer} ${rubik.className}`}>
          <div className={styles.dashboard}>
            <Disconnect styles={styles.disconnect} disconnect={disconnect}/>
            {wallet ? <Summary styles={summaryStyles} /> : <></>}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Dashboard;
