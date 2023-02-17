import { useState, useEffect } from "react";
import type { NextPage, Link } from "next";
import { useWallet } from "@meshsdk/react";
import { CardanoWallet } from "@meshsdk/react";

const Home: NextPage = () => {
  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getAssets() {
    if (wallet) {
      setLoading(true);
      const _assets = await wallet.getAssets();
      setAssets(_assets);
      setLoading(false);
    }
  }

  useEffect(() => {
    //update url
    if (connected) {
      window.history.pushState({}, "", "/dashboard");
    }
  }, [connected])

  return (
    <div className="connect-wallet">
      <div>
        <h1>Connect Wallet</h1>
        <CardanoWallet />
        {connected && (
          <>
            <h1>Get Wallet Assets</h1>
            {assets ? (
              <pre>
                <code className="language-js">
                  {JSON.stringify(assets, null, 2)}
                </code>
              </pre>
            ) : (
              <button
                type="button"
                onClick={() => getAssets()}
                disabled={loading}
                style={{
                  margin: "8px",
                  backgroundColor: loading ? "orange" : "grey",
                }}
              >
                Get Wallet Assets
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
