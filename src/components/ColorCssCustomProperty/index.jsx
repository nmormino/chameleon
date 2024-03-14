import { Fragment } from "react";
import chroma from "chroma-js";

import { getShades, getOpacities } from "../../utils/colors";
import * as s from "./styles.module.css";

const ColorCssCustomProperty = ({
  name,
  color,
  colorSteps,
  useOpacity,
  opacitySteps,
  minOpacity,
  maxOpacity
}) => {
  const cssName = name.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/).join('-').toLowerCase();
  const chromaColor = chroma(color);
  const colors = getShades(
    chromaColor.oklch()[0],
    chromaColor.oklch()[1],
    chromaColor.oklch()[2],
    colorSteps
  );
  // remove the first color, which is the color picked.
  colors.shift();

  const opacities = useOpacity ? getOpacities(minOpacity, maxOpacity, opacitySteps) : [1];
  
  return (
    <>
      {opacities.map((opacity, o) => (
        <pre className={s.cssCustomProperty} key={opacity}>
          /* {name} {useOpacity ? `opacity step ${o+1}` : '' } */<br/>
          --color-{cssName}{useOpacity?`-o${o+1}`:''}: oklch({chromaColor.oklch().map((v) => v.toFixed(2)).join(' ')} / {parseFloat(opacity)});<br/>
          {colors.map((color, i) => (
            <Fragment key={color.name+color.join('')+opacity}>
              --color-{cssName}-{i+1}{useOpacity?`-o${o+1}`:''}: oklch({color.join(' ')} / {parseFloat(opacity)});<br/>
            </Fragment>
          ))}
        </pre>
      ))}
    </>
  )
};

export default ColorCssCustomProperty;
