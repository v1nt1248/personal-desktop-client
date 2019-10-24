/* tslint:disable:no-bitwise */
const COLORS: Record<string, string> = {
  '0': '#ab47bc',
  '1': '#9c27b0',
  '2': '#8e24aa',
  '3': '#7b1fa2',
  '4': '#6a1b9a',
  '5': '#4a148c',
  '6': '#d500f9',
  '7': '#aa00ff',
  '8': '#673ab7',
  '9': '#5e35b1',
  '10': '#512da8',
  '11': '#4527a0',
  '12': '#311b92',
  '13': '#651fff',
  '14': '#6200ea',
  '15': '#3f51b5',
  '16': '#3949ab',
  '17': '#303f9f',
  '18': '#283593',
  '19': '#1a237e',
  '20': '#3d5afe',
  '21': '#304ffe',
  '22': '#1e88e5',
  '23': '#1976d2',
  '24': '#1565c0',
  '25': '#0d47a1',
  '26': '#2979ff',
  '27': '#2962ff',
  '28': '#01579b',
  '29': '#0091ea',
  '30': '#0097a7',
  '31': '#00838f',
  '32': '#006064',
  '33': '#009688',
  '34': '#00897b',
  '35': '#00796b',
  '36': '#00695c',
  '37': '#004d40',
  '38': '#43a047',
  '39': '#388e3c',
  '40': '#2e7d32',
  '41': '#1b5e20',
  '42': '#558b2f',
  '43': '#33691e',
  '44': '#f57f17',
  '45': '#ff6f00',
  '46': '#ef6c00',
  '47': '#e65100',
  '48': '#ff5722',
  '49': '#f4511e',
  '50': '#e64a19',
  '51': '#d84315',
  '52': '#bf360c',
  '53': '#ff3d00',
  '54': '#dd2c00',
  '55': '#8d6e63',
  '56': '#795548',
  '57': '#6d4c41',
  '58': '#5d4037',
  '59': '#4e342e',
  '60': '#607d8b',
  '61': '#546e7a',
  '62': '#455a64',
  '63': '#37474f',
  '?': '#a33333',
};

/**
 *  установка цвета на основании инициалов
 *  @param initials - строка (инициалы)
 *  @return (string) - цвет в HEX виде
 */
export function getElementColor(initials: string = '?'): string {
  const code = initials.length === 1
    ? initials.charCodeAt(0) % 64
    : (initials.charCodeAt(0) + initials.charCodeAt(1)) % 64;
  const codeStr = initials[0] === '?' ? '?' : code.toFixed();
  return COLORS[codeStr];
}

/**
 * функция инвертирования цвета
 * @param color {string} - цвет в HEX формате
 * @returns {string} - инвертированный цвет в HEX формате
 */
export function invertColor(color: string): string {
  if (color) {
    let tmpColor = color.substring(1);
    let tmpColorNum = parseInt(tmpColor, 16);
    tmpColorNum = 0xFFFFFF ^ tmpColorNum;
    tmpColor = tmpColorNum.toString(16);
    tmpColor = ('00000' + tmpColor).slice(-6);
    tmpColor = `#${tmpColor}`;
    return tmpColor;
  }
  return '#000000';
}

export function getColorValue(cssVar: string): string {
  return getComputedStyle(document.querySelector('#app') as HTMLElement)
    .getPropertyValue(`${cssVar}`).trim();
}

export function getColors(): Record<string, string> {
  const colors: Record<string, string> = {
    'main': '',
    'main-additional': '',
    'main-inverse': '',
    'main-inverse-select': '',
    'azure': '',
    'azure-low': '',
    'azure-mid': '',
    'azure-high': '',
    'azure-bg': '',
    'azure-select': '',
    'azure-shadow': '',
    'yellow': '',
    'green': '',
    'red': '',
    'red-highest': '',
    'grey-lowest': '',
    'grey-low': '',
    'grey-midlow': '',
    'grey-mid': '',
    'grey-high': '',
    'grey-highest': '',
    'main-inverse-shadow-01': '',
    'main-inverse-shadow-02': '',
    'button-primary-disabled': '',
    'button-secondary': '',
    'button-tertiary': '',
    'card-default': '',
    'icon-default': '',
    'cover': '',
  };
  Object.keys(colors)
    .forEach(color => colors[color] = getColorValue(`--${color}`));
  return colors;
}

/**
 * функция перевода значения в байтах в килобайты и т.п.
 * @param valueBytes {number}
 * @returns {string}
 */
export function fromByteTo(valueBytes: number): string {
  let result: string;
  let tmp: number;

  if (valueBytes !== null && typeof valueBytes === 'number') {
    switch (true) {
      case (valueBytes > (1024 * 1024 * 1024 - 1)):
        tmp = valueBytes / (1024 * 1024 * 1024);
        result = tmp.toFixed(1) + ' GB';
        break;
      case (valueBytes > (1024 * 1024 - 1)):
        tmp = valueBytes / (1024 * 1024);
        result = tmp.toFixed(1) + ' MB';
        break;
      case (valueBytes > 1023):
        tmp = Math.round(valueBytes / 1024);
        result = tmp + ' KB';
        break;
      default:
        result = valueBytes + ' B';
    }
  } else {
    result = 'unknown';
  }
  return result;
}

/**
 * функция изменения размера картинки
 * @param imageBase64 {string} - картинка в base64
 * @param targetSize {number} - целевой размер меньшей стороны картинки
 * @return {string} (base64)
 */
export function resizeImage(imageBase64: string, targetSize: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const tempImg = new Image();

    tempImg.onload = function() { //tslint:disable-line
      // Рассчитываем новые размеры изображения
      const tempImgSize = {
        width: tempImg.width,
        height: tempImg.height,
      };

      if (tempImgSize.width > tempImgSize.height) {
        tempImgSize.width = tempImgSize.width * targetSize / tempImgSize.height;
        tempImgSize.height = targetSize;
      } else {
        tempImgSize.height = tempImgSize.height * targetSize / tempImgSize.width;
        tempImgSize.width = targetSize;
      }

      // Создаем холст
      const canvas = document.createElement('canvas');
      canvas.width = tempImgSize.width;
      canvas.height = tempImgSize.height;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      ctx.drawImage(tempImg, 0, 0, tempImgSize.width, tempImgSize.height);
      const dataUrl = canvas.toDataURL();
      resolve(dataUrl);
    };

    tempImg.src = imageBase64;
  });
}

/**
 * конвертация объекта Uint8array в Data URL(base64)
 * @param inputData {Uint8array}
 * @return {string} (Data URL base64)
 */
export function uint8ToBase64(inputData: Uint8Array): string {
  let size = inputData.length;
  const binaryString = new Array(size);
  while (size--) {
    binaryString[size] = String.fromCharCode(inputData[size]);
  }
  const data = binaryString.join('');
  const base64 = window.btoa(data);
  const src = `data:image/png;base64,${base64}`;
  return src;
}

export async function openFileAndConvertToBase64(size: number = 200): Promise<string> {
  const title = 'Select image:';
  const openFiles = await w3n.device!.openFileDialog(title, '', false);
  let openFile: Uint8Array|undefined;

  if (openFiles) {
    openFile = await openFiles[0].readBytes();
    const base64Image = uint8ToBase64(openFile!);
    const resizedImage = await resizeImage(base64Image, size);
    return resizedImage;
  }

  return '';
}
