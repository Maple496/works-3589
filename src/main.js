var canvas = null, g = null, raf = 0;
var restartBox = null;
function onTap(x, y) {
  if (UI.inRestart(x, y, restartBox)) {
    Board.reset();
    return;
  }
  var idx = UI.hit(x, y, canvas.width, canvas.height);
  if (!Board.over() && idx >= 0) {
    Board.play(idx);
  }
}
function onKey(e) {
  if (e.key === 'r' || e.key === 'R') {
    Board.reset();
  } else if (!Board.over() && e.key >= '1' && e.key <= '9') {
    Board.play(parseInt(e.key, 10) - 1);
  }
}
function loop() {
  restartBox = UI.draw(g, canvas.width, canvas.height);
  raf = requestAnimationFrame(loop);
}
function mount(ctx) {
  canvas = document.createElement('canvas');
  canvas.width = ctx.bounds.w;
  canvas.height = ctx.bounds.h;
  canvas.style.position = 'absolute';
  canvas.style.left = '0px';
  canvas.style.top = '0px';
  ctx.stage.appendChild(canvas);
  g = canvas.getContext('2d');
  canvas.addEventListener('pointerdown', function (e) {
    var rect = canvas.getBoundingClientRect();
    onTap(e.clientX - rect.left, e.clientY - rect.top);
  });
  document.addEventListener('keydown', onKey);
  ctx.onBounds(function (b) {
    canvas.width = b.w;
    canvas.height = b.h;
  });
  raf = requestAnimationFrame(loop);
}
function destroy() {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
  document.removeEventListener('keydown', onKey);
  if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
  canvas = null;
  g = null;
}
Work.register({ name: '触屏井字棋', mount: mount, destroy: destroy });
