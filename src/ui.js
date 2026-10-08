var UI = (function () {
  var CELL = 100;
  var PAD = 20;
  function layout(w, h) {
    var size = Math.min(w, h) - PAD * 2;
    return { size: size, cell: size / 3, x: (w - size) / 2, y: (h - size) / 2 - 20 };
  }
  function hit(x, y, w, h) {
    var L = layout(w, h);
    if (x < L.x || y < L.y || x >= L.x + L.size || y >= L.y + L.size) return -1;
    var c = Math.floor((x - L.x) / L.cell);
    var r = Math.floor((y - L.y) / L.cell);
    return r * 3 + c;
  }
  function draw(g, w, h) {
    g.clearRect(0, 0, w, h);
    g.fillStyle = '#1e2430';
    g.fillRect(0, 0, w, h);
    var L = layout(w, h);
    g.strokeStyle = '#8fa3bf';
    g.lineWidth = 2;
    for (var i = 1; i < 3; i++) {
      g.beginPath();
      g.moveTo(L.x + L.cell * i, L.y);
      g.lineTo(L.x + L.cell * i, L.y + L.size);
      g.stroke();
      g.beginPath();
      g.moveTo(L.x, L.y + L.cell * i);
      g.lineTo(L.x + L.size, L.y + L.cell * i);
      g.stroke();
    }
    for (var idx = 0; idx < 9; idx++) {
      var cx = L.x + (idx % 3) * L.cell + L.cell / 2;
      var cy = L.y + Math.floor(idx / 3) * L.cell + L.cell / 2;
      var rr = L.cell * 0.3;
      var v = Board.get(idx);
      g.lineWidth = 6;
      if (v === 1) {
        g.strokeStyle = '#4dd2ff';
        g.beginPath();
        g.arc(cx, cy, rr, 0, Math.PI * 2);
        g.stroke();
      } else if (v === 2) {
        g.strokeStyle = '#ff8f6b';
        g.beginPath();
        g.moveTo(cx - rr, cy - rr);
        g.lineTo(cx + rr, cy + rr);
        g.moveTo(cx + rr, cy - rr);
        g.lineTo(cx - rr, cy + rr);
        g.stroke();
      }
    }
    var line = Board.line();
    if (line) {
      g.strokeStyle = '#ffd75e';
      g.lineWidth = 8;
      var x1 = L.x + (line[0] % 3) * L.cell + L.cell / 2;
      var y1 = L.y + Math.floor(line[0] / 3) * L.cell + L.cell / 2;
      var x2 = L.x + (line[2] % 3) * L.cell + L.cell / 2;
      var y2 = L.y + Math.floor(line[2] / 3) * L.cell + L.cell / 2;
      g.beginPath();
      g.moveTo(x1, y1);
      g.lineTo(x2, y2);
      g.stroke();
    }
    g.fillStyle = '#dfe8f5';
    g.font = '18px sans-serif';
    g.textAlign = 'center';
    var r = Board.result();
    var msg;
    if (r === 1) msg = 'O 获胜！';
    else if (r === 2) msg = 'X 获胜！';
    else if (r === -1) msg = '平局';
    else msg = '轮到 ' + (Board.turn() === 1 ? 'O' : 'X');
    g.fillText(msg, w / 2, L.y - 12);
    var bw = 160, bh = 40;
    var bx = (w - bw) / 2, by = L.y + L.size + 16;
    g.fillStyle = '#3a4a63';
    g.fillRect(bx, by, bw, bh);
    g.fillStyle = '#dfe8f5';
    g.font = '18px sans-serif';
    g.fillText('重新开始', w / 2, by + 26);
    g.font = '13px sans-serif';
    g.fillStyle = '#9db0cc';
    g.fillText('点击/触摸落子，R 键重开', w / 2, by + bh + 22);
    return { bx: bx, by: by, bw: bw, bh: bh };
  }
  function inRestart(x, y, box) {
    return box && x >= box.bx && x <= box.bx + box.bw && y >= box.by && y <= box.by + box.bh;
  }
  return { hit: hit, draw: draw, inRestart: inRestart };
})();
