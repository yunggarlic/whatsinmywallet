import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useWallet } from "@meshsdk/react";
import { CardanoWallet } from "@meshsdk/react";

const Home: NextPage = () => {
  const router = useRouter();


  const { connected, wallet, disconnect } = useWallet();
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
    if (connected)
      router.push('/dashboard');
  }, [connected, router])

  return (
    <div className="connect-wallet">
      <div>
        <CardanoWallet />
      </div>
    </div>
  );
};

export default Home;
