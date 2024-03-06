import chroma from "chroma-js";
import { getShades } from "../../utils/colors";

import * as s from "./styles.module.css";

const ColorExample = ({name, color, lightestDark, darkestLight, colorSteps}) => {

  const chromaColor = chroma(color);

  return (
    <div className={s.colorPanel}>
      {getShades(
        chromaColor.oklch()[2], 
        chromaColor.oklch()[1], 
        lightestDark, 
        darkestLight, 
        colorSteps
      ).map(hue => (
        <div 
          title={`oklch(${hue[0].toFixed(2)} ${hue[1].toFixed(2)} ${hue[2].toFixed(2)})`}
          className={s.colorSpot} 
          style={{
            backgroundColor: `oklch(${hue[0].toFixed(2)} ${hue[1].toFixed(2)} ${hue[2].toFixed(2)})`,
            color: chroma.contrast(chroma(hue[0], hue[1], hue[2], 'oklch').hex(), 'white') < 4.5 ? 'black' : 'white'
          }}
        >
          {name}
        </div>
      ))}
    </div>
  )
};

export default ColorExample;