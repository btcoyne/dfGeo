
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

  print(geotype) {
    if (geotype.toLowerCase() === "points") {
      console.log("points");
      this.points.print();
    }
    if (geotype.toLowerCase() === "vertices") {
      console.log("vertices");
      this.vertices.print();
    }
    if (geotype.toLowerCase() === "primitives") {
      console.log("primitives");
      this.primitives.print();
    }
    if (geotype.toLowerCase() === "detail") {
      console.log("detail");
      this.detail.print();
    }
  }

}