import React, {useState, useEffect} from 'react'
import './Adjustor.css'
import './Adjustor.Slider.css'

enum MouseState {
  up = 0,
  down
}

const AdjustorSlider: React.FC<{ label: string, value: number, onChange: (value: number) => void  }> = ({label, value, onChange}) => {
  //set initial value to 0 this will change inside useEffect in first render also| or you can directly set useState(value)
  const [sliderVal, setSliderVal] = useState(value);

  // keep mouse state to determine whether i should call parent onChange or not.
  // so basically after dragging the slider and then release the mouse then we will call the parent onChange, otherwise parent function will get call each and every change
  const [mouseState, setMouseState] = useState(MouseState.up);

  useEffect(() => {
    setSliderVal(value); // set new value when value gets changed, even when first render
  }, [value]);

  const changeCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderVal(~~e.target.value); // update local state of the value when changing
  }

  useEffect(() => {
    if (mouseState === MouseState.up) {
      onChange(sliderVal)// when mouse is up then call the parent onChange
    }
  }, [mouseState])
  return (
    <div className="Adjustor-Group">
      {label}
      <input 
        type="range" 
        min="2" 
        max="9999" 
        value={sliderVal} 
        className="Adjustor-Slider" 
        onChange={changeCallback}
        onMouseDown={() => setMouseState(MouseState.down)}
        onMouseUp={() => setMouseState(MouseState.up)}
      />
    </div>
  )
}

export default AdjustorSlider