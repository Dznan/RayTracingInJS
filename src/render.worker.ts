import Image from './image';
import Vec3 from './vec3';
import Ray from './ray';
import HitRecord, {Hittable} from './hittable';
import HittableList from './hittable-list';
import Sphere from './sphere';
import Camera from './camera';
import Utils from './utils';
import Lambertian from './lambertian';
import Metal from './metal';
import Dialectric from "./dialectric";

function rayColor(ray: Ray, world: Hittable, depth: number): Vec3 {
    if (depth <= 0)
        return Vec3.zeros();

    let rec = new HitRecord();
    if (world.hit(ray, 1e-5, Infinity, rec)) {
        const scattered = new Ray();
        const attenuation = Vec3.zeros();
        if (rec.material.scatter(ray, rec, attenuation, scattered))
            return attenuation.mul(rayColor(scattered, world, depth - 1));
        return new Vec3(0, 0, 0);
    }
    const unit = Vec3.uniform(ray.direction);
    const t = 0.5 * (unit.y + 1.0);
    return new Vec3(1.0, 1.0, 1.0).scale(1 - t).add(new Vec3(0.5, 0.7, 1.0).scale(t));
}

function setupWorld(): Hittable {
    const world = new HittableList();

    const materialGround = new Lambertian(new Vec3(0.8, 0.8, 0.0));
    const materialCenter = new Lambertian(new Vec3(0.1, 0.2, 0.5));
    const materialLeft = new Dialectric(1.5);
    const materialRight = new Metal(new Vec3(0.8, 0.6, 0.2), 0.2);

    world.add(new Sphere(new Vec3(0.0, -100.5, -1.0), 100.0, materialGround));
    world.add(new Sphere(new Vec3(0.0, 0.0, -1.0), 0.5, materialCenter));
    world.add(new Sphere(new Vec3(-1.0, 0.0, -1.0), 0.5, materialLeft));
    world.add(new Sphere(new Vec3(1.0, 0.0, -1.0), 0.5, materialRight));

    // const r = Math.cos(Math.PI / 4);
    // const materialGround = new Lambertian(new Vec3(0.8, 0.8, 0.0));
    // const materialLeft   = new Dialectric(1.5);
    // const materialCenter = new Lambertian(new Vec3(0.1, 0.2, 0.5));
    // const materialRight  = new Metal(new Vec3(0.6, 0.6, 0.6), 0.2);
    //
    // world.add(new Sphere(new Vec3(0,  0.0, -100), 80, materialGround));
    // world.add(new Sphere(new Vec3(-r, 0.0, -1.0), r, materialLeft));
    // world.add(new Sphere(new Vec3( 0,   r, -1.0), r, materialCenter));
    // world.add(new Sphere(new Vec3( r, 0.0, -1.0), r, materialRight));

    return world;
}

function drawImage(
    canvas: OffscreenCanvas | HTMLCanvasElement,
    ctx: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D,
    samplesPerPixel: number = 1,
    maxDepth: number = 50
) {
    // create image buffer
    const width = canvas.width;
    const height = canvas.height;
    const aspectRatio = width / height;
    const image = new Image(width, height);

    // setup camera
    const camera = new Camera(
        aspectRatio,
        90,
        new Vec3(-2, 2, 1),
        new Vec3(0, 0, -1),
        new Vec3(0, 1, 0)
    );

    // setup world
    const world = setupWorld();

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

function render(canvas: OffscreenCanvas, samplesPerPixel: number, depth: number): void {
    if (!canvas.getContext) {
        console.log('Canvas is not supported in this browser!');
        return;
    }
    const ctx = canvas.getContext('2d');

    samplesPerPixel = samplesPerPixel ? samplesPerPixel : 4;
    depth = depth ? depth : 50;

    console.log('Canvas size:', canvas.width, canvas.height);
    console.log('Samples/Pixel:', samplesPerPixel);
    console.log('Depth:', depth);

    drawImage(canvas, ctx, samplesPerPixel, depth);
}

function messageHandler(ev: MessageEvent) {
    if (ev.data.msg === 'render') {
        render(ev.data.canvas, ev.data.payload.samplesPerPixel, ev.data.payload.depth);
    }
}

addEventListener('message', messageHandler);
