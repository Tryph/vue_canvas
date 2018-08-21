const secondsInDay = 24 * 60 * 60;

function durationToPix(durationInSeconds, ctx) {
  return Math.floor((durationInSeconds * (ctx.canvas.height - 2)) / secondsInDay) + 1;
}

function timeToPix(timeInSeconds, ctx) {
  return Math.floor((timeInSeconds * (ctx.canvas.height - 2)) / secondsInDay) + 1;
}

// proudly inspired from https://stackoverflow.com/a/16348977/2696355
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) | 0x3F;
    // eslint-disable-next-line no-bitwise
    color += (`00${value.toString(16)}`).substr(-2);
  }
  return color;
}

export { durationToPix, timeToPix, stringToColor };
