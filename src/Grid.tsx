import React, { useReducer, useState } from 'react'
import './Grid.css'
import AdjustorButton from './Adjustor.Button'
import GridReducer from './Grid.reducer'
import { RowFactory, deepCopy } from './Grid.util'
import { Cell, GridActionKind } from './Grid.types'
import AdjustorSlider from './Adjustor.Slider'

const Grid: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(9900)
  const [probability, setProbability] = useState(.99)
  const [base] = useState(10000)
  

  const updateSlider = (value: number): void => {
    const getLimiter = () => {
      if (value >= 4000) return 10000
      if (value >= 3000) return  1000
      if (value >= 2000) return   100
      if (value >= 1000) return    10
      return 1
    }
    const getBase = () => base * Math.max(1, (base - value) / getLimiter() )
    const getBaseLog = () => Math.log(value) / Math.log(getBase())

    setProbability(Math.min(getBaseLog(), .99))
    setSliderValue(value)
  }
  
  const [state, dispatch] = useReducer(GridReducer, {
    height: 50,
    width: 50,
    rows: Array(50).fill('').map(() => RowFactory(50))
  })
  const toggleCell = (cell: Cell): void => {
    cell.isOn = !cell.isOn
  }

  const onCellClick = (nRow: number, nColumn: number): void => {
    const rows = deepCopy(state.rows)    
    const getCells = (): Array<Cell> => {
      const cells = new Array<Cell>()
      let [y, x] = [nRow, nColumn]
      while (true) {
        const cell = rows[y].cells[x];
        cells.push(cell)
        if (Math.random() > probability) break
        switch (Math.floor(Math.random() * 4)) {
          case 0:
            y = (y - 1 + state.height) % state.height //Math.max(y - 1, 0)
            break
          case 1:
            y = (y + 1) % state.height //Math.min(y + 1, state.height - 1)
            break
          case 2:
            x = (x - 1 + state.width) % state.width //Math.max(x - 1, 0)
            break
          case 3:
          default:
            x = (x + 1) % state.width //Math.min(x + 1, state.width - 1)
            break
        }
      }
      return cells.filter((value,index,array) => array.indexOf(value) === index)
    }
    for (const cell of getCells()) {
      toggleCell(cell)
    }
    dispatch({ type: GridActionKind.UPDATE_CELL, payload: { ...state, rows } })
  }
  const adjustorDispatch = (type: GridActionKind) => {
    dispatch({ type, payload: deepCopy(state)})
  }
  return (
    <>
      <div className='Adjustor Adjustor-Top'>        
        <AdjustorButton label="LEFT" onAdd={() => adjustorDispatch(GridActionKind.LEFT_ADD)} onSub={() => adjustorDispatch(GridActionKind.LEFT_SUB)} />
        <AdjustorButton label="TOP" onAdd={() => adjustorDispatch(GridActionKind.TOP_ADD)} onSub={() => adjustorDispatch(GridActionKind.TOP_SUB)} />
        <AdjustorButton label="BOTTOM" onAdd={() => adjustorDispatch(GridActionKind.BOTTOM_ADD)} onSub={() => adjustorDispatch(GridActionKind.BOTTOM_SUB)} />
        <AdjustorButton label="RIGHT" onAdd={() => adjustorDispatch(GridActionKind.RIGHT_ADD)} onSub={() => adjustorDispatch(GridActionKind.RIGHT_SUB)} />
      </div>
      <div className='Adjustor Adjustor-Bottom'>
        <AdjustorSlider label="PROBABILITY" value={sliderValue} onChange={updateSlider} />
      </div>
      <div 
        className="Grid" 
      >
        {state.rows.map((row, nRow) => (
          <div className='Row' key={row.id}>
            {row.cells.map((cell, nColumn) => (
              <div 
                className={`Column Column-${cell.isOn?'On':'Off'}`} 
                key={cell.id}
                onClick={() => onCellClick(nRow, nColumn)}
              >
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default Grid
