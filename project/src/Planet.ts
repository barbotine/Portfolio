import * as THREE from "three"; 

export default class Planet {
    private rotationPlanet! : number; 
   
    private coefRotationSpeedAroundSun! : number; 
    private positionX : number; 
    private textureFile : string; 
    private mesh : THREE.Mesh = new THREE.Mesh(); 
    private geometry = new THREE.SphereGeometry();
    private texture = new THREE.Texture; 
    private material = new THREE.MeshBasicMaterial(); 
    private radius : number; 
    private system = new THREE.Group()
    EARTH_YEAR = 2 * Math.PI * (1/60) * (1/60); 

    constructor(coefRotationSpeedAroundSun : number, positionX : number, rotationPlanet : number, radius : number, textureFile : string){
        this.rotationPlanet = rotationPlanet; 
        this.coefRotationSpeedAroundSun = coefRotationSpeedAroundSun
        this.positionX = positionX; 
        this.textureFile = textureFile; 
        this.radius = radius; 
        this.createMesh(); 
        this.addGroup(); 
    }

    createMesh(){
        this.geometry = new THREE.SphereGeometry(this.radius, 50, 50); 
        this.texture = new THREE.TextureLoader().load(this.textureFile); 
        this.material = new THREE.MeshBasicMaterial({map : this.texture}); 
        this.mesh = new THREE.Mesh(this.geometry, this.material); 
        this.mesh.position.setX(this.positionX); 
    }

    addGroup() : void{ 
        this.system.add(this.mesh); 
    }

    getGroup() : THREE.Group{
        return this.system; 
    }

    selfRotation() : void {
        this.mesh.rotation.y += this.rotationPlanet;
    }

    systemRotation() : void{
        this.system.rotation.y += (this.EARTH_YEAR / this.coefRotationSpeedAroundSun) *2
    }

    rotation(){
        this.selfRotation(); 
        this.systemRotation(); 
    }
    

}