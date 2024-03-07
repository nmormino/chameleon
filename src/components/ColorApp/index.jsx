import { useRef } from 'react';

import ColorElement from '../ColorElement';
import ColorExample from '../ColorExample';
import useLocalStorage from '../../hooks/useLocalStorage';

import * as s from './ColorApp.module.css';

export default function ColorApp() {

  const [colorSteps, setColorSteps] = useLocalStorage('colorSteps', 5);
  const [lightestDark, setLightestDark] = useLocalStorage('lightestDark', 0.01);
  const [darkestLight, setDarkestLight] = useLocalStorage('darkestLight', 0.65);
  const [colors, setColors] = useLocalStorage('colors', []);

  const colorRef = useRef(null);
  const nameRef = useRef(null);

  const addColor = () => {
    if(!colorRef.current || !nameRef.current) return;

    const color = colorRef.current.value;
    const name = nameRef.current.value;
    setColors([...colors, {name, color} ]);
  }

  const removeColor = (index) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
  }

  const editColor = (index, color, name) => {
    const newColors = colors.map((c, i) => {
      if(i === index) {
        return {name, color};
      }
      return c;
    });
    setColors(newColors);
  }
  console.log('COLORS', colors);
  return (
    <main className={s.colorApp}>
      {!!(colors.length) && (
        <div className={s.configForm}>
          <div>
            <input type="color" ref={colorRef}/>
            <input type="text" ref={nameRef}/>
            <button type="button" onClick={addColor}>Add Color</button>
          </div>

          <div>
            <label htmlFor="swatchCount">Steps</label>
            <input
              id="swatchCount"
              type="number"
              min="3"
              max="64"
              value={colorSteps}
              onChange={(e) => setColorSteps(Number(e.target.value))}
            />
            <label htmlFor="lightestDark">Lightest Dark</label>
            <input
              id="lightestDark"
              type="number"
              min="0.01"
              max="0.45"
              step="0.01"
              value={lightestDark}
              onChange={(e) => setLightestDark(Number(e.target.value))}
            />
            <label htmlFor="darkestLight">Darkest Light</label>
            <input
              id="darkestLight"
              type="number"
              min="0.65"
              max="1.1"
              step="0.01"
              value={darkestLight}
              onChange={(e) => setDarkestLight(Number(e.target.value))}
            />
          </div>
        </div>
      )}
      {!!colors.length && (
        <div className={s.appBody}>
          <div>
            <h1>Colors</h1>
            <ul
              className={s.colorList}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const fromIndex = Number(e.dataTransfer.getData('text/plain'));
                const toIndex = colors.length - 1;
                const newColors = [...colors];
                const [removed] = newColors.splice(fromIndex, 1);
                newColors.splice(toIndex, 0, removed);
                setColors(newColors);
              }}
            >
              {colors.map((color, i) => (
                <ColorElement
                  key={i}
                  color={color.color}
                  name={color.name}
                  index={i}
                  removeColor={removeColor}
                  editColor={editColor}
                />
              ))}
            </ul>
          </div>
          <div className={s.colorExamples}>
            {colors.map((color, i) => (
              <ColorExample
                key={i}
                color={color.color}
                name={color.name}
                lightestDark={lightestDark}
                darkestLight={darkestLight}
                colorSteps={colorSteps}
              />
            ))}
          </div>
        </div>)
      }
    </main>
  )
}


