import chroma from "chroma-js";
import { getShades, getOpacities, getTextColor, getFormattedColor } from "../../utils/colors";

import * as s from "./styles.module.css";

const ColorExample = ({
  color,
  colorFunction,
  colorSteps,
  useOpacity,
  opacitySteps,
  minOpacity,
  maxOpacity
}) => {

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
                backgroundColor: getFormattedColor(colorFunction, color, opacity),
                color: getTextColor(getFormattedColor(colorFunction, color, opacity)),
              }}
            >
              {getFormattedColor(colorFunction, color, opacity)}<br/>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
};

export default ColorExample;