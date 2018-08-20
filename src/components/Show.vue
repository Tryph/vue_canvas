<script>

const secondsInDay = 24 * 60 * 60;

// Helper functions to convert a start time and a duration to pixels.
function timeToPix(timeInSeconds, ctx) {
  return Math.floor((timeInSeconds * ctx.canvas.height) / secondsInDay);
}
function durationToPix(durationInSeconds, ctx) {
  return Math.floor((durationInSeconds * ctx.canvas.height) / secondsInDay);
}

// proudly pasted from https://stackoverflow.com/a/16348977/2696355
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) & 0xFF;
    // eslint-disable-next-line no-bitwise
    color += (`00${value.toString(16)}`).substr(-2);
  }
  return color;
}

export default {
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ['provider'],

  props: {
    id: { type: String, required: true },
    spectacle: { type: String, required: true },
    time: { type: Number, required: true },
    duration: { type: Number, required: true },
  },

  computed: {
    calculatedBox() {
      const ctx = this.provider.context;

      // Turn time / duration into x, y, width, height in pixels.
      const calculated = {
        x: 0,
        y: timeToPix(this.time, ctx),
        w: ctx.canvas.width,
        h: durationToPix(this.duration, ctx),
        color: stringToColor(this.spectacle),
      };
      return calculated;
    },
  },

  render() {
    // Since the parent canvas has to mount first, it's *possible* that the context may not be
    // injected by the time this render function runs the first time.
    if (!this.provider.context) return;
    const ctx = this.provider.context;

    // Calculate the new box. (Computed properties update on-demand.)
    const box = this.calculatedBox;

    // Draw the new rectangle.
    ctx.beginPath();
    ctx.rect(box.x, box.y, box.w, box.h);
    ctx.fillStyle = box.color;
    ctx.fill();

    // Draw the text
    ctx.fillStyle = '#000';
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.spectacle, (box.x + (box.w / 2)), box.y - 14);
  },
};
</script>
