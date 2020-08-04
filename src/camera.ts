import Vec3 from './vec3';
import Ray from './ray';

class Camera {
    private aspectRatio: number;
    private readonly viewportHeight: number;
    private readonly viewportWidth: number;
    private readonly focalLength: number;
    private origin: Vec3;
    private horizontal: Vec3;
    private vertical: Vec3;
    private lowerLeftCorner: Vec3;

    public constructor(aspectRatio: number) {
        this.aspectRatio = aspectRatio;
        this.viewportHeight = 2.0;
        this.viewportWidth = aspectRatio * this.viewportHeight;
        this.focalLength = 1.0;

        this.origin = new Vec3(0, 0, 0);
        this.horizontal = new Vec3(this.viewportWidth, 0, 0);
        this.vertical = new Vec3(0, this.viewportHeight, 0);
        this.lowerLeftCorner = this.origin
            .sub(this.horizontal.scale(0.5))
            .sub(this.vertical.scale(0.5))
            .sub(new Vec3(0, 0, this.focalLength));
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