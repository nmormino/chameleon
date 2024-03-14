import chroma from "chroma-js";

export const getOpacities = (minOpacity, maxOpacity, opacitySteps) => {
  const opacities = [];
  const increment = (maxOpacity - minOpacity) / (opacitySteps - 1);
  for (let i = 0; i < opacitySteps; i++) {
    opacities.push((Number(minOpacity) + Number(i*increment)).toFixed(2));
  }

  return opacities.reverse();
}

export const getShades = (l, c, h, colorSteps) => {
  const lightness = !isNaN(l) ? l.toFixed(2) : 0;
  const chroma = !isNaN(c) ? c.toFixed(2) : 0;
  const hue = !isNaN(h) ? h.toFixed(2) : 0;

  const lightestDark = .1;
  const shades = [[lightness, chroma, hue]];

  shades.push([lightestDark, chroma, hue]);
  const increment = 1.2 / colorSteps;

  let currentChroma = chroma;
  let currentLightness = lightestDark;

  for( let i = 0; i < colorSteps-1; i++) {
    currentLightness += increment;

    if(currentLightness > 0.99) {
      const lightnessDiff = currentLightness - .99;
      // reset current lightness to .99
      currentLightness = .99;
      currentChroma = Math.max(currentChroma - lightnessDiff, Math.min(.05, c));
    }
    shades.push([currentLightness.toFixed(2), Number(currentChroma).toFixed(2), hue]);
  }

  console.log('shades', shades);
  return shades;
}

export const getDesignSystemTokens = (colors, lightestDark, darkestLight, colorSteps, useOpacity, opacitySteps, minOpacity, maxOpacity) => {
  const designSystemTokens = {};
  
  for (const [name, color] of Object.entries(colors)) {
    const chromaColor = chroma(color);
    const cssName = name.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/).join('-').toLowerCase();
    const shades = getShades(
      chromaColor.oklch()[1], 
      chromaColor.oklch()[2], 
      lightestDark, 
      darkestLight, 
      colorSteps
    )

    const opacities = useOpacity ? getOpacities(minOpacity, maxOpacity, opacitySteps) : [1];
    
    designSystemTokens[cssName] = {};
    opacities.forEach((opacity, o) => (
      shades.forEach((color, i) => {
        designSystemTokens[cssName][`${i+1}${useOpacity?`-o${o+1}`:''}`] = `oklch(${color.join(' ')} / ${parseFloat(opacity)})`;
      })
    ))
  }

  return designSystemTokens;
}
