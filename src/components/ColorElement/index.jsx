import { useRef } from "react";
import * as s from "./ColorElement.module.css";

const ColorElement = ({ color, name, index, removeColor, editColor }) => {
  const colorRef = useRef(null);
  const nameRef = useRef(null);

  const handleEdit = () => {
    if (!colorRef.current || !nameRef.current) return;
    const newColor = colorRef.current.value;
    const newName = nameRef.current.value;
    editColor(index, newColor, newName);
  };

  return (
    <div className={s.colorForm}>
      <input type="color" defaultValue={color} ref={colorRef} onBlur={handleEdit}/>
      <input placeholder="Color name" type="text" defaultValue={name} ref={nameRef} onBlur={handleEdit}/>
      <button type="button" onClick={() => removeColor(index)}>
        &times;
      </button>
    </div>
  );
};

export default ColorElement;