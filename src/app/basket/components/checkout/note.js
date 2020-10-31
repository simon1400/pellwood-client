import React from 'react'

const Note = ({state, setState}) => {
  return(
    <div className="form_container">
      <div className="form_column">
        <div className="uk-margin textarea_item">
          <textarea value={state} onChange={(e) => setState(e.target.value)} />
        </div>
      </div>
      <div className="form_column"></div>
    </div>
  )
}

export default Note
