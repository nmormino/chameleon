import { useRef } from 'react';

import ColorElement from '../ColorElement';
import ColorExample from '../ColorExample';
import ColorCssCustomProperty from '../ColorCssCustomProperty';
import useLocalStorage from '../../hooks/useLocalStorage';

import * as s from './ColorApp.module.css';
import { colorForm } from "../ColorElement/ColorElement.module.css";
export default function ColorApp() {

  const [useOpacity, setUseOpacity] = useLocalStorage('useOpacity', true);
  const [colorSteps, setColorSteps] = useLocalStorage('colorSteps', 5);
  const [lightestDark, setLightestDark] = useLocalStorage('lightestDark', 0.01);
  const [darkestLight, setDarkestLight] = useLocalStorage('darkestLight', 1.1);
  const [opacitySteps, setOpacitySteps] = useLocalStorage('opacitySteps', 5);
  const [minOpacity, setMinOpacity] = useLocalStorage('minOpacity', .1);
  const [maxOpacity, setMaxOpacity] = useLocalStorage('maxOpacity', .9);


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

  const submitOnEnter = (e) => {
    e.key === 'Enter' && addColor();
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
            <label htmlFor="swatchCount">Color steps</label>
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
            <label htmlFor="lightestDark">Lightest dark</label>
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
            <label htmlFor="darkestLight">Darkest light</label>
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
          <div className={s.setting}>
            <label htmlFor="useOpacity">
              <input id="useOpacity" type="checkbox" checked={useOpacity} onChange={() => setUseOpacity(!useOpacity)}/>
              Use opacity
            </label>
          </div>
          

          {useOpacity && (
            <>
              <div className={s.setting}>
                <label htmlFor="opacitySteps">Opacity steps</label>
                <input
                  className={s.settingInput}
                  id="opacitySteps"
                  type="number"
                  min="3"
                  max="20"
                  step="1"
                  value={opacitySteps}
                  onChange={(e) => setOpacitySteps(Number(e.target.value))}
                />
              </div>
              <div className={s.setting}>
                <label htmlFor="minOpacity">Min opacity</label>
                <input
                  className={s.settingInput}
                  id="minOpacity"
                  type="number"
                  min="0.01"
                  max=".25"
                  step=".01"
                  value={minOpacity}
                  onChange={(e) => setMinOpacity(Number(e.target.value))}
                />
              </div>
              <div className={s.setting}>
                <label htmlFor="maxOpacity">Max opacity</label>
                <input
                  className={s.settingInput}
                  id="maxOpacity"
                  type="number"
                  min=".75"
                  max="1"
                  step=".01"
                  value={maxOpacity}
                  onChange={(e) => setMaxOpacity(Number(e.target.value))}
                />
              </div>
            </>
          )}

          <h3>Colors</h3>
          <div className={s.colorList}>
            <div className={colorForm}>
              <input type="color" ref={colorRef}/>
              <input placeholder="Color name" type="text" ref={nameRef} autoFocus={true} onKeyPress={submitOnEnter}/>
              <button type="button" onClick={addColor}>+</button>
            </div>
            <div>
              <div>
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
          </div>
        </div>
        <div className={`${s.colorExamples} panel checkerboardBackground`}>
          <h3>Swatches</h3>
          {colors.map((color) => (
            <ColorExample
              key={color.name+color.color}
              color={color.color}
              name={color.name}
              lightestDark={lightestDark}
              darkestLight={darkestLight}
              colorSteps={colorSteps}
              useOpacity={useOpacity}
              opacitySteps={opacitySteps}
              minOpacity={minOpacity}
              maxOpacity={maxOpacity}
            />
          ))}
          <h3>CSS Custom properties</h3>
          {colors.map((color) => (
            <ColorCssCustomProperty
              key={color.name+color.color}
              color={color.color}
              name={color.name}
              lightestDark={lightestDark}
              darkestLight={darkestLight}
              colorSteps={colorSteps}
              useOpacity={useOpacity}
              opacitySteps={opacitySteps}
              minOpacity={minOpacity}
              maxOpacity={maxOpacity}
            />
          ))}
        </div>
      </div>
    </main>
  )
}


