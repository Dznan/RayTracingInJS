import {Material} from './material';
import Ray from './ray';
import HitRecord from './hittable';
import Vec3 from './vec3';
import Utils from './utils';

class Dialectric implements Material {
    // Refractive Index
    public refIdx: number;

    public constructor(refIdx: number) {
        this.refIdx = refIdx;
    }

    public scatter(rayIn: Ray, rec: HitRecord, attenuation: Vec3, scattered: Ray): boolean {
        Vec3.clone(attenuation, new Vec3(1, 1, 1));
        const refractionRate = rec.isFrontFace ? (1.0 / this.refIdx) : this.refIdx;
        const unitDirection: Vec3 = Vec3.uniform(rayIn.direction);

        const cosTheta: number = Math.min(Vec3.dot(unitDirection.neg(), rec.normal), 1.0);
        const sinTheta: number = Math.sqrt(1 - cosTheta * cosTheta);
        if (refractionRate * sinTheta > 1.0) { // Must reflect
            const reflacted: Vec3 = Utils.reflect(unitDirection, rec.normal);
            Ray.clone(scattered, new Ray(rec.p, reflacted));
            return true;
        }

        // May refract
        const reflectProb = Utils.schlick(cosTheta, refractionRate);
        if (Utils.random() < reflectProb) { // reflect
            const reflacted: Vec3 = Utils.reflect(unitDirection, rec.normal);
            Ray.clone(scattered, new Ray(rec.p, reflacted));
            return true;
        }
        // refract
        const refracted: Vec3 = Utils.refract(unitDirection, rec.normal, refractionRate);
        Ray.clone(scattered, new Ray(rec.p, refracted));
        return true;
    }
}

export default Dialectric;