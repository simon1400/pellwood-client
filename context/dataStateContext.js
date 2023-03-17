import { useReducer, createContext } from "react";
import Cookies from 'js-cookie'

let reducer = (state, action) => {
  switch (action.type) {
    case "basketcz":
      Cookies.set('basketcz', JSON.stringify([ ...action.state ]))
      return { ...state, basket: action.state }
    case "basketCountcz":
      Cookies.set('basketCountcz', JSON.stringify(action.state))
      return { ...state, basketCount: action.state }
    case "basketen":
      Cookies.set('basketen', JSON.stringify([ ...action.state ]))
      return { ...state, basket: action.state }
    case "basketCounten":
      Cookies.set('basketCounten', JSON.stringify(action.state))
      return { ...state, basketCount: action.state }
    case "user":
      Cookies.set('user', JSON.stringify({ ...action.state }))
      return { ...state, user: action.state }
    case "state":
      return { ...state, state: action.state }
    default:
      console.error('action.type: "' + action.type + '" is not implemented')
      return state
  }
};

const initialState = {
  basketcz: Cookies.get('basketcz') ? JSON.parse(Cookies.get('basketcz')) : [],
  basketCountcz: Cookies.get('basketCountcz') ? JSON.parse(Cookies.get('basketCountcz')) : 0,
  basketen: Cookies.get('basketen') ? JSON.parse(Cookies.get('basketen')) : [],
  basketCounten: Cookies.get('basketCounten') ? JSON.parse(Cookies.get('basketCounten')) : 0,
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {},
  state: {
    searchFocus: false
  }
}

const DataStateContext = createContext(initialState);

function DataProvider(props) {
  const [dataContextState, dataContextDispatch] = useReducer(reducer, initialState);
  return (
    <DataStateContext.Provider value={{ dataContextState, dataContextDispatch }}>
      {props.children}
    </DataStateContext.Provider>
  );
}

export { DataStateContext, DataProvider };
