import * as THREE from "three"; 


export default class Planet {
    private radius : number; 
    private positionX : number; 
    private textureFile : string; 
    private mesh : THREE.Mesh = new THREE.Mesh(); 
    private geometry! : THREE.SphereGeometry; 
    private texture! : THREE.Texture; 
    private material! : THREE.Material; 



    constructor(radius : number, positionX : number, textureFile : string){
        this.radius = radius; 
        this.positionX = positionX; 
        this.textureFile = textureFile; 
    }

    getMesh(){
        this.geometry = new THREE.SphereGeometry(this.radius); 
        this.texture = new THREE.TextureLoader().load(this.textureFile); 
        this.material = new THREE.MeshBasicMaterial({map : this.texture}); 
        this.mesh = new THREE.Mesh(this.geometry, this.material); 
        this.mesh.position.setX(this.positionX); 
        return this.mesh; 
    }
}