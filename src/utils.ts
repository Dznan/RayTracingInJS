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
        if (Vec3.dot(v, normal) > 0.0)
            return v;
        else
            return v.neg();
    }

    public static reflect(v: Vec3, n: Vec3): Vec3 {
        return v.sub(n.scale(2 * Vec3.dot(v, n)));
    }
}

export default Utils;