const ATMDeposit = ({ onChange, isDeposit, isValid, deposit }) => {
  const choice = ["Deposit", "Cash Back"];
  return (
    <label className="label huge">
      <h3>{choice[Number(!isDeposit)]}</h3>
      <input type="number" value={deposit} onChange={onChange}></input>
      <input type="submit" value="Submit" disabled={!isValid}></input>
    </label>
  );
};

const TransactionsList = ({ transactions }) => {
  const newRow = transactions.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.date}</td>
        <td>{item.amount}</td>
        <td>{item.type}</td>
        <td>{item.balance}</td>
      </tr>
    );
  });
  return newRow;
};

const Account = () => {
  const [deposit, setDeposit] = React.useState('');
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [isValid, setIsValid] = React.useState(false);
  const [mode, setMode] = React.useState("");
  const [transactions, setTransactions] = React.useState([]);

  let status = `Account Balance  $${totalState}`;

  const handleChange = (event) => {
    setDeposit(Number(event.target.value));
    if (deposit <= 0) {
      event.preventDefault();
      return setIsValid(false);
      // }else if(!isDeposit && deposit > totalState) {
      //     alert("Insufficient Funds");
      //     setIsValid(false);
    } else {
      console.log("Valid Transaction");
      setIsValid(true);
    }
  };

  const handleSubmit = (event) => {
    if (!isDeposit && deposit > totalState) {
      alert("Insufficient Funds");
      event.preventDefault();
      setIsValid(false);
      setDeposit('');
      return;
    }
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setIsValid(false);
    event.preventDefault();
    saveTransactions(newTotal);
    setDeposit('');
  };

  const handleModeSelect = (event) => {
    setMode(event.target.value);
    if (event.target.value === "Deposit") setIsDeposit(true);
    if (event.target.value === "Cash Back") setIsDeposit(false);
  };

  const saveTransactions = (total) => {
    let today = new Date();
    let date = `${
      today.getMonth() + 1
    }-${today.getDate()}-${today.getFullYear()}`;
    let newTransaction = {
      date: `${date}`,
      amount: `$${deposit}`,
      type: isDeposit ? "Deposit" : "Withdrawal",
      balance: `$${total}`,
    };
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <select onChange={handleModeSelect} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">
            Deposit
          </option>
          <option id="cashback-selection" value="Cash Back">
            Cash Back
          </option>
        </select>
        {mode != "" && (
          <ATMDeposit
            onChange={handleChange}
            isDeposit={isDeposit}
            isValid={isValid}
            deposit={deposit}
          >
            {" "}
            Deposit
          </ATMDeposit>
        )}
      </form>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Account Balance</th>
          </tr>
        </thead>
        <tbody>
          <TransactionsList transactions={transactions} />
        </tbody>
      </table>
    </>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
