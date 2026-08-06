// Lightweight background shader — drifting blue "metaball" glow on dark.
// No libraries. Lazy, capped FPS, pauses when tab hidden, off for reduced-motion.
(function () {
  "use strict";
  const canvas = document.getElementById("shader");
  if (!canvas) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { canvas.style.display = "none"; return; }

  const gl = canvas.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: false });
  if (!gl) { canvas.style.display = "none"; return; }

  const vert = `
    attribute vec2 p;
    void main(){ gl_Position = vec4(p, 0.0, 1.0); }
  `;
  // 3 slow-moving soft blobs, blue, over transparent/near-black.
  const frag = `
    precision mediump float;
    uniform vec2 u_res;
    uniform float u_t;
    float blob(vec2 uv, vec2 c, float r){
      float d = length(uv - c);
      return smoothstep(r, 0.0, d);
    }
    void main(){
      vec2 uv = gl_FragCoord.xy / u_res.xy;
      uv.x *= u_res.x / u_res.y;
      float t = u_t * 0.08;
      vec2 a = vec2(0.30 + 0.10*sin(t*1.1), 0.28 + 0.08*cos(t*0.9));
      vec2 b = vec2(0.78 + 0.09*cos(t*0.7), 0.20 + 0.10*sin(t*1.3));
      vec2 c = vec2(0.55 + 0.12*sin(t*0.5), 0.72 + 0.09*cos(t*0.8));
      float m = blob(uv,a,0.42) + blob(uv,b,0.36) + blob(uv,c,0.46);
      m = clamp(m, 0.0, 1.0);
      vec3 tint = vec3(0.55, 0.58, 0.68);
      vec3 col = tint * m;
      float alpha = m * 0.22;
      gl_FragColor = vec4(col, alpha);
    }
  `;

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.style.display = "none"; return; }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, "u_res");
  const uT = gl.getUniformLocation(prog, "u_t");
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
  function resize() {
    const w = Math.floor(window.innerWidth * DPR);
    const h = Math.floor(window.innerHeight * DPR);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  }
  window.addEventListener("resize", resize);
  resize();

  let running = true;
  document.addEventListener("visibilitychange", () => {
    running = document.visibilityState === "visible";
    if (running) requestAnimationFrame(loop);
  });

  const start = performance.now();
  let last = 0;
  const frameMs = 1000 / 30; // cap ~30fps — plenty for ambient, easy on GPU
  function loop(now) {
    if (!running) return;
    if (now - last >= frameMs) {
      last = now;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uT, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
