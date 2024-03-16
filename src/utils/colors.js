import chroma from "chroma-js";

export const getOpacities = (minOpacity, maxOpacity, opacitySteps) => {
  const opacities = [];
  const increment = (maxOpacity - minOpacity) / (opacitySteps - 1);
  for (let i = 0; i < opacitySteps; i++) {
    opacities.push((Number(minOpacity) + Number(i*increment)).toFixed(2));
  }

  return opacities.reverse();
}

export function getShades(hexColor, steps){
  if (hexColor.toUpperCase() === '#FFFFFF' || hexColor.toUpperCase() === '#000000') {
    return chroma.scale([hexColor === '#ffffff' ? 'black' : 'white', hexColor]).mode('oklch').colors(steps);
  }

  let colors = [];
  let halfSteps = Math.floor(steps / 2);
  let scale1 = chroma.scale(['000000', hexColor]).mode('oklch').colors(halfSteps + 2);
  let scale2 = chroma.scale([hexColor, 'ffffff']).mode('oklch').colors(steps - halfSteps + 1);

  if (chroma(scale1[halfSteps + 1]).hex() === chroma(scale2[0]).hex()) {
      // The two scales have a color overlap at the original color point
      colors = [...scale1.slice(1, halfSteps + 2), ...scale2.slice(1, -1)];
  } else {
      // The two scales do not overlap. In this case, we collect colors from each side and ensures to include original color
      colors = [...scale1.slice(1, halfSteps + 1), hexColor, ...scale2.slice(1, -1)];
  }

  // Sort colors by luminance from darkest to lightest
  colors.sort((a, b) => chroma(b).luminance() - chroma(a).luminance());

  return colors;
}

export function getTextColor(backgroundColor) {
  const luminance = chroma(backgroundColor).luminance();

  // this value is the standard WCAG contrast ratio
  // luminance for black = 0, for white = 1
  if(luminance > 0.5) {
      // if the luminance of background color is greater than 0.5 (more towards white), 
      // we should use black color for the text
      return "black";
  } else {
      // if the luminance of background color is less than or equals to 0.5 (more towards black), 
      // we should use white color for the text
      return "white";
  }
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
