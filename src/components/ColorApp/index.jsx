import { useStore } from '@nanostores/react';
import { colorFunction, addColor, colorPalette, exportColors, handleFileUpload, clearColorPalette } from '../../stores/colorStore';

import ColorInput from '../ColorInput';
import * as s from './ColorApp.module.css';

export default function ColorApp() {

  const $colorPalette = useStore(colorPalette);
  const $colorFunction = useStore(colorFunction);
  const colorFunctions = ['rgb', 'hex', 'hsl'];

  return (
    <main className={`${s.colorExamples} panel checkerboardBackground`}>
      <div className={s.colorForm}>
        <h1>
          <img src="/chameleon/favicon.svg" alt="Chameleon" width="32" height="32" />
          Chameleon
        </h1>
        <div className="flexGrow" />
        <button type="button" className="button" onClick={exportColors}>
          Export ↓
        </button>
        <button type="button" className="button" onClick={handleFileUpload}>
          Import ↑
        </button>
        <button type="button" className="button" onClick={clearColorPalette}>
          Clear
        </button>
        <select name="colorFunction" defaultValue={$colorFunction} onChange={(e) => colorFunction.set(e.target.value)}>
          {colorFunctions.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
      {Object.values($colorPalette).map(color => (
        <ColorInput key={color.id} index={color.id} />
      ))}
      <div>
        <button type="button" className="button" onClick={addColor}>Add color</button>
      </div>
    </main>
  )
}


