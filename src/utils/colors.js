export const getOpacities = (minOpacity, maxOpacity, opacitySteps) => {
  const opacities = [];
  const increment = (maxOpacity - minOpacity) / (opacitySteps - 1);
  for (let i = 0; i < opacitySteps; i++) {
    opacities.push((Number(minOpacity) + Number(i*increment)).toFixed(2));
  }

  return opacities.reverse();
}

export const getShades = (c, h, lightestDark, darkestLight, colorSteps) => {
  const chroma = Number(c.toFixed(2));
  const hue = Number(h.toFixed(2));

  const shades = [];
  const increment = (darkestLight - lightestDark) / colorSteps;

  for( let i = 0; i < colorSteps; i++) {
    shades.push([(lightestDark+Number(i*increment)).toFixed(2), chroma, hue]);
  }
  return shades;
}