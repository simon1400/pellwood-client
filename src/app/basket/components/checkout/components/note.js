import React from 'react'

const Note = ({state, setState}) => {
  return(
    <div>
      <div className="form_column">
        <div className="textarea_item">
          <textarea value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <div className="textarea_item"></div>
      </div>
    </div>
  )
}

export default Note
