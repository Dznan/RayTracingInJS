import Vec3 from './vec3';
import Ray from './ray';
import { Material } from './material';

class HitRecord {
    public p: Vec3;
    public normal: Vec3;
    public t: number;
    public isFrontFace: boolean;
    public material: Material;

    public setFaceNormal(ray: Ray, outwardNormal: Vec3) {
        this.isFrontFace = Vec3.dot(ray.direction, outwardNormal) < 0;
        this.normal = this.isFrontFace ? outwardNormal : outwardNormal.neg();
    }

    public static clone(dst: HitRecord, src: HitRecord) {
        dst.p = new Vec3(src.p);
        dst.normal = new Vec3(src.normal);
        dst.t = src.t;
        dst.isFrontFace = src.isFrontFace;
        dst.material = src.material;
    }
}

export default HitRecord;

export declare interface Hittable {
    hit: (ray: Ray, t_min: number, t_max: number, rec: HitRecord) => boolean;
}
