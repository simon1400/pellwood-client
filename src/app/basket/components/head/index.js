import React from 'react'
import './style.scss'

const Head = ({head}) => {
  return(
    <div className="tm-basket-head">
      <h1>{head}</h1>
      <a href="/" className="tm-button tm-bare-button" uk-toggle="">přihlásit</a>
    </div>
  )
}

export default Head
