import Ray from './ray';
import HitRecord from './hittable';
import { Hittable } from './hittable';

class HittableList implements Hittable {
    public hittableObjects: Array<Hittable>;

    public constructor() {
        this.hittableObjects = [] as Array<Hittable>;
    }

    public hit(ray: Ray, t_min: number, t_max: number, rec: HitRecord): boolean {
        let tempRec = new HitRecord();
        let hitAnything: boolean = false;
        let closestSoFar: number = t_max;

        for (const obj of this.hittableObjects) {
            if (obj.hit(ray, t_min, closestSoFar, tempRec)) {
                hitAnything = true;
                closestSoFar = tempRec.t;
                HitRecord.clone(rec, tempRec);
            }
        }

        return hitAnything;
    }

    public clear() {
        this.hittableObjects = [] as Array<Hittable>;
    }

    public add(obj: Hittable) {
        this.hittableObjects.push(obj);
    }
}

export default HittableList;
