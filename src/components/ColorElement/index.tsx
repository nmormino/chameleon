import { useRef } from "react";
import type {IColorElementProps} from "./types";

const ColorElement = ({ color, name, index, removeColor, editColor }: IColorElementProps) => {
  const colorRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    if (!colorRef.current || !nameRef.current) return;
    const newColor = colorRef.current.value;
    const newName = nameRef.current.value;
    editColor(index, newColor, newName);
  };

  return (
    <li
      key={index}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', String(index));
      }}
    >
      <div style={{ backgroundColor: color }}></div>
      <input type="color" defaultValue={color} ref={colorRef} />
      <input type="text" defaultValue={name} ref={nameRef} />
      <button type="button" onClick={() => removeColor(index)}>
        &times;
      </button>
      <button type="button" onClick={handleEdit}>
        &#x2713;
      </button>
    </li>
  );
};

export default ColorElement;