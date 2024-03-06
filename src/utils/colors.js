export const getShades = (hue, chroma , lightestDark, darkestLight, colorSteps) => {
  if (isNaN(hue)) hue = 0;
  if (isNaN(chroma)) chroma = 0;

  const shades = [];
  const increment = (darkestLight - lightestDark) / colorSteps;

  for( let i = 0; i < colorSteps; i++) {
    shades.push([Number(lightestDark)+Number(i*increment), chroma, hue]);
  }
  return shades;
}