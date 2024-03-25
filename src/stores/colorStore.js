import {w3cx11} from '../utils/colors';
import { atom, map } from 'nanostores';

export const getNewColor = () => {
  const colorArray = Object.keys(w3cx11);
  const name = colorArray[Math.floor(Math.random() * colorArray.length)];
  return {
    id: crypto.randomUUID(),
    hex: w3cx11[name],
    name,
    valueSteps: 11,
    lightest: 0.95,
    darkest: 0.05,
    opacitySteps: 1,
    minOpacity: 0.1,
    maxOpacity: 1,
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

export function clearColorPalette() {
  colorPalette.set({});
}

export function addColor() {
  // increment our ID
  const newColor = getNewColor();
  colorPalette.setKey(newColor.id, newColor);
}

function initializeColors() {
  addColor(getNewColor());
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