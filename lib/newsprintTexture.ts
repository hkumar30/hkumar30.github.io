const WIDTH = 600;
const HEIGHT = 800;
const FIBER_COUNT = 15000;
const SPECKLE_COUNT = 9000;

function random(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function hsla(h: number, s: number, l: number, a: number): string {
  return `hsla(${h}, ${s}%, ${l}%, ${a / 100})`;
}

function drawNewsprint(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = hsla(40, 12, 92, 100);
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.lineWidth = 0.5;
  for (let i = 0; i < FIBER_COUNT; i++) {
    const x = random(0, WIDTH);
    const y = random(0, HEIGHT);
    const reach = random(4, 14);
    ctx.strokeStyle = hsla(38, 14, random(45, 78), random(8, 20));
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x + random(-reach, reach), y + random(-reach, reach),
      x + random(-reach, reach), y + random(-reach, reach),
      x + random(-reach, reach), y + random(-reach, reach),
    );
    ctx.stroke();
  }

  for (let i = 0; i < SPECKLE_COUNT; i++) {
    ctx.fillStyle = hsla(35, 12, random(35, 65), random(8, 20));
    ctx.beginPath();
    ctx.arc(random(0, WIDTH), random(0, HEIGHT), random(0.5, 1.4) / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function createNewsprintTexture(): Promise<string | null> {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) return Promise.resolve(null);

  drawNewsprint(ctx);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob ? URL.createObjectURL(blob) : null), 'image/png');
  });
}
