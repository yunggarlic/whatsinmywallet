import React from 'react';

interface SendAdaProps {
    styles: string;
}

const SendAda: React.FC<SendAdaProps> = ({styles}): JSX.Element => {
  return (
    <div className={styles}>
      <h1>Send Ada</h1>
      <div>
        <label htmlFor="recipient">Recipient Address:</label>
        <input name="recipient" type="text" minLength={32} maxLength={53}></input>
      </div>
    </div>
  );
};

export default SendAda;