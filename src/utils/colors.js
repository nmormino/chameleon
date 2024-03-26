import chroma from "chroma-js";

export const getOpacities = (color) => {
  const opacities = [];
  const increment = (color.maxOpacity - color.minOpacity) / (color.opacitySteps - 1);
  for (let i = 0; i < color.opacitySteps; i++) {
    opacities.push((Number(color.minOpacity) + Number(i*increment)).toFixed(2));
  }

  return opacities.reverse();
}

export function getShades(color){

  const chromaColor = chroma(color.hex);
  const lightest = chromaColor.luminance(color.lightest).hex();
  const darkest = chromaColor.luminance(color.darkest).hex();
  const colors = [lightest, darkest];
  const domain = [100, 0];

  if(color.domain === 100) {
    colors[0] = color.hex;
  } else if(color.domain === 0) {
    colors[1] = color.hex;
  } else {
    colors.splice(1, 0, color.hex);
    domain.splice(1, 0, color.domain);
  }

  const scaled = chroma.scale(colors).domain(domain).classes(color.valueSteps).colors(color.valueSteps);

  return scaled;
}

export function getTextColor(hexcolor) {
  // If a leading # is provided, remove it
	if (hexcolor.slice(0, 1) === '#') {
		hexcolor = hexcolor.slice(1);
	}

	// If a three-character hexcode, make six-character
	if (hexcolor.length === 3) {
		hexcolor = hexcolor.split('').map(function (hex) {
			return hex + hex;
		}).join('');
	}

	// Convert to RGB value
	let r = parseInt(hexcolor.substr(0,2),16);
	let g = parseInt(hexcolor.substr(2,2),16);
	let b = parseInt(hexcolor.substr(4,2),16);

	// Get YIQ ratio
	let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

	// Check contrast
	return (yiq >= 128) ? 'black' : 'white';

}

export const getFormattedColor = (colorFunction, color, opacity) =>  {
  if(colorFunction === 'hex') {
    return chroma(color).alpha(Number(opacity)).hex()
  }
  return chroma(color).alpha(Number(opacity)).css(colorFunction);
};

export const w3cx11 = {
  "aquamarine": "#7fffd4",
  "beige": "#f5f5dc",
  "blanchedalmond": "#ffebcd",
  "blue": "#0000ff",
  "blueviolet": "#8a2be2",
  "brown": "#a52a2a",
  "burlywood": "#deb887",
  "cadetblue": "#5f9ea0",
  "chartreuse": "#7fff00",
  "chocolate": "#d2691e",
  "coral": "#ff7f50",
  "cornflowerblue": "#6495ed",
  "cyan": "#00ffff",
  "dimgray": "#696969",
  "dodgerblue": "#1e90ff",
  "firebrick": "#b22222",
  "forestgreen": "#228b22",
  "gold": "#ffd700",
  "goldenrod": "#daa520",
  "green": "#00ff00",
  "greenyellow": "#adff2f",
  "hotpink": "#ff69b4",
  "khaki": "#f0e68c",
  "lawngreen": "#7cfc00",
  "limegreen": "#32cd32",
  "magenta": "#ff00ff",
  "maroon": "#b03060",
  "midnightblue": "#191970",
  "moccasin": "#ffe4b5",
  "navyblue": "#000080",
  "orange": "#ffa500",
  "orangered": "#ff4500",
  "orchid": "#da70d6",
  "pale": "#db7093",
  "palegoldenrod": "#eee8aa",
  "palegreen": "#98fb98",
  "paleturquoise": "#afeeee",
  "palevioletred": "#db7093",
  "pink": "#ffc0cb",
  "plum": "#dda0dd",
  "purple": "#a020f0",
  "red": "#ff0000",
  "rosybrown": "#bc8f8f",
  "royalblue": "#4169e1",
  "saddlebrown": "#8b4513",
  "salmon": "#fa8072",
  "sandybrown": "#f4a460",
  "sienna": "#a0522d",
  "skyblue": "#87ceeb",
  "slateblue": "#6a5acd",
  "slategray": "#708090",
  "springgreen": "#00ff7f",
  "steelblue": "#4682b4",
  "tan": "#d2b48c",
  "thistle": "#d8bfd8",
  "tomato": "#ff6347",
  "turquoise": "#40e0d0",
  "violet": "#ee82ee",
  "violetred": "#d02090",
  "wheat": "#f5deb3",
  "yellow": "#ffff00",
  "yellowgreen": "#9acd32"
}