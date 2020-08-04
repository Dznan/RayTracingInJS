import Vec3 from './vec3';
import Ray from "./ray";
import HitRecord from "./hittable";

export declare interface Material {
    scatter: (rayIn: Ray, rec: HitRecord, attenuation: Vec3, scattered: Ray) => boolean;
}