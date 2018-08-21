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

    for (let quarter = 0; quarter < 24 * 4; quarter += 1) {
      if (quarter % 4 !== 0) {
        const y = timeToPix(quarter * 15 * 60, ctx);
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;
        ctx.moveTo(0, y);
        ctx.lineTo(ctx.canvas.width, y);
        ctx.strokeStyle = 'black';
        ctx.stroke();
      }
    }
  },
};
</script>
