import React from 'react'
import { useWallet } from "@meshsdk/react";

const Dashboard = () => {
    const { connected, wallet } = useWallet();
    function handleDisconnect(){
        // console.log('disconnecting')
        // connected.valueOf(false)
        if (connected) {
            console.log('wallet connected')
        }
    }

  return (
    <div>Dashboard
        <button onClick={handleDisconnect}>connect</button>
    </div>
  )
}

export default Dashboard