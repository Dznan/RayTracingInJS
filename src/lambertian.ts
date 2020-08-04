import {Material} from './material';
import Ray from './ray';
import HitRecord from './hittable';
import Vec3 from './vec3';
import Utils from './utils';

class Lambertian implements Material {
    public albedo: Vec3;

    public constructor(color: Vec3) {
        this.albedo = color;
    }

    scatter(rayIn: Ray, rec: HitRecord, attenuation: Vec3, scattered: Ray): boolean {
        const scatterDirection:Vec3 = rec.normal.add(Utils.randomUnitVector());
        Ray.clone(scattered, new Ray(rec.p, scatterDirection))
        Vec3.clone(attenuation, this.albedo);
        return true;
    }
}

export default Lambertian;