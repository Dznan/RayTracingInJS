import { Vec3Array, Vec4Array } from './vec3';
import Vec3 from './vec3';

class Image {
  public imageData: ImageData;
  private readonly data: Uint8ClampedArray;

  public constructor(width: number, height: number);
  public constructor(array: Uint8ClampedArray, width: number, height?: number);
  public constructor(a: Uint8ClampedArray | number, b: number, c?: number) {
    if (typeof a === 'number')
      this.imageData = new ImageData(a, b);
    else
      this.imageData = new ImageData(a, b, c);
    this.data = this.imageData.data;
  }

  public getPixel(x: number, y: number): Vec3Array | Vec4Array {
    const p = (y * this.imageData.width + x) << 2;
    return [this.data[p], this.data[p + 1], this.data[p + 2], this.data[p + 3]];
  }

  public setPixel(x: number, y: number, color: Vec3 | Vec3Array | Vec4Array) {
    const p = (y * this.imageData.width + x) << 2;
    this.data[p] = color[0];
    this.data[p + 1] = color[1];
    this.data[p + 2] = color[2];
    this.data[p + 3] = color.length > 3 ? this.data[3] : 255;
  }

  public get width(): number {
    return this.imageData.width;
  }

  public get height(): number {
    return this.imageData.height;
  }
}

export default Image;
