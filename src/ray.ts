import { Vec3Array } from './vec3';
import Vec3 from './vec3';

class Ray {
  public origin: Vec3;
  public direction: Vec3;

  public constructor();
  public constructor(origin: Vec3 | Vec3Array, direction: Vec3 | Vec3Array);
  public constructor(a?: Vec3 | Vec3Array, b?: Vec3 | Vec3Array) {
    this.origin = a ? new Vec3(a) : Vec3.zeros();
    this.direction = b ? new Vec3(b) : Vec3.zeros();
  }

  public at(t: number): Vec3 {
    return this.direction.scale(t).add(this.origin);
  }

  public static clone(dst: Ray, src: Ray) {
    dst.origin = new Vec3(src.origin);
    dst.direction = new Vec3(src.direction);
  }
}

export default Ray;
