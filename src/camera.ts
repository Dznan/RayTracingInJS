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

    public constructor(
        aspectRatio: number,
        verticalFieldOfView: number,
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

        const w = Vec3.uniform(eye.sub(center));
        const u = Vec3.uniform(up.cross(w));
        const v = w.cross(u);

        this.origin = eye;
        this.horizontal = u.scale(this.viewportWidth);
        this.vertical = v.scale(this.viewportHeight);
        this.lowerLeftCorner = this.origin
            .sub(this.horizontal.scale(0.5))
            .sub(this.vertical.scale(0.5))
            .sub(w);
    }

    public getRay(u: number, v: number): Ray {
        return new Ray(
            this.origin,
            this.lowerLeftCorner
                .add(this.horizontal.scale(u))
                .add(this.vertical.scale(v))
                .sub(this.origin)
        );
    }
}

export default Camera;