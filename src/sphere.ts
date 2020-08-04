import Vec3 from './vec3';
import Ray from './ray';
import HitRecord from './hittable';
import { Hittable } from './hittable';
import { Material } from './material';

class Sphere implements Hittable {
    public center: Vec3;
    public radius: number;
    public material: Material;

    public constructor();
    public constructor(center: Vec3, radius: number, material: Material);
    public constructor(a?: Vec3, b?: number, material?: Material) {
        this.center = a ? a : new Vec3(a);
        this.radius = b ? b : 1;
        this.material = material ? material : undefined;
    }

    hit(ray: Ray, t_min: number, t_max: number, recOut: HitRecord): boolean {
        const oc = ray.origin.sub(this.center);
        const a = Vec3.dot(ray.direction, ray.direction);
        const halfb = Vec3.dot(oc, ray.direction);
        const c = Vec3.dot(oc, oc) - this.radius * this.radius;
        const discriminant = halfb*halfb - a*c;

        if (discriminant > 0) {
            const root = Math.sqrt(discriminant);
            let ts = [(-halfb - root) / a, (-halfb + root) / a];
            for (const t of ts) {
                if (t < t_max && t > t_min) {
                    recOut.t = t;
                    recOut.p = new Vec3(ray.at(recOut.t));
                    recOut.setFaceNormal(ray, new Vec3((recOut.p.sub(this.center)).divide(this.radius)));
                    recOut.material = this.material;
                    return true;
                }
            }
        }
        return false;
    }
}

export default Sphere;