export function getErrorMessage(err) {
  return (
    err.response?.data?.message ||
    err.response?.message ||
    err.message ||
    JSON.stringify(err)
  );
}

export function pickFromObject(object, keys) {
  const ans = {};
  for (let key of keys) {
    ans[key] = object[key] ?? null;
  }
  return ans;
}

export function removeFromObject(object, keys) {
  for (let key of keys) {
    delete object[key];
  }
  return object;
}

export function removeFalsyValuesFromObject(object) {
  for (let key of Object.keys(object)) {
    if (
      object[key] === undefined ||
      object[key] === null ||
      object[key] === ""
    ) {
      delete object[key];
    }
  }
  return object;
}

export function kNeighborsOfIndex(arr, index, k = 5) {
  let dl = index,
    ul = arr.length - index - 1;
  let lowerIndex, upperIndex;
  if (dl < ul) {
    lowerIndex = Math.max(index - 2, 0);
    upperIndex = Math.min(lowerIndex + k, arr.length);
  } else {
    upperIndex = Math.min(index + 3, arr.length);
    lowerIndex = Math.max(upperIndex - k, 0);
  }
  return arr.slice(lowerIndex, upperIndex);
}

export function copyToClipboard(value) {
  navigator.clipboard.writeText(value);
}

export function shadeColor(color, percent, alpha = 1) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = (R < 255 ? R : 255).toString(16);
  G = (G < 255 ? G : 255).toString(16);
  B = (B < 255 ? B : 255).toString(16);

  let RR = R.length === 1 ? `0${R}` : R;
  let GG = G.length === 1 ? `0${G}` : G;
  let BB = B.length === 1 ? `0${B}` : B;
  return "#" + RR + GG + BB;
}

export function hexToRgb(hex, getAsString = true) {
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const rgb = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
  const rgbString = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  return result ? (getAsString ? rgbString : rgb) : null;
}
