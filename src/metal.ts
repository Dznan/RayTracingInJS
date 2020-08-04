import {Material} from './material';
import Vec3 from './vec3';
import Ray from './ray';
import HitRecord from './hittable';
import Utils from './utils';

class Metal implements Material {
    public albedo: Vec3;
    public fuzziness: number;

    public constructor(color: Vec3, fuzziness: number) {
        this.albedo = color;
        this.fuzziness = fuzziness;
    }
    
    scatter(rayIn: Ray, rec: HitRecord, attenuation: Vec3, scattered: Ray): boolean {
        const reflected: Vec3 = Utils.reflect(Vec3.uniform(rayIn.direction), rec.normal);
        Ray.clone(scattered, new Ray(rec.p, reflected.add(Utils.randomInUnitSphere().scale(this.fuzziness))));
        Vec3.clone(attenuation, this.albedo);
        return Vec3.dot(scattered.direction, rec.normal) > 0;
    }
}

export default Metal;