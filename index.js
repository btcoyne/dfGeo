// Import stylesheets
import './style.css';
import {Geometry} from './dfGeo.js';

// Write Javascript code!
//const dfd = require("danfojs-node")
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1> </h1>`;

let json_data = [{ x: 0.4612, y: 4.28283, z: -1.509 },
  { x: 0.5112, y: -0.22863, z: -3.39059 },
  { x: 0.6911, y: -0.82863, z: -1.5059 },
  { x: 0.4692, y: -1.28863, z: 4.5059 }];

let geo = new Geometry(json_data);
geo.print("points");
geo.rotate(Math.PI,0,0);
geo.print("points");


