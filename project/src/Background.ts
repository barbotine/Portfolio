import * as THREE from "three";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

export default class Background{
  async getSkyBox(){
    const rgbeLoader = new RGBELoader();
    const texture = await rgbeLoader.loadAsync('img/nebula.hdr')
    texture.mapping = THREE.EquirectangularReflectionMapping;

    // Créer une géométrie de sphère
    const geometry = new THREE.SphereGeometry(500, 60, 40)

    // Créer un matériau avec la texture HDRI
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide
    })

    // Créer la sphère et l'ajouter à la scène
    const skySphere = new THREE.Mesh(geometry, material)
    return  {
      texture : texture,
      skySphere : skySphere
    }
  }
}
