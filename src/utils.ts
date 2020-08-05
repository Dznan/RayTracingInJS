import Vec3 from './vec3';

class Utils {
    public static degreeToRadians(degree: number): number {
        return degree * Math.PI / 180;
    }

    public static random(): number;
    public static random(min: number, max: number): number;
    public static random(a?: number, b?: number): number {
        return a ? (b - a) * Math.random() + a : Math.random();
    }

    public static clamp(x: number, min: number, max: number): number {
        return Math.min(Math.max(x, min), max);
    }

    public static sampleColor(samples: Array<Vec3>): Vec3 {
        const samplesPerPixel = samples.length;
        let pixelColor = new Vec3(0, 0, 0);
        for (const sample of samples)
            pixelColor = pixelColor.add(sample);
        pixelColor = pixelColor.scale(1.0 / samplesPerPixel);
        pixelColor = pixelColor
            .apply(Math.sqrt)
            .apply((x: number) => Utils.clamp(x, 0, 0.99999));
        return pixelColor.scale(256);
    }

    public static randomInUnitSphere(): Vec3 {
        while (true) {
            let p = Vec3.random(-1, 1);
            if (p.magnitude() >= 1.0)
                continue;
            return p;
        }
    }

    public static randomUnitVector(): Vec3 {
        const a = Utils.random(0, 2 * Math.PI);
        const z = Utils.random(-1, 1);
        const r = Math.sqrt(1 - z * z);
        return new Vec3(r * Math.cos(a), r * Math.sin(a), z);
    }

    public static randomInHemisphere(normal: Vec3): Vec3 {
        const v = Utils.randomInUnitSphere();
        return Vec3.dot(v, normal) > 0.0 ? v : v.neg();
    }

    public static randomInUnitDisk(): Vec3 {
        while (true) {
            let p: Vec3 = new Vec3(Utils.random(-1, 1), Utils.random(-1, 1), 0);
            if (p.magnitude() >= 1)
                continue;
            return p;
        }
    }

    public static reflect(v: Vec3, n: Vec3): Vec3 {
        return v.sub(n.scale(2 * Vec3.dot(v, n)));
    }

    public static refract(v: Vec3, n: Vec3, refractionRate: number): Vec3 {
        const cosTheta = Vec3.dot(v.neg(), n);
        const rayOutPerp: Vec3 = (v.add(n.scale(cosTheta))).scale(refractionRate);
        const rayOutParallel = n.scale(
            -Math.sqrt(Math.abs(
                1 - rayOutPerp.magnitude() * rayOutPerp.magnitude()
            ))
        );
        return rayOutPerp.add(rayOutParallel);
    }

    public static schlick(cosine: number, refIdx: number): number {
        let r0 = (1 - refIdx) / (1 + refIdx);
        r0 = r0 * r0;
        return r0 + (1 - r0) * Math.pow(1- cosine, 5);
    }
}

export default Utils;