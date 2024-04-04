import { useStore } from '@nanostores/react';
import { colorFunction, addColor, colorPalette, exportColors, exportCss, handleFileUpload, clearColorPalette, exportDesignSystemTokens } from '../../stores/colorStore';
import { Plus, Download, Upload, Menu } from 'react-feather';

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
          <img src="/favicon.svg" alt="Chameleon" width="32" height="32" />
          Chameleon
        </h1>
        <div className="flexGrow"></div>
        <ul className={s.menu}>
          <li>
            <label htmlFor="menu">
              <Menu size={32}/>
            </label>
            <input type="checkbox" name="menu-toggle" id="menu"/>
            <ul>
            <li>
                <a onClick={exportColors}>
                  Export <Download size={16} />
                </a>
              </li>
              <li>
                <a onClick={exportCss}>
                  CSS <Download size={16} />
                </a>
              </li>
              <li>
                <a onClick={exportDesignSystemTokens}>
                  DST <Download size={16} />
                </a>
              </li>
              <li>
                <a className="button" onClick={handleFileUpload}>
                  Import <Upload size={16} />
                </a>
              </li>
              <li>
                <a className="button" onClick={clearColorPalette}>
                  Clear
                </a>
              </li>
            </ul>
          </li>
        </ul>
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


