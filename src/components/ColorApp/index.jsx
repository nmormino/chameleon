import { useRef } from 'react';

import ColorElement from '../ColorElement';
import ColorExample from '../ColorExample';
import useLocalStorage from '../../hooks/useLocalStorage';

import * as s from './ColorApp.module.css';
import { colorForm } from "../ColorElement/ColorElement.module.css";
export default function ColorApp() {

  const [colorSteps, setColorSteps] = useLocalStorage('colorSteps', 5);
  const [lightestDark, setLightestDark] = useLocalStorage('lightestDark', 0.01);
  const [darkestLight, setDarkestLight] = useLocalStorage('darkestLight', 1.1);
  const [colors, setColors] = useLocalStorage('colors', []);

  const colorRef = useRef(null);
  const nameRef = useRef(null);

  const addColor = () => {
    if(!colorRef.current || !nameRef.current) return;

    const color = colorRef.current.value;
    const name = nameRef.current.value;

    setColors([{name, color}, ...colors ]);

    colorRef.current.value = '';
    nameRef.current.value = '';
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

  return (
    <main className={s.colorApp}>
      <div className={s.appBody}>
        <div className={`${s.column} panel`}>
          <header>
            <h1>Welcome to Chameleon</h1>
          </header>
          <h3>Settings</h3>
          <div className={s.setting}>
            <label htmlFor="swatchCount">Steps</label>
            <input
              className={s.settingInput}
              id="swatchCount"
              type="number"
              min="3"
              max="64"
              value={colorSteps}
              onChange={(e) => setColorSteps(Number(e.target.value))}
            />
          </div>
          <div className={s.setting}>
            <label htmlFor="lightestDark">Lightest Dark</label>
            <input
              className={s.settingInput}
              id="lightestDark"
              type="number"
              min="0.01"
              max="0.45"
              step="0.01"
              value={lightestDark}
              onChange={(e) => setLightestDark(Number(e.target.value))}
            />
          </div>
          <div className={s.setting}>
            <label htmlFor="darkestLight">Darkest Light</label>
            <input
              className={s.settingInput}
              id="darkestLight"
              type="number"
              min="0.65"
              max="1.15"
              step="0.01"
              value={darkestLight}
              onChange={(e) => setDarkestLight(Number(e.target.value))}
            />
          </div>
          <h3>Colors</h3>
          <div className={s.colorList}>
            <div className={colorForm}>
              <input placeholder="Color name" type="text" ref={nameRef} autoFocus={true}/>
              <input type="color" ref={colorRef}/>
              <button type="button" onClick={addColor}>+</button>
            </div>
            {colors.map((color, i) => (
              <ColorElement
                key={color.name+color.color}
                color={color.color}
                name={color.name}
                index={i}
                removeColor={removeColor}
                editColor={editColor}
              />
            ))}
          </div>
        </div>
        <div className={`${s.colorExamples} panel`}>
          {colors.map((color, i) => (
            <ColorExample
              key={color.name+color.color}
              color={color.color}
              name={color.name}
              lightestDark={lightestDark}
              darkestLight={darkestLight}
              colorSteps={colorSteps}
            />
          ))}
        </div>
      </div>
    </main>
  )
}


