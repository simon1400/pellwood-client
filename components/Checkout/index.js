import Checkout from './Checkout'

const CheckoutWrap = ({
  state,
  error,
  sumBefore,
  setError,
  user,
  anotherAdress,
  companyData,
  password,
  note,
  deliveryMethod,
  errorAnother,
  setErrorAnother,
  paymentMethod,
  onBlur
}) => {

  const handleChange = (name, value) => {
    let newState = state[0];
    setError({...error, [name]: false})
    newState[name] = value;
    state[1]({...newState})
  }


  return <Checkout
      handleChange={handleChange}
      state={state}
      error={error}
      sumBefore={sumBefore}
      setError={setError}
      user={user}
      anotherAdress={anotherAdress}
      companyData={companyData}
      password={password}
      note={note}
      deliveryMethod={deliveryMethod}
      errorAnother={errorAnother}
      setErrorAnother={setErrorAnother}
      paymentMethod={paymentMethod}
      onBlur={onBlur}
    />
}


export default CheckoutWrap
