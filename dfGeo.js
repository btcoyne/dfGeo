
export class Geometry {
  //TODO: vertices is a list of point indices and should only be able to use actual point numbers
  constructor(points=[],vertices=[],primitives=[],detail=[]) {
    this.points = new dfd.DataFrame(points);
    this.vertices = new dfd.DataFrame(vertices);
    this.primitives = new dfd.DataFrame(primitives);
    this.detail = new dfd.DataFrame(detail);
  }

  translate(x,y,z,group=null) {
    this.points.x = this.points.x.add(x)
    this.points.y = this.points.y.add(y)
    this.points.z = this.points.z.add(z)
    return this.points
  }

  print(geotype=null) {
    const geotypes = ["points", "vertices", "primitives", "detail"];
    if (geotype === null) {
      for (let gt of geotypes) {
        console.log(gt);
        this[gt].print();
      }
    } else if (geotypes.includes(geotype.toLowerCase())) {
      console.log(geotype.toLowerCase());
      this[geotype.toLowerCase()].print();    
    }
  }
}
