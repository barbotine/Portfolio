import * as THREE from "three"; 
import { Mesh } from "three";


export default class Planet {
    private positionX : number; 
    private textureFile : string; 
    private mesh : THREE.Mesh = new THREE.Mesh(); 
    private geometry! : THREE.SphereGeometry; 
    private texture! : THREE.Texture; 
    private material! : THREE.Material; 
    private radius : number; 

    constructor(radius : number, positionX : number, textureFile : string){
        this.positionX = positionX; 
        this.textureFile = textureFile; 
        this.radius = radius; 
    }

    getMesh(){
        this.geometry = new THREE.SphereGeometry(this.radius, 50, 50); 
        this.texture = new THREE.TextureLoader().load(this.textureFile); 
        this.material = new THREE.MeshBasicMaterial({map : this.texture}); 
        this.mesh = new THREE.Mesh(this.geometry, this.material); 
        this.mesh.position.setX(this.positionX); 
        return this.mesh; 
    }

    getTexture(){
        return this.textureFile; 
    }

    rotatePlanete(_mesh : THREE.Mesh){
        _mesh.rotation.x += 0.001;
        _mesh.rotation.y += 0.001;
    }
}