import chroma from "chroma-js";
import { getShades, getOpacities } from "../../utils/colors";

import * as s from "./styles.module.css";

const ColorExample = ({
  name,
  color,
  colorSteps,
  useOpacity,
  opacitySteps,
  minOpacity,
  maxOpacity
}) => {

  const chromaColor = chroma(color);
  const colors = getShades(
    chromaColor.oklch()[0],
    chromaColor.oklch()[1],
    chromaColor.oklch()[2],
    colorSteps
  );

  const opacities = useOpacity ? getOpacities(minOpacity, maxOpacity, opacitySteps) : [1];

  return (
    <div className={s.colors}>
      {opacities.map(opacity => (
        <div className={s.colorPanel} key={opacity}>
          {colors.map((color, i) => (
            <div 
              key={JSON.stringify([...color, opacity, i])}
              className={s.colorSpot}
              title={`oklch(${color.join(' ')})`}
              style={{
                backgroundColor: 'oklch('+color.join(' ')+' / '+opacity+')',
                color: color[0] > .50 ? 'black' : 'white',
              }}
            >
              oklch({color.join(' ')} / {opacity})<br/>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
};

export default ColorExample;