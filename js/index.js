"use strict";
(function () {
  let leon, canvas, ctx;
  let minWeight = 100;
  let maxWeight = 500;
  let weightStep = 10;
  let sw = window.innerWidth;
  let sh = window.innerHeight;
  const pixelRatio = 2;
  const leonHeightRatio = 0.85;

  function init() {
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");

    setSceneSize();

    leon = new LeonSans({
      text: "KEHTABP",
      color: ["#FFFFFF"],
      size: 120,
      tracking: 1,
      weight: 1,
      isWave: true,
      amplitude: 0.3,
    });

    requestAnimationFrame(animate);
  }

  function animate(t) {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, sw, sh);

    leon.weight += weightStep;
    if (leon.weight > maxWeight || leon.weight < minWeight) {
      weightStep *= -1;
    }

    leon.pathGap += 0.2;

    const x = (sw - leon.rect.w) / 2;
    const y = (sh - leon.rect.h) / 2;
    leon.position(x, y);

    leon.wave(ctx, t);
  }

  function setSceneSize() {
    canvas.width = sw * pixelRatio;
    canvas.height = sh * pixelRatio;
    canvas.style.width = sw + "px";
    canvas.style.height = sh + "px";
    ctx.scale(pixelRatio, pixelRatio);
  }

  window.onload = () => {
    init();
  };

  window.onresize = () => {
    sw = window.innerWidth;
    sh = window.innerHeight;
    leon.size = sh * leonHeightRatio;
    setSceneSize();
  };
})();
