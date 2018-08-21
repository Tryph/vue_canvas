<script>

import { durationToPix, stringToColor, timeToPix } from '@/common';

export default {
  // Gets us the provider property from the parent <day-program> component.
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

  // eslint-disable-next-line vue/require-render-return
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
    // ctx.strokeStyle = '#FFF';
    ctx.fillStyle = '#000';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    // ctx.strokeText(this.spectacle, (box.x + (box.w / 2)), box.y + (box.h / 2));
    ctx.fillText(this.spectacle, (box.x + (box.w / 2)), box.y + (box.h / 2));
  },
};
</script>
