<script>

import { timeToPix } from '@/common';

export default {
  // Gets us the provider property from the parent <day-program> component.
  inject: ['provider'],

  // eslint-disable-next-line vue/require-render-return
  render() {
    // Since the parent canvas has to mount first, it's *possible* that the context may not be
    // injected by the time this render function runs the first time.
    if (!this.provider.context) return;
    const ctx = this.provider.context;

    for (let hour = 0; hour < 24; hour += 1) {
      const y = timeToPix(hour * 60 * 60, ctx);
      ctx.beginPath();
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 2;
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }
  },
};
</script>
