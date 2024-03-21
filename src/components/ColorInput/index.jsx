import { useRef } from "react";
import * as s from './ColorInput.module.css';
import Accordion from "../Accordion";
import ColorExample from '../ColorExample';

const ColorInput = ({
  color,
  name,
  index,
  removeColor,
  colorSteps,
  useOpacity,
  opacitySteps,
  minOpacity,
  maxOpacity,
  colorFunction,
  editColor
}) => {
  const colorRef = useRef(null);
  const nameRef = useRef(null);

  const handleEdit = () => {
    if (!colorRef.current || !nameRef.current) return;
    const newColor = colorRef.current.value;
    const newName = nameRef.current.value;
    editColor(index, newColor, newName);
  };

  return (
    <Accordion 
      className={s.colorInput} 
      label={(
        <div className={s.label}>
          <button className="circle" type="button" onClick={() => removeColor(index)}>
            &times;
          </button>
          <input type="color" defaultValue={color} ref={colorRef} onBlur={handleEdit}/>
          <input className={s.input} placeholder="Color name" type="text" defaultValue={name} ref={nameRef} onBlur={handleEdit}/>
        </div>)}
    >
      <div className={s.colorExamples}>
        <ColorExample
          color={color}
          colorFunction={colorFunction}
          name={name}
          colorSteps={colorSteps}
          useOpacity={useOpacity}
          opacitySteps={opacitySteps}
          minOpacity={minOpacity}
          maxOpacity={maxOpacity}
        />
      </div>
    </Accordion>
  );
}

export default ColorInput;