import Image from './image';
import Vec3 from './vec3';
import Ray from './ray';
import HitRecord from './hittable';
import HittableList from './hittable-list';
import Sphere from './sphere';
import Camera from './camera';
import Utils from './utils';
import Lambertian from './lambertian';
import Metal from './metal';
import Dialectric from "./dialectric";

function rayColor(ray, world, depth) {
  if (depth <= 0)
    return Vec3.zeros();

  let rec = new HitRecord();
  if (world.hit(ray, 1e-5, Infinity, rec)) {
    // const target = rec.p.add(rec.normal).add(Utils.randomInUnitSphere());
    // const target = rec.p.add(rec.normal).add(Utils.randomUnitVector());
    // const target = rec.p.add(Utils.randomUnitVector(rec.normal));
    // return rayColor(new Ray(rec.p, target.sub(rec.p)), world, depth-1).scale(0.5);

    let scattered = new Ray();
    let attenuation = Vec3.zeros();
    if (rec.material.scatter(ray, rec, attenuation, scattered))
      return attenuation.mul(rayColor(scattered, world, depth-1));
    return new Vec3(0, 0, 0);
  }
  const unit = Vec3.uniform(ray.direction);
  const t = 0.5 * (unit.y + 1.0);
  return new Vec3(1.0, 1.0, 1.0).scale(1 - t).add(new Vec3(0.5, 0.7, 1.0).scale(t));
}

function drawImage(canvas, ctx, samplesPerPixel=1, maxDepth=50) {
  // create image buffer
  const width = canvas.width;
  const height = canvas.height;
  const aspectRatio = width / height;
  const image = new Image(width, height);

  // setup camera
  const camera = new Camera(aspectRatio);

  // setup world
  const world = new HittableList();

  const materialGround = new Lambertian(new Vec3(0.8, 0.8, 0.0));
  const materialCenter = new Lambertian(new Vec3(0.1, 0.2, 0.5));
  const materialLeft   = new Dialectric(1.5);
  const materialRight  = new Metal(new Vec3(0.8, 0.6, 0.2), 1.0);

  world.add(new Sphere(new Vec3( 0.0, -100.5, -1.0), 100.0, materialGround));
  world.add(new Sphere(new Vec3( 0.0,    0.0, -1.0),   0.5, materialCenter));
  world.add(new Sphere(new Vec3(-1.0,    0.0, -1.0),   0.5, materialLeft));
  world.add(new Sphere(new Vec3( 1.0,    0.0, -1.0),   0.5, materialRight));

  // render
  for (let i = 0; i < width; ++i) {
    for (let j = 0; j < height; ++j) {
      let sampleColors = [];
      for (let s = 0; s < samplesPerPixel; ++s) {
        const u = (i + Utils.random()) / (width - 1);
        const v = (j + Utils.random()) / (height - 1);
        const ray = camera.getRay(u, v);
        sampleColors.push(rayColor(ray, world, maxDepth));
      }

      // ImageData's origin is on top left corner
      image.setPixel(i, height - j - 1, Utils.sampleColor(sampleColors));
    }
  }

  // draw image
  ctx.putImageData(image.imageData, 0, 0);
}

function render() {
  const canvas = document.querySelector('#canvas');
  if (!canvas.getContext) {
    console.log('Canvas is not supported in this browser!');
    return;
  }
  const ctx = canvas.getContext('2d');

  let samplesPerPixel = document.querySelector('#spp').value;
  let depth = document.querySelector('#depth').value;

  samplesPerPixel = samplesPerPixel ? samplesPerPixel : 4;
  depth = depth ? depth : 50;

  console.log('Canvas size:', canvas.width, canvas.height);
  console.log('Samples/Pixel:', samplesPerPixel);
  console.log('Depth:', depth);

  return new Promise(resolve => {
    drawImage(canvas, ctx, samplesPerPixel, depth);
    resolve();
  });
}

window.render = render;