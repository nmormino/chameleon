import chroma from "chroma-js";
import { getShades, getOpacities, getTextColor } from "../../utils/colors";

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
  const colors = getShades(color, colorSteps);

  const opacities = useOpacity ? getOpacities(minOpacity, maxOpacity, opacitySteps) : [1];

  return (
    <div className={s.colors}>
      {opacities.map(opacity => (
        <div className={s.colorPanel} key={opacity}>
          {colors.map((color, i) => (
            <div 
              key={JSON.stringify([...color, opacity, i])}
              className={s.colorSpot}
              title={`color`}
              
              style={{
                backgroundColor: chroma(color).alpha(Number(opacity)).css(),
                color: getTextColor(color),
              }}
            >
              {chroma(color).alpha(Number(opacity)).hex()}<br/>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
};

export default ColorExample;