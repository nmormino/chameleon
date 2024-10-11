import { useStore } from '@nanostores/react';
import { colorFunction, addColor, colorPalette } from '../../stores/colorStore';
import { Plus } from 'react-feather';

import ColorInput from '../ColorInput';
import * as s from './ColorApp.module.css';

export default function ColorApp() {

  const $colorPalette = useStore(colorPalette);
  const $colorFunction = useStore(colorFunction);
  const colorFunctions = ['rgb', 'hex', 'hsl'];
  
  return (
    <main className={s.main}>
      <div className={s.setting}>
        <label>Color function</label>
        <select name="colorFunction" defaultValue={$colorFunction} onChange={(e) => colorFunction.set(e.target.value)}>
          {colorFunctions.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
      {Object.values($colorPalette).map(color => (
        <ColorInput key={color.id} index={color.id} />
      ))}
      <button type="button" className={s.addButton} onClick={addColor}>
        <Plus size={64}/>
      </button>
    </main>
  )
}


