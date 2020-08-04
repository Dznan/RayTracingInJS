import Utils from './utils';

export type Vec3Array = [number, number, number];

export type Vec4Array = [number, number, number, number];

class Vec3 {
  public '0': number;
  public '1': number;
  public '2': number;

  public constructor(v: Vec3 | Vec3Array);
  public constructor(a: number, b: number, c: number);
  public constructor(a: number | Vec3Array | Vec3, b?: number, c?: number) {
    let values: Vec3Array = [0, 0, 0];
    if (typeof a === 'number') {
      values = [a, b, c];
    } else if (Array.isArray(a)) {
      values = Vec3.fromValues(...a);
    } else if (a instanceof Vec3) {
      values = Vec3.fromValues(a[0], a[1], a[2]);
    }
    this[0] = values[0];
    this[1] = values[1];
    this[2] = values[2];
  }

  public static zeros(): Vec3 {
    return new Vec3(0, 0, 0);
  }

  public static random(): Vec3;
  public static random(min: number, max: number): Vec3;
  public static random(a?: number, b?: number): Vec3 {
    if (a)
      return new Vec3(Utils.random(a, b), Utils.random(a, b), Utils.random(a, b));
    return new Vec3(Utils.random(), Utils.random(), Utils.random());
  }

  public static fromValues(a:Vec3Array | number, b?: number, c?: number): Vec3Array {
    if (Array.isArray(a)) {
      return [a[0], a[1], a[2]];
    } else {
      return [a, b, c];
    }
  }

  public static add(out: Vec3 | undefined, a: Vec3 | Vec3Array, b: Vec3 | Vec3Array): Vec3 {
    if (!out)
      out = Vec3.zeros();
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }

  public static sub(out: Vec3 | undefined, a: Vec3 | Vec3Array, b: Vec3 | Vec3Array): Vec3 {
    if (!out)
      out = Vec3.zeros();
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }

  public static mul(out: Vec3 | undefined, a: Vec3 | Vec3Array, b: Vec3 | Vec3Array): Vec3 {
    if (!out)
      out = Vec3.zeros();
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
  }

  public static scale(out: Vec3 | undefined, a: Vec3 | Vec3Array, b: number): Vec3 {
    if (!out)
      out = Vec3.zeros();
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }

  public static divide(out: Vec3 | undefined, a: Vec3 | Vec3Array, b: number): Vec3 {
    if (!out)
      out = Vec3.zeros();
    out[0] = a[0] / b;
    out[1] = a[1] / b;
    out[2] = a[2] / b;
    return out;
  }

  public static neg(out: Vec3 | undefined, a: Vec3 | Vec3Array): Vec3 {
    if (!out)
      out = Vec3.zeros();
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
  }

  public static dot(a: Vec3 | Vec3Array, b: Vec3 | Vec3Array): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  public static magnitude(v: Vec3 | Vec3Array): number {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  }

  public static uniform(v: Vec3 | Vec3Array): Vec3 {
    return Vec3.divide(undefined, v, Vec3.magnitude(v));
  }

  public static apply(out: Vec3 | undefined, func: Function, a: Vec3): Vec3 {
    if (!out)
      out = Vec3.zeros();
    out[0] = func(a[0]);
    out[1] = func(a[1]);
    out[2] = func(a[2]);
    return out;
  }

  public static clone(dst: Vec3, src: Vec3) {
    dst[0] = src[0];
    dst[1] = src[1];
    dst[2] = src[2];
  }

  public clone(): Vec3 {
    return new Vec3(this[0], this[1], this[2]);
  }

  public add(b: Vec3 | Vec3Array): Vec3 {
    return Vec3.add(undefined, this, b);
  }

  public sub(b: Vec3 | Vec3Array): Vec3 {
    return Vec3.sub(undefined, this, b);
  }

  public mul(b: Vec3 | Vec3Array): Vec3 {
    return Vec3.mul(undefined, this, b);
  }

  public scale(b: number): Vec3 {
    return Vec3.scale(undefined, this, b);
  }

  public divide(b: number): Vec3 {
    return Vec3.divide(undefined, this, b);
  }

  public neg(): Vec3 {
    return Vec3.neg(undefined, this);
  }

  public dot(b: Vec3 | Vec3Array): number {
    return Vec3.dot(this, b);
  }

  public magnitude(): number {
    return Vec3.magnitude(this);
  }

  public uniform(): Vec3 {
    return Vec3.uniform(this);
  }

  public apply(func: Function): Vec3 {
    return Vec3.apply(undefined, func, this);
  }

  public get length(): number {
    return 3;
  }

  public get x(): number {
    return this[0];
  }

  public set x(v) {
    this[0] = v;
  }

  public get y(): number {
    return this[1];
  }

  public set y(v) {
    this[1] = v;
  }

  public get z(): number {
    return this[2];
  }

  public set z(v) {
    this[2] = v;
  }
}

export default Vec3;
