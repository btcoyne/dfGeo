const tf = dfd.tensorflow;
tf.setBackend('cpu');

export class Geometry {
  //TODO: vertices is a list of point indices and should only be able to use actual point numbers
  constructor(points=[],vertices=[],primitives=[],detail=[]) {
    this.points = new dfd.DataFrame(points);
    this.vertices = new dfd.DataFrame(vertices);
    this.primitives = new dfd.DataFrame(primitives);
    this.detail = new dfd.DataFrame(detail);
  }

  translate(x=0.0,y=0.0,z=0.0,group=null) {
    this.points.x = this.points.x.add(x);
    this.points.y = this.points.y.add(y);
    this.points.z = this.points.z.add(z);
    return this;
  }

  //TODO Switch from Euler angles to quaternions/rotors?
  //TODO Move centroid to orgin then rotate then move back?
  rotate(alpha=0.0, beta=0.0, gamma=0.0,order="rxryrz", group=null) {
    let xAxisRotationMatrix = tf.tensor([[1.0,0.0,0.0],[0.0, Math.cos(alpha), -1.0 * Math.sin(alpha)],[0.0, Math.sin(alpha), Math.cos(alpha)]]);

    let yAxisRotationMatrix = tf.tensor([[Math.cos(beta),0.0,Math.sin(beta)],[0.0,1.0,0.0],[-1.0 * Math.sin(beta), 0.0, Math.cos(beta)]]);
    
    let zAxisRotationMatrix = tf.tensor([[Math.cos(gamma),-1.0 * Math.sin(gamma),0.0],[Math.sin(gamma), Math.cos(gamma),0.0],[0.0,0.0,1.0]]);

    let firstRotation = xAxisRotationMatrix;
    let secondRotation = yAxisRotationMatrix;
    let thirdRotation = zAxisRotationMatrix;

    //this.points = this.points.apply((col) => { 
    //  return tf.einsum('ij,jk->ik',thirdRotation,tf.einsum('ij,jk->ik',secondRotation,tf.einsum('ij,jk->ik', firstRotation, tf.tensor(col,[3,1])))).reshape([3]).arraySync()}, {axis : 1});


    this.points = new dfd.DataFrame(tf.einsum('ij,jk->ik',thirdRotation,tf.einsum('ij,jk->ik',secondRotation,tf.einsum('ij,jk->ik',firstRotation,this.points.tensor.transpose()))).transpose(),{columns : ['x','y','z']});



    return this;
  }

  scale(x=1,y=1,z=1,group=null) {
    this.points.x = this.points.x.mul(x);
    this.points.y = this.points.y.mul(y);
    this.points.z = this.points.z.mul(z);
    return this;
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
    return this;
  }
}
