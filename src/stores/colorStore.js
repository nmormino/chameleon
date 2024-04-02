import {w3cx11} from '../utils/colors';
import { atom, map } from 'nanostores';
import { getShades, getOpacities, getFormattedColor } from '../utils/colors';

export const getNewColor = () => {
  const colorArray = Object.keys(w3cx11);
  const name = colorArray[Math.floor(Math.random() * colorArray.length)];
  const hex = w3cx11[name];

  return {
    id: crypto.randomUUID(),
    hex,
    name,
    domain: 50,
    saturation: 0,
    valueSteps: 11,
    lightest: 0.95,
    darkest: 0.05,
    opacitySteps: 1,
    minOpacity: 0.1,
  }
}

// Our store for the color function
export const colorFunction = atom('hex');

/**
 * @typedef {Object} color
 * @property {string} hex
 * @property {string} name
 * @property {number} valueSteps
 * @property {number} lightest
 * @property {number} darkest
 * @property {number} opacitySteps
 * @property {number} minOpacity
 * @property {number} maxOpacity
 */

/** @type {import('nanostores').MapStore<Record<string, color>>} */
export const colorPalette = map({});

colorPalette.listen((profile, oldProfile, changed) => {
  localStorage.setItem('colorPalette', JSON.stringify(colorPalette.get()))
})

export function clearColorPalette() {
  colorPalette.set({});
}

export function addColor() {
  // increment our ID
  const newColor = getNewColor();
  colorPalette.setKey(newColor.id, newColor);
}

function initializeColors() {
  const colors = localStorage.getItem('colorPalette');
  if (colors) {
    try {
      const parsedColors = JSON.parse(colors);
      Object.keys(parsedColors).forEach((key) => {
        parsedColors[key].domain = Number(parsedColors[key].domain);
        parsedColors[key].valueSteps = Number(parsedColors[key].valueSteps);
        parsedColors[key].lightest = parseFloat(parsedColors[key].lightest);
        parsedColors[key].darkest = parseFloat(parsedColors[key].darkest);
        parsedColors[key].opacitySteps = Number(parsedColors[key].opacitySteps);
        parsedColors[key].minOpacity = parseFloat(parsedColors[key].minOpacity);
      });
      colorPalette.set(parsedColors);
    } catch (e) {
      console.log('Failed local storage restoration');
      addColor(getNewColor());
    }
  } else {
    addColor(getNewColor());
  }
}
initializeColors();


export function editColor(colorId, newColor) {
  colorPalette.setKey(colorId, { ...newColor});
}

export function removeColor(colorId) {
  colorPalette.setKey(colorId, undefined);
}

export function importColors(json) {
  clearColorPalette();
  
  console.log('Importing colors', json, colorPalette.get());
  const {chameleon: { colors }} = json;

  Object.keys(colors).forEach((key) => {
    colorPalette.setKey(key, colors[key]);
  });
}

export function exportColors() {
  const colors = {chameleon: {colors: colorPalette.get()}};
  const json = JSON.stringify(colors, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'chameleon.colors.json';
  a.click();
  URL.revokeObjectURL(url);
}

export function exportDesignSystemTokens() {
  const colors = colorPalette.get();
  const designSystem = {
    colors: Object.keys(colors).map((key) => {
      const color = colors[key];
      const shades = getShades(color);
      const opacities = getOpacities(color);
      const colorName = color.name.replace(' ', '-').toLowerCase();
      return {
        [colorName]: shades.map((shade, i) => {
          return opacities.map((opacity, j) => {
            if(j === 0) {
              return {[`${colorName}-${i+1}`]:{
                type: 'color',
                value: getFormattedColor(colorFunction.get(), shade, opacity),
              }};
            }
            return {[`${colorName}-${i+1}-opacity-${j}`]:{
              type: 'color',
              value: getFormattedColor(colorFunction.get(), shade, opacity),
            }};
          });
        }),
      };
    }),
  };
  const json = JSON.stringify(designSystem, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'chameleon.colors.json';
  a.click();
  URL.revokeObjectURL(url);
}

export function exportCss() {
  const colors = colorPalette.get();
  const css = Object.keys(colors).map((key) => {
    const color = colors[key];
    const shades = getShades(color);
    const opacities = getOpacities(color);
    const colorName = color.name.replace(' ', '-').toLowerCase();
    const css = shades.map((shade, i) => {
      return opacities.map((opacity, j) => {
        if(j === 0) {
          return `--color-${colorName}-${i+1}: ${getFormattedColor(colorFunction.get(), shade, opacity)};`; 
        }
        return `--color-${colorName}-${i+1}-opacity-${j}: ${getFormattedColor(colorFunction.get(), shade, opacity)};`;
      }).join('\n');
    }).join('\n');
    return `${css}`;
  }).join('\n');
  const blob = new Blob([css], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'chameleon.colors.css';
  a.click();
  URL.revokeObjectURL(url);
}

export function handleFileUpload() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const json = e.target.result;
      try {
        const parsedJson = JSON.parse(json);
        importColors(parsedJson);
      } catch (error) {
        console.error('Invalid JSON file');
        alert('Invalid JSON file');
      }
      // Remove the file input
      input.remove();
    };
    reader.readAsText(file);
  });
  input.click();
}