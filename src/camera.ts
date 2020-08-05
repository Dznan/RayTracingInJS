import Vec3 from './vec3';
import Ray from './ray';
import Utils from "./utils";

class Camera {
    private aspectRatio: number;
    private readonly viewportHeight: number;
    private readonly viewportWidth: number;
    private readonly origin: Vec3;
    private horizontal: Vec3;
    private vertical: Vec3;
    private lowerLeftCorner: Vec3;
    private verticalFieldOfView: number;
    private aperture: number;
    private focusDist: number;
    private lensRadius: number;
    private w: Vec3;
    private u: Vec3;
    private v: Vec3;

    public constructor(
        aspectRatio: number,
        verticalFieldOfView: number,
        aperture: number,
        focusDist: number,
        eye: Vec3,
        center: Vec3,
        up: Vec3
    ) {
        const theta: number = Utils.degreeToRadians(verticalFieldOfView);
        const h: number = Math.tan(theta / 2);

        this.verticalFieldOfView = verticalFieldOfView;
        this.aspectRatio = aspectRatio;
        this.viewportHeight = 2.0 * h;
        this.viewportWidth = aspectRatio * this.viewportHeight;

        this.aperture = aperture;
        this.focusDist = focusDist;

        this.lensRadius = aperture / 2;

        this.w = Vec3.uniform(eye.sub(center));
        this.u = Vec3.uniform(up.cross(this.w));
        this.v = this.w.cross(this.u);

        this.origin = eye;
        this.horizontal = this.u.scale(this.viewportWidth * focusDist);
        this.vertical = this.v.scale(this.viewportHeight * focusDist);
        this.lowerLeftCorner = this.origin
            .sub(this.horizontal.scale(0.5))
            .sub(this.vertical.scale(0.5))
            .sub(this.w.scale(focusDist));
    }

    public getRay(s: number, t: number): Ray {
        const rd: Vec3 = Utils.randomInUnitDisk().scale(this.lensRadius);
        const offset: Vec3 = this.u.scale(rd.x).add(this.v.scale(rd.y));
        return new Ray(
            this.origin.add(offset),
            this.lowerLeftCorner
                .add(this.horizontal.scale(s))
                .add(this.vertical.scale(t))
                .sub(this.origin)
                .sub(offset)
        );
    }
}

export default Camera;