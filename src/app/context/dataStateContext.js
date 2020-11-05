import React, { useReducer, createContext } from "react";

let reducer = (state, action) => {
  switch (action.type) {
    case "basket":
      localStorage.setItem('basket', JSON.stringify([ ...action.state ]))
      return { ...state, basket: action.state }
    case "basketCount":
      localStorage.setItem('basketCount', JSON.stringify(action.state))
      return { ...state, basketCount: action.state }
    case "user":
      localStorage.setItem('user', JSON.stringify({ ...action.state }))
      return { ...state, user: action.state }
    case "state":
      return { ...state, state: action.state }
    default:
      console.error('action.type: "' + action.type + '" is not implemented')
      return state
  }
};

const initialState = {
  basket: localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [],
  basketCount: localStorage.getItem('basketCount') ? JSON.parse(localStorage.getItem('basketCount')) : 0,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
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
