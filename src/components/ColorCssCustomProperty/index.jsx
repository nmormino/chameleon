import { Fragment } from "react";
import chroma from "chroma-js";

import { getShades, getOpacities, getFormattedColor } from "../../utils/colors";
import * as s from "./styles.module.css";

const ColorCssCustomProperty = ({
  name,
  color,
  colorFunction,
  colorSteps,
  useOpacity,
  opacitySteps,
  minOpacity,
  maxOpacity
}) => {
  const cssName = name.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/).join('-').toLowerCase();
  const colors = getShades(color, colorSteps);
  // remove the first color, which is the color picked.

  const opacities = useOpacity ? getOpacities(minOpacity, maxOpacity, opacitySteps) : [1];

  return (
    <>
      {opacities.map((opacity, o) => (
        <pre className={s.cssCustomProperty} key={opacity}>
          {colors.map((color, i) => (
            <Fragment key={color.name+color+opacity}>
              --color-{cssName}-{i+1}{useOpacity?`-o${o+1}`:''}: {getFormattedColor(colorFunction, color, opacity)};<br/>
            </Fragment>
          ))}
        </pre>
      ))}
    </>
  )
};

export default ColorCssCustomProperty;
