import { useState } from 'react';
import { useStore } from '@nanostores/react';

import * as s from './ColorInput.module.css';
import Accordion from "../Accordion";

import { getShades, getOpacities, getTextColor, getFormattedColor } from "../../utils/colors";
import { colorPalette, colorFunction, removeColor } from '../../stores/colorStore';

const ColorInput = ({ index }) => {

  const [showRemove, setShowRemove] = useState(false);
  const $colorFunction = useStore(colorFunction);
  const $colorPalette = useStore(colorPalette);
  const color = $colorPalette[index];

  const colors = getShades(color);
  const opacities = color.opacitySteps > 1 ? getOpacities(color) : [color.maxOpacity];

  const saveColor = (edit) => {
    colorPalette.setKey(index, {...color, ...edit});
  }
  return (
    <Accordion 
      className={s.colorInput} 
      label={(
        <div className={s.label}>
          <div className={s.setting}>
            <label htmlFor="swatchCount">Color</label>
            <input 
              className={s.settingInput}
              type="color"
              defaultValue={color.hex}
              onBlur={(e) => saveColor({hex: e.target.value})}
            />
          </div>
          <div className={s.setting}>
            <label htmlFor="swatchCount">Name</label>
            <input
              className={s.settingInput}
              placeholder="Color name"
              type="text"
              defaultValue={color.name}
              onBlur={(e) => saveColor({hex: e.target.value})}
            />
          </div>
          <div className={s.setting}>
            <label htmlFor="swatchCount">Lightest</label>
            <input
              className={s.settingInput}
              id="swatchCount"
              type="number"
              min={.5}
              max={1}
              step={.01}
              defaultValue={color.lightest}
              onChange={(e) => saveColor({lightest: Number(e.target.value)})}
            />
          </div>
          <div className={s.setting}>
            <label htmlFor="swatchCount">Darkest</label>
            <input
              className={s.settingInput}
              id="swatchCount"
              type="number"
              min={.01}
              max={.5}
              step={.01}
              defaultValue={color.darkest}
              onChange={(e) => saveColor({darkest: Number(e.target.value)})}
            />
          </div>
          <div className={s.setting}>
            <label htmlFor="swatchCount">Value steps</label>
            <input
              className={s.settingInput}
              id="swatchCount"
              type="number"
              min="3"
              max="24"
              defaultValue={color.valueSteps}
              onChange={(e) => saveColor({valueSteps: Number(e.target.value)})}
            />
          </div>
          <div className={s.setting}>
            <label htmlFor="opacitySteps">Opacity steps</label>
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
          {color.opacitySteps > 1 && (
            <>
              <div className={s.setting}>
                <label htmlFor="minOpacity">Min opacity</label>
                <input
                  className={s.settingInput}
                  id="minOpacity"
                  type="number"
                  min="0.01"
                  max=".25"
                  step=".01"
                  defaultValue={color.minOpacity}
                  onChange={(e) => saveColor({minOpacity: Number(e.target.value)})}
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
                  defaultValue={color.maxOpacity}
                  onChange={(e) => saveColor({maxOpacity: Number(e.target.value)})}
                />
              </div>
            </>
          )}
          
          {Object.keys($colorPalette).length > 1 && (
            <>
              {!showRemove && (
                <div className={s.setting}>
                  <label htmlFor="swatchCount">&nbsp;</label>
                  <button className="circle" type="button" onClick={() => setShowRemove(true)}>
                    &times;
                  </button>
                </div>
              )}
              {showRemove && (<>
                <div className={s.setting}>
                  <label htmlFor="swatchCount">&nbsp;</label>
                  <button  type="button" onClick={() =>{removeColor(index); setShowRemove(false);}}>
                    Remove
                  </button>
                </div>
                <div className={s.setting}>
                  <label htmlFor="swatchCount">&nbsp;</label>
                  <button type="button" onClick={() => setShowRemove(false)}>
                    Cancel
                  </button>
                </div>
              </>)}
            </>
          )}
        </div>
      )}
    >
      <div className={s.colorExamples}>
        <div className={s.colors}>
          {opacities.map(opacity => (
            <div className={s.colorPanel} key={opacity}>
              {colors.map((color, i) => (
                <div 
                  key={JSON.stringify([...color, opacity, i])}
                  className={s.colorSpot}
                  title={`color`}
                  style={{
                    backgroundColor: getFormattedColor($colorFunction, color, opacity),
                    color: getTextColor(color),
                  }}
                >
                  {getFormattedColor($colorFunction, color, opacity)}<br/>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Accordion>
  );
}

export default ColorInput;