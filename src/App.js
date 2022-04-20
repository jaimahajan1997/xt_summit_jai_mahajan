import "./App.css";
import React, { useEffect, useState } from "react";
/*
npm install --save web3
npm i --save webpack@4.46.0    
npm i --save react-scripts@4.0.3
SKIP_PREFLIGHT_CHECK=true in .env
*/
let Web3 = require("web3");
let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

const BalanceComponent = ({
  address1,
  address2,
  name1,
  name2,
  from,
  to,
  showBalance,
}) => {
  return (
    <>
      <img
        src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${to}&choe=UTF-8`}
        alt="abc ltd QR code"
      />
      <p>{`${name1} Address=${to} ${
        showBalance ? `, Balance:${address1}` : ""
      }`}</p>
      <p>{`${name2} Address=${from} ${
        showBalance ? `, Balance:${address2}` : ""
      }`}</p>
    </>
  );
};

function App() {
  const [user1, changeState1] = useState("");
  const [user2, changeState2] = useState("");
  const [showBalance, setShowBalance] = useState(false);
  const from = "0x42D5710d1c9616DA253E68814Bc5430dCD6DC01E";
  const to = "0x0d72D45878A69Ca89C4b4f1a949c54d975433A0D";
  const value = "1";
  const name1 = "Customer";
  const name2 = "ABC Account";
  useEffect(() => {
    web3.eth
      .getBalance(from)
      .then((result) => changeState1(web3.utils.fromWei(result, "ether")));
    web3.eth
      .getBalance(to)
      .then((result) => changeState2(web3.utils.fromWei(result, "ether")));
    setShowBalance(false);
  }, []);
  const transfer = (from, to, value) => {
    web3.eth.sendTransaction({
      from,
      to,
      value: web3.utils.toWei(value, "Ether"),
    });
    web3.eth
      .getBalance(from)
      .then((result) => changeState1(web3.utils.fromWei(result, "ether")));
    web3.eth
      .getBalance(to)
      .then((result) => changeState2(web3.utils.fromWei(result, "ether")));
    setShowBalance(false);
  };
  const updateBalance = (from, to) => {
    web3.eth
      .getBalance(from)
      .then((result) => changeState1(web3.utils.fromWei(result, "ether")));
    web3.eth
      .getBalance(to)
      .then((result) => changeState2(web3.utils.fromWei(result, "ether")));
    setShowBalance(true);
  };

  return (
    <div className="App">
      <h1>Welcome to ABC Limited!</h1>
      <h2>Pay Now</h2>
      <BalanceComponent
        address1={user1}
        address2={user2}
        from={from}
        to={to}
        name1={name1}
        name2={name2}
        showBalance={showBalance}
      />
      <button className="pay-button" onClick={() => transfer(from, to, value)}>Pay ABC Ltd</button>
      <button onClick={() => updateBalance(from, to)}>Update Balances</button>
    </div>
  );
}

export default App;
