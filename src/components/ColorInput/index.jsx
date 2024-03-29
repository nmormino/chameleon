import { useState, useRef, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import * as s from './ColorInput.module.css';
import Accordion from "../Accordion";

import { getShades, getOpacities, getTextColor, getFormattedColor } from "../../utils/colors";
import { colorPalette, colorFunction, removeColor } from '../../stores/colorStore';

const ColorInput = ({ index }) => {

  const swatchRef = useRef(null);
  const inputMeasure = useRef(null);
  const nameInput = useRef(null);
  const [showRemove, setShowRemove] = useState(false);
  const $colorFunction = useStore(colorFunction);
  const $colorPalette = useStore(colorPalette);
  const color = $colorPalette[index];

  const colors = getShades(color);
  const opacities = color.opacitySteps > 1 ? getOpacities(color) : [1];

  const saveColor = (edit) => {
    colorPalette.setKey(index, {...color, ...edit});
  }
  const increment = 100 / (color.valueSteps - 1)
  const domainSteps = [];
  for (let i = 50; i >= 0; i -= increment) {
    domainSteps.push(i);
  }
  domainSteps.reverse();
  for (let i = 50 + increment; i <= 100; i += increment) {
    domainSteps.push(i);
  }
  const swatchClick = (e, color, text) => {
    e.preventDefault();
    swatchRef.current.style.backgroundColor = text;
    swatchRef.current.style.color = getTextColor(color);
    swatchRef.current.innerText = text;
  }

  useEffect(() => {
    const size = inputMeasure.current?.getBoundingClientRect();
    nameInput.current.style.width = `${size.width}px`;
  }, [color]);
  return (
    <Accordion 
      className={s.colorInput} 
      style={{backgroundImage: `linear-gradient(${color.hex} 0%, var(--color-bg) 100%)`, color: getTextColor(color.hex)}}
      label={(
        <>
          <pre ref={inputMeasure} className={s.inputMeasure}>{color.name}</pre>
          <input
            ref={nameInput}
            className={s.input}
            placeholder="Color name"
            type="text"
            defaultValue={color.name}
            onChange={(e) => saveColor({name: e.target.value})}
          />
        </>
      )}
  >
      <div className={s.controls}>
        <div className={s.setting}>
          <label htmlFor="colorSwatch">{getFormattedColor($colorFunction, color.hex, 1)}</label>
          <input 
            id="colorSwatch"
            className={s.settingInput}
            type="color"
            defaultValue={color.hex}
            onBlur={(e) => saveColor({hex: e.target.value})}
          />
        </div>
        <div className={s.setting}>
          <label htmlFor="domain">Placement</label>
          <select id="domain" value={color.domain} onChange={(e) => {
            let value = Number(e.target.value);
            if (value === 0) {
              value = 3;
            }
            saveColor({domain: Number(e.target.value)})
          }}>
            {domainSteps.map((v, i) => {
              return <option key={v+i} value={v}>{i+1}</option>
            })}
          </select>
        </div>
        <div className={s.setting}>
          <label htmlFor="saturation">Saturate</label>
          <input type="number" id="saturation" min="-3" max="3" step=".1" defaultValue={color.saturation} onChange={(e) => saveColor({saturation: Number(e.target.value)})}/>
        </div>
        <div className={s.setting}>
          <label htmlFor="darkness">Darkness</label>
          <input
            className={s.settingInput}
            id="darkness"
            type="number"
            min={.01}
            max={.5}
            step={.01}
            defaultValue={color.darkest}
            onChange={(e) => saveColor({darkest: Number(e.target.value)})}
          />
        </div>
        <div className={s.setting}>
          <label htmlFor="lightness">Lightness</label>
          <input
            className={s.settingInput}
            id="lightness"
            type="number"
            min={.5}
            max={1}
            step={.01}
            defaultValue={color.lightest}
            onChange={(e) => saveColor({lightest: Number(e.target.value)})}
          />
        </div>
        <div className={s.setting}>
          <label htmlFor="values">Values</label>
          <input
            className={s.settingInput}
            id="values"
            type="number"
            min="3"
            max="25"
            step="2"
            defaultValue={color.valueSteps}
            onKeyDown={(e) => { // Arrow up and down to change value steps
              if(!['ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)) {
                e.preventDefault();
              }
            }}
            onChange={(e) => saveColor({valueSteps: Math.max(Number(e.target.value), 3), domain: 50})}
          />
        </div>
        <div className="flexGrow"></div>
        {color.opacitySteps > 1 && (
          <>
            <div className={s.setting}>
              <label htmlFor="minOpacity">Min opacity</label>
              <input
                className={s.settingInput}
                id="minOpacity"
                type="number"
                min="0.01"
                max=".99"
                step=".01"
                defaultValue={color.minOpacity}
                onChange={(e) => saveColor({minOpacity: Number(e.target.value)})}
              />
            </div>
          </>
        )}
        <div className={s.setting}>
          <label htmlFor="opacitySteps">Opacities</label>
          <input
            className={s.settingInput}
            id="opacitySteps"
            type="number"
            min="1"
            max="10"
            step="1"
            defaultValue={color.opacitySteps}
            onChange={(e) => saveColor({opacitySteps: Number(e.target.value)})}
          />
        </div>
        {Object.keys($colorPalette).length > 1 && (
          <>
            {!showRemove && (
              <div className={s.setting}>
                <label htmlFor="swatchCount">&nbsp;</label>
                <button type="button" onClick={() => setShowRemove(true)}>
                  Remove
                </button>
              </div>
            )}
            {showRemove && (<>
              <div className={s.setting}>
                <label htmlFor="swatchCount">&nbsp;</label>
                <button type="button" onClick={() => setShowRemove(false)}>
                  Cancel
                </button>
              </div>
              <div className={s.setting}>
                <label htmlFor="swatchCount">&nbsp;</label>
                <button  type="button" onClick={() =>{removeColor(index); setShowRemove(false);}}>
                  Confirm
                </button>
              </div>
            </>)}
          </>
        )}
      </div>
      <div className="flex">
        
        <div className={s.colorExamples}>
          {opacities.map(opacity => (
            <div className={s.colorPanel} key={`color-${opacity}`} id={`color-${opacity}`}>
              {colors.map((color, i) => (
                <a 
                  key={JSON.stringify([...color, opacity, i])}
                  className={s.colorSwatch}
                  title={`color`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  onFocus={(e) => swatchClick(e, color, getFormattedColor($colorFunction, color, opacity))}
                  onMouseOver={(e) => swatchClick(e, color, getFormattedColor($colorFunction, color, opacity))}
                  style={{
                    backgroundColor: getFormattedColor($colorFunction, color, opacity),
                    color: getTextColor(color),
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <div ref={swatchRef} className={s.swatchSpotlight}></div>
      </div>
    </Accordion>
  );
}

export default ColorInput;