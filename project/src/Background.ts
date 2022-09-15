import * as THREE from "three"; 

export default class Background{
    getSkyBox(){
      const materialArray : THREE.MeshBasicMaterial[] = []; 
      const ft = new THREE.TextureLoader().load("img/background/space_bk.png");
      const bk = new THREE.TextureLoader().load("img/background/space_dn.png");
      const up = new THREE.TextureLoader().load("img/background/space_ft.png");
      const dn = new THREE.TextureLoader().load("img/background/space_lf.png");
      const rt = new THREE.TextureLoader().load("img/background/space_rt.png");
      const lf = new THREE.TextureLoader().load("img/background/space_up.png");

      materialArray.push(new THREE.MeshBasicMaterial({map : ft})); 
      materialArray.push(new THREE.MeshBasicMaterial({map : bk}));
      materialArray.push(new THREE.MeshBasicMaterial({map : up}));
      materialArray.push(new THREE.MeshBasicMaterial({map : dn}));
      materialArray.push(new THREE.MeshBasicMaterial({map : rt}));
      materialArray.push(new THREE.MeshBasicMaterial({map : lf}));     

      for (let i = 0; i<6; i++){
        materialArray[i].side = THREE.BackSide; 
      }

      const skyBoxGeo = new THREE.BoxGeometry(700, 700, 700);
      const skyBox = new THREE.Mesh(skyBoxGeo, materialArray);
      return skyBox; 
    }
    
}
