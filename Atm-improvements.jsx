//Bug: if you do not change the value of the input field, you can continue to withdraw money even if balance is not enough to cover it. This is because handleChange does not fire because there was no change in the value. A fix could be to clear the input value after each submit

const ATMDeposit = ({ onChange, isDeposit, isValid, deposit }) => {
  const choice = ['Deposit', 'Cash Back'];
  //const isValid =;
  //console.log(`ATM isDeposit: ${isDeposit}`);
  //console.log(isValid);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" value={deposit} width="200" onChange={onChange}></input>
      <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  //console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    let {value} = event.target;
    value = Number(value);
    //console.log(`handleChange ${value}`);
    setDeposit(value);
    //Validation
    if (value <= 0) {
      setValidTransaction(false);
      //return;
    } else if (atmMode == 'Cash Back' && value > totalState) {
      console.log('quieres retirar más dinero del disponible');
      setValidTransaction(false);
    } else {
      setValidTransaction(true)
    }
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    //setValidTransaction(false);
    console.log(deposit);
    //Resets deposit to prevent bug
    setDeposit(0);
    event.preventDefault();
  };

  const handleModeSelect = (e) => {
    //TODO
    let mode = e.target.value;
    //console.log(mode);
    setAtmMode(mode);
    switch (mode) {
      case 'Deposit':
        setIsDeposit(true);
        break;
      case 'Cash Back':
        setIsDeposit(false);
        break;
    }
  }

  return (
    <div className="bank">
      <h2>$$ Your Bank $$</h2>
      <form onSubmit={handleSubmit}>
        <h3 id="total">{status}</h3>
        <label>Select an action below to continue</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
        {
          atmMode && 
          <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction} deposit={deposit} ></ATMDeposit>
        }      
      </form>
    </div>
    
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
