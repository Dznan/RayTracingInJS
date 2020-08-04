import {Material} from './material';
import Vec3 from './vec3';
import Ray from './ray';
import HitRecord from './hittable';
import Utils from './utils';

class Metal implements Material {
    public albedo: Vec3;

    public constructor(color: Vec3) {
        this.albedo = color;
    }
    
    scatter(rayIn: Ray, rec: HitRecord, attenuation: Vec3, scattered: Ray): boolean {
        const reflected: Vec3 = Utils.reflect(Vec3.uniform(rayIn.direction), rec.normal);
        Ray.clone(scattered, new Ray(rec.p, reflected));
        Vec3.clone(attenuation, this.albedo);
        return Vec3.dot(scattered.direction, rec.normal) > 0;
    }
}

export default Metal;