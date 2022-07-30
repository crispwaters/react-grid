import React from 'react'
import './Adjustor.css'
import './Adjustor.Button.css'

const AdjustorButton: React.FC<{ label: string, onAdd: () => void, onSub: () => void }> = ({label, onAdd, onSub}) => {
  return (
    <div className="Adjustor-Group">
      <button className='Adjustor-Button' onClick={() => { onSub() }}>-</button>
      {label}
      <button className='Adjustor-Button' onClick={onAdd}>+</button>
    </div>
  )
}

export default AdjustorButton