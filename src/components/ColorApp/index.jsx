import { useStore } from '@nanostores/react';
import { colorFunction, addColor, colorPalette, exportColors, handleFileUpload, clearColorPalette } from '../../stores/colorStore';
import { Plus, Download, Upload } from 'react-feather';

import ColorInput from '../ColorInput';
import * as s from './ColorApp.module.css';

export default function ColorApp() {

  const $colorPalette = useStore(colorPalette);
  const $colorFunction = useStore(colorFunction);
  const colorFunctions = ['rgb', 'hex', 'hsl'];

  return (
    <main className={`${s.main}`}>
      <nav className={s.nav}>
        <h1 className="flexGrow">
          <img src="/chameleon/favicon.svg" alt="Chameleon" width="32" height="32" />
          Chameleon
        </h1>
        <div className="flexGrow"></div>
        <button type="button" className="button" onClick={exportColors}>
          Export <Download size={16} />
        </button>
        <button type="button" className="button" onClick={handleFileUpload}>
          Import <Upload size={16} />
        </button>
        <button type="button" className="button" onClick={clearColorPalette}>
          Clear
        </button>
        <select name="colorFunction" defaultValue={$colorFunction} onChange={(e) => colorFunction.set(e.target.value)}>
          {colorFunctions.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </nav>
      {Object.values($colorPalette).map(color => (
        <ColorInput key={color.id} index={color.id} />
      ))}
      <button type="button" className={s.addButton} onClick={addColor}>
        <Plus size={64}/>
      </button>
    </main>
  )
}


