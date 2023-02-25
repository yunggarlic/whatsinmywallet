import React from "react";

interface DisconnectProps {
  disconnect: () => void;
  styles: string;
}
const Disconnect: React.FC<DisconnectProps> = ({ disconnect, styles }): JSX.Element => {
  return <button className={styles} onClick={disconnect}>Disconnect</button>;
};

export default Disconnect;
