import { useRef } from 'react';

import ColorElement from '../ColorElement';
import ColorExample from '../ColorExample';
import ColorInput from '../ColorInput';
import ColorCssCustomProperty from '../ColorCssCustomProperty';
import useQueryString from '../../hooks/useQueryString';

import * as s from './ColorApp.module.css';
import { colorForm } from "../ColorElement/ColorElement.module.css";

export default function ColorApp() {

  const colorFunctions = ['rgb', 'hex', 'hsl'];
  const [useOpacity, setUseOpacity] = useQueryString('useOpacity', true);
  const [colorSteps, setColorSteps] = useQueryString('colorSteps', 8);
  const [opacitySteps, setOpacitySteps] = useQueryString('opacitySteps', 5);
  const [minOpacity, setMinOpacity] = useQueryString('minOpacity', .1);
  const [maxOpacity, setMaxOpacity] = useQueryString('maxOpacity', 1);
  const [colorFunction, setColorFunction] = useQueryString('colorFunction', 'hex');

  const [colors, setColors] = useQueryString('colors', []);

  const colorRef = useRef('#ffffff');
  const nameRef = useRef(null);

  const addColor = () => {
    if(!colorRef.current || !nameRef.current) return;
    const color = colorRef.current.value;
    const name = nameRef.current.value;
    setColors([{name, color}, ...colors ]);

    colorRef.current.value = '#ffffff';
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
        <div className={`${s.colorExamples} panel checkerboardBackground`}>
          <div className={s.colorForm}>
            <h1>
              <img src="/chameleon/favicon.svg" alt="Chameleon" width="32" height="32" />
              Chameleon
            </h1>
            <div className="flexGrow"/>
            <div className={s.setting}>
              <label htmlFor="useOpacity" style={{paddingTop: '25px'}}>
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
            <div className={s.setting}>
              <label htmlFor="swatchCount">Color steps</label>
              <input
                className={s.settingInput}
                id="swatchCount"
                type="number"
                min="3"
                max="24"
                value={colorSteps}
                onChange={(e) => setColorSteps(Number(e.target.value))}
              />
            </div>
            <div className={s.setting}>
              <label htmlFor="colorFunction">Output</label>
              <select id="colorFunction" name="colorFunction" defaultValue={colorFunction} onChange={(e) => setColorFunction(e.target.value)}>
                {colorFunctions.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={s.setting}>
            <div className={s.settingGroup}>
              <input ref={colorRef} type="color" defaultValue="#ffffff" />
              <input style={{width: '150px'}} placeholder="Name" type="text" ref={nameRef} autoFocus={true} onKeyPress={submitOnEnter}/>
              <button type="button" onClick={addColor}>Add color</button>
            </div>
          </div>
          {colors.map((color, i) => (<ColorInput 
            key={color.name+color.color}
            color={color.color}
            name={color.name}
            index={i}
            removeColor={removeColor}
            colorFunction={colorFunction}
            editColor={editColor}
            colorSteps={colorSteps}
            useOpacity={useOpacity}
            opacitySteps={opacitySteps}
            minOpacity={minOpacity}
            maxOpacity={maxOpacity}
          />))}

          <h3>CSS Custom properties</h3>
          {colors.map((color) => (
            <ColorCssCustomProperty
              key={color.name+color.color}
              color={color.color}
              colorFunction={colorFunction}
              name={color.name}
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


