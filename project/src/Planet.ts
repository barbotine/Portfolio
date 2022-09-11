import * as THREE from "three"; 


export default class Planet {
    private radius : number; 
    private positionX : number; 
    private textureFile : string; 
    private mesh : THREE.Mesh = new THREE.Mesh(); 
    constructor(radius : number, positionX : number, textureFile : string, mesh :THREE.Mesh){
        this.radius = radius; 
        this.positionX = positionX; 
        this.textureFile = textureFile; 
        this.mesh = mesh; 
    }

    getMesh(){
        ()
    }
  
}