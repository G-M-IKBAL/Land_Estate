// import React, { Component } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { useNavigate } from 'react-router-dom';
// // import { CanvasRenderer } from 'three/examples/jsm/renderers/CanvasRenderer';
// import './model.css'


// // Setting the length and width to a fixed size
// ///////////////////////////////////////////////
// // Get the geometry of the model mesh
// // const geometry = gltf.scene.children[0].geometry;
// // // Get the vertex positions of the geometry
// // geometry.computeBoundingBox();
// // const { min, max } = geometry.boundingBox;

// // // Calculate the width of the model
// // const originalWidth = max.x - min.x;

// // const desiredWidth = 200; // desired width of the model
// // const scalingFactor = desiredWidth / originalWidth;

// // object1.scale.set(scalingFactor, 1, 1)
// ///////////////////////////////////////////////

// class Model extends Component {


//     plot_data = {}

//     // plot_data = {
//     //     length: 300,
//     //     width: 300,
//     //     houses: [
//     //         // Left Lane
//     //         {
//     //             x: -130,
//     //             y: 130,
//     //             size: 20,
//     //             face: Math.PI / 2
//     //         },
//     //         {
//     //             x: -130,
//     //             y: 100,
//     //             size: 20,
//     //             face: Math.PI / 2
//     //         },
//     //         {
//     //             x: -130,
//     //             y: 70,
//     //             size: 20,
//     //             face: Math.PI / 2
//     //         },
//     //         {
//     //             x: -130,
//     //             y: 40,
//     //             size: 20,
//     //             face: Math.PI / 2
//     //         },
//     //         {
//     //             x: -130,
//     //             y: 10,
//     //             size: 20,
//     //             face: Math.PI / 2
//     //         },
//     //         // Right Lane
//     //         {
//     //             x: 130,
//     //             y: 130,
//     //             size: 20,
//     //             face: -Math.PI / 2
//     //         },
//     //         {
//     //             x: 130,
//     //             y: 100,
//     //             size: 20,
//     //             face: -Math.PI / 2
//     //         },
//     //         {
//     //             x: 130,
//     //             y: 70,
//     //             size: 20,
//     //             face: -Math.PI / 2
//     //         },
//     //         {
//     //             x: 130,
//     //             y: 40,
//     //             size: 20,
//     //             face: -Math.PI / 2
//     //         },
//     //         {
//     //             x: 130,
//     //             y: 10,
//     //             size: 20,
//     //             face: -Math.PI / 2
//     //         },
//     //         // House above on ground left side
//     //         {
//     //             x: -30,
//     //             y: -20,
//     //             size: 20,
//     //             face: -Math.PI / 2
//     //         },
//     //         {
//     //             x: -30,
//     //             y: -50,
//     //             size: 20,
//     //             face: -Math.PI / 2
//     //         },
//     //         // House above on ground Right side
//     //         {
//     //             x: 40,
//     //             y: -20,
//     //             size: 20,
//     //             face: Math.PI / 2
//     //         },
//     //         {
//     //             x: 40,
//     //             y: -50,
//     //             size: 20,
//     //             face: Math.PI / 2
//     //         },
//     //         {
//     //             x: -130,
//     //             y: -50,
//     //             size: 20,
//     //             face: Math.PI / 2
//     //         },
//     //         {
//     //             x: -130,
//     //             y: -80,
//     //             size: 20,
//     //             face: Math.PI / 2
//     //         },
//     //         {
//     //             x: -130,
//     //             y: -110,
//     //             size: 20,
//     //             face: Math.PI / 2
//     //         },
//     //         // Upper Lane
//     //         {
//     //             x: -50,
//     //             y: -120,
//     //             size: 20,
//     //             face: 0
//     //         },
//     //         {
//     //             x: -20,
//     //             y: -120,
//     //             size: 20,
//     //             face: 0
//     //         },
//     //         {
//     //             x: 10,
//     //             y: -120,
//     //             size: 20,
//     //             face: 0
//     //         },
//     //         {
//     //             x: 40,
//     //             y: -120,
//     //             size: 20,
//     //             face: 0
//     //         },
//     //     ],
//     //     park: {
//     //         x: 5,
//     //         y: 40,
//     //         size: 60
//     //     },
//     //     hospital: {
//     //         x: 120,
//     //         y: -120,
//     //         size: 60
//     //     }
//     // }

//     getScalingFactor(min, max, desiredWidth) {
//         // Calculate the width of the model
//         const originalWidth = max.x - min.x;
//         // const desiredWidth = 200; // desired width of the model
//         const scalingFactor = desiredWidth / originalWidth;
//         return scalingFactor
//     }
//     async componentDidMount() {

//         const searchParams = new URLSearchParams(window.location.search);
//         const townid = searchParams.get('id');

//         const resM = await fetch('http://localhost:8080/getMap', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 "townid": townid
//             })
//         })

//         const dataM = await resM.json()
//         this.plot_data = dataM[0]

//         // .then((result) => {
//         //     console.log(result);
//         //     result.json().then((jsData) => {
//         //         console.log(jsData);
//         //         this.plot_data = jsData[0]
//         //     })
//         // })


//         this.scene = new THREE.Scene();

//         this.renderer = new THREE.WebGLRenderer({ alpha: true });
//         // this.renderer = new CanvasRenderer( { alpha: true }); // gradient
//         this.renderer.setSize(window.innerWidth, window.innerHeight);
//         this.mount.appendChild(this.renderer.domElement);

//         this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         this.camera.position.set(0, 200, 5);
//         this.camera.rotateX(-Math.PI / 2)
//         this.camera.lookAt(0, 200, 0);

//         // initialize the keyboard state
//         this.keyboard = {};


//         // add the animate function to the requestAnimationFrame loop
//         this.animationId = requestAnimationFrame(this.animate);

//         // add event listeners for keyboard input
//         document.addEventListener('keydown', event => {
//             this.keyboard[event.key] = true;
//         });
//         document.addEventListener('keyup', event => {
//             this.keyboard[event.key] = false;
//         });

//         // this.camera.position.y = 70;
//         // this.camera.position.z = 5;
//         // this.camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
//         // this.camera.lookAt(new THREE.Vector3(5, 0, 5));





//         // // Creating Cube Geometry and Material
//         // var geometry = new THREE.BoxGeometry(1, 1, 1);
//         // var material = new THREE.MeshBasicMaterial({
//         //     color: 0x00ff00
//         // });
//         // this.cube = new THREE.Mesh(geometry, material);
//         // ////////////

//         // Loading the land - with mesh technique
//         const geometry = new THREE.PlaneGeometry(this.plot_data.width, this.plot_data.length, 10, 10);
//         const texture = new THREE.TextureLoader().load(process.env.PUBLIC_URL + '/texture.png');
//         const material = new THREE.MeshBasicMaterial({ map: texture });
//         const mesh = new THREE.Mesh(geometry, material);
//         mesh.position.set(0, 0, 0)
//         mesh.rotateX(-Math.PI / 2)
//         this.scene.add(mesh);

//         // Create the geometry for the road
//         const roadWidth = 60; // Width of the road in meters
//         const roadLength = 310; // Length of the road in meters
//         const roadGeometry = new THREE.PlaneGeometry(roadWidth, roadLength, 1, 1);

//         // Apply a texture to the road surface
//         const textureLoader = new THREE.TextureLoader();
//         const roadTexture = textureLoader.load('Road.png');
//         const roadMaterial = new THREE.MeshBasicMaterial({ map: roadTexture });
//         // Create a mesh for the road and add it to the scene
//         const roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
//         roadMesh.position.set(-70, 1, 140);
//         roadMesh.rotation.x = -Math.PI / 2; // Rotate the mesh to lie flat on the ground
//         this.scene.add(roadMesh);

//         const roadLeft = roadMesh.clone()
//         roadLeft.rotateZ(-Math.PI / 2)
//         roadLeft.position.set(0, 2, -20)
//         roadLeft.scale.set(0.5, 1.8, 1)
//         this.scene.add(roadLeft)

//         const roadMiddle2 = roadMesh.clone()
//         roadMiddle2.rotateZ(-Math.PI / 2)
//         roadMiddle2.position.set(0, 2, -95)
//         roadMiddle2.scale.set(0.5, 1.8, 1)
//         this.scene.add(roadMiddle2)

//         const roadMiddle3 = roadMesh.clone()
//         roadMiddle3.rotateZ(-Math.PI / 2)
//         roadMiddle3.position.set(0, 2, -190)
//         roadMiddle3.scale.set(1, 1.8, 1)
//         this.scene.add(roadMiddle3)

//         const roadCenter = roadMesh.clone()
//         roadCenter.position.set(0, 3, -95)
//         roadCenter.scale.set(0.5, 0.5, 1)
//         this.scene.add(roadCenter)

//         // const roadMiddle = roadMesh.clone()
//         // roadMiddle.rotateZ(-Math.PI / 2)
//         // roadMiddle.position.set(-122, 2, -20)
//         // roadMiddle.scale.set(1, 0.22, 1)
//         // this.scene.add(roadMiddle)

//         // const roadConnector = roadMesh.clone()
//         // roadConnector.rotateZ(-Math.PI / 2)
//         // roadConnector.position.set(5, 2, -85)
//         // roadConnector.scale.set(1, 0.57, 1)
//         // this.scene.add(roadConnector)






//         // // Loading Land
//         // const loader = new GLTFLoader();
//         // loader.load(process.env.PUBLIC_URL + '/Tile.glb', (gltf) => {
//         //     gltf.scene.scale.set(50,50,50)
//         //     gltf.scene.position.set(0, 0, 0)
//         //     this.scene.add(gltf.scene);

//         // }, function (xhr) {
//         //     console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//         // },
//         //     function (error) {
//         //         console.log('Error has Occuered');
//         //         console.error(error);
//         //     });
//         // ////////
//         var materialH = new THREE.MeshStandardMaterial({ color: 0xff0000 });
//         // Loading House
//         const loader1 = new GLTFLoader();




//         loader1.load(process.env.PUBLIC_URL + '/modernHouse.glb', (gltf) => {
//             // console.log(this.plot_data);

//             // Create a container for the shared geometry and material
//             // gltf.scene.children[0].rotateX(-Math.PI / 2)
//             // gltf.scene.children[0].scale.set(3, 1, 3)
//             const geometryHouse = gltf.scene.children[0].geometry;
//             // Get the vertex positions of the geometry
//             geometryHouse.computeBoundingBox();
//             const { min, max } = geometryHouse.boundingBox;
//             // Traverse through the model's children
//             // gltf.scene.traverse(function (child) {
//             //     if (child.isMesh) {
//             //         // Set the new material to each mesh in the model
//             //         child.material = materialH;
//             //     }
//             // });

//             const container = new THREE.Object3D();
//             container.add(gltf.scene.children[0].clone());


//             // Create multiple instances of the container
//             for (let i = 0; i < this.plot_data.houses.length; i++) {
//                 const object1 = container.clone();
//                 // Setting the Position of House
//                 object1.position.set(this.plot_data.houses[i].x, 0, this.plot_data.houses[i].y)
//                 // Setting the Size of the House
//                 // object1.scale.set(this.getScalingFactor(min, max, this.plot_data.houses[i].size), 1, this.getScalingFactor(min, max, this.plot_data.houses[i].size))
//                 // Face the object to the desired facing Location
//                 object1.rotateY(this.plot_data.houses[i].face)
//                 this.scene.add(object1);
//             }

//         }, function (xhr) {
//             console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//         },
//             function (error) {
//                 console.log('Error has Occuered');
//                 console.error(error);
//             });
//         ////////

//         // // Loading Park
//         // const loader2 = new GLTFLoader();
//         // loader2.load(process.env.PUBLIC_URL + '/Park.glb', (gltf) => {
//         //     // Create a container for the shared geometry and material
//         //     gltf.scene.scale.set(10, 10, 10)
//         //     const geometryPark = gltf.scene.children[0].geometry;
//         //     // Get the vertex positions of the geometry
//         //     geometryPark.computeBoundingBox();
//         //     const { minPark, maxPark } = geometryPark.boundingBox;

//         //     const containerPark = new THREE.Object3D();
//         //     containerPark.add(gltf.scene.clone());

//         //     containerPark.position.set(this.plot_data.park.x, 28, this.plot_data.park.y)
//         //     // containerPark.scale.set(5, 5, 5)
//         //     // containerPark.scale.set(this.getScalingFactor(minPark, maxPark, this.plot_data.park.size), this.getScalingFactor(minPark, maxPark, this.plot_data.park.size), this.getScalingFactor(minPark, maxPark, this.plot_data.park.size))
//         //     this.scene.add(containerPark)
//         //     // Create multiple instances of the container
//         //     // for (let i = 0; i < this.plot_data.houses.length; i++) {
//         //     //     const object1 = container.clone();
//         //     //     // Setting the Position of House
//         //     //     object1.position.set(this.plot_data.houses[i].x, 0, this.plot_data.houses[i].y)
//         //     //     // Setting the Size of the House
//         //     //     object1.scale.set(this.getScalingFactor(min, max, this.plot_data.houses[i].size), 1, this.getScalingFactor(min, max, this.plot_data.houses[i].size))
//         //     //     // Face the object to the desired facing Location
//         //     //     object1.rotateY(this.plot_data.houses[i].face)
//         //     //     this.scene.add(object1);
//         //     // }

//         // }, function (xhr) {
//         //     console.log((xhr.loaded / xhr.total * 100) + '% Park loaded');
//         // },
//         //     function (error) {
//         //         console.log('Error has Occuered while loading Park');
//         //         console.error(error);
//         //     });
//         // ////////

//         // // Loading Park
//         // const loader3 = new GLTFLoader();
//         // loader3.load(process.env.PUBLIC_URL + '/Hospital.glb', (gltf) => {
//         //     // Create a container for the shared geometry and material
//         //     gltf.scene.scale.set(0.1, 0.1, 0.1)
//         //     gltf.scene.rotateY(3 * Math.PI / 2)
//         //     const geometryHospital = gltf.scene.children[0].geometry;
//         //     // Get the vertex positions of the geometry
//         //     geometryHospital.computeBoundingBox();
//         //     const { minPark, maxPark } = geometryHospital.boundingBox;

//         //     const containerHospital = new THREE.Object3D();
//         //     containerHospital.add(gltf.scene.clone());

//         //     containerHospital.position.set(this.plot_data.hospital.x, 10, this.plot_data.hospital.y)
//         //     // containerPark.scale.set(5, 5, 5)
//         //     // containerPark.scale.set(this.getScalingFactor(minPark, maxPark, this.plot_data.park.size), this.getScalingFactor(minPark, maxPark, this.plot_data.park.size), this.getScalingFactor(minPark, maxPark, this.plot_data.park.size))
//         //     this.scene.add(containerHospital)
//         //     // Create multiple instances of the container
//         //     // for (let i = 0; i < this.plot_data.houses.length; i++) {
//         //     //     const object1 = container.clone();
//         //     //     // Setting the Position of House
//         //     //     object1.position.set(this.plot_data.houses[i].x, 0, this.plot_data.houses[i].y)
//         //     //     // Setting the Size of the House
//         //     //     object1.scale.set(this.getScalingFactor(min, max, this.plot_data.houses[i].size), 1, this.getScalingFactor(min, max, this.plot_data.houses[i].size))
//         //     //     // Face the object to the desired facing Location
//         //     //     object1.rotateY(this.plot_data.houses[i].face)
//         //     //     this.scene.add(object1);
//         //     // }

//         // }, function (xhr) {
//         //     console.log((xhr.loaded / xhr.total * 100) + '% Hospital loaded');
//         // },
//         //     function (error) {
//         //         console.log('Error has Occuered while loading Hospital');
//         //         console.error(error);
//         //     });
//         // ////////

//         this.pointLight = new THREE.AmbientLight(0xffffff, 2);

//         // Set up the OrbitControls
//         this.controls = new OrbitControls(this.camera, this.renderer.domElement);
//         this.controls.target.set(0, 0, 0);

//         this.controls.enableDamping = true;
//         this.controls.dampingFactor = 0.5;
//         this.controls.rotateSpeed = 0.5;

//         // set the minimum and maximum values for the rotation angles
//         const minPolarAngle = 20 * Math.PI / 180; // 45 degrees
//         const maxPolarAngle = 85 * Math.PI / 180; // 90 degrees
//         this.controls.minPolarAngle = minPolarAngle;
//         this.controls.maxPolarAngle = maxPolarAngle;

//         // const minAzimuthAngle = -Math.PI / 4; // -45 degrees
//         // const maxAzimuthAngle = Math.PI / 4; // 45 degrees
//         // this.controls.minAzimuthAngle = minAzimuthAngle;
//         // this.controls.maxAzimuthAngle = maxAzimuthAngle;
//         this.controls.update();

//         // this.scene.add(this.cube);
//         this.scene.add(this.pointLight);
//         this.scene.add(this.camera);
        

//         this.animation();

//         this.renderer.render(this.scene, this.camera);

//         window.addEventListener("resize", this.handleWindowResize);
//     }

//     animate = () => {
//         // request another animation frame and bind the animate function to the component instance
//         this.animationId = requestAnimationFrame(this.animate);

//         // move the camera based on the keys pressed
//         const speed = 5;
//         const angularSpeed = THREE.MathUtils.degToRad(1);
//         if (this.keyboard['w']) this.camera.position.add(this.camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(speed));
//         if (this.keyboard['s']) this.camera.position.add(this.camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(-speed));
//         if (this.keyboard['a']) this.camera.position.add(this.camera.getWorldDirection(new THREE.Vector3()).cross(new THREE.Vector3(0, 1, 0)).multiplyScalar(-speed));
//         if (this.keyboard['d']) this.camera.position.add(this.camera.getWorldDirection(new THREE.Vector3()).cross(new THREE.Vector3(0, 1, 0)).multiplyScalar(speed));
//         if (this.keyboard['q']) this.camera.rotateZ(angularSpeed);
//         if (this.keyboard['e']) this.camera.rotateZ(-angularSpeed);

//         // render the scene using the camera and renderer
//         this.renderer.render(this.scene, this.camera);
//     }

//     animation = () => {
//         requestAnimationFrame(this.animation);
//         this.renderer.render(this.scene, this.camera);
//     }

//     handleWindowResize = () => {
//         this.camera.aspect = window.innerWidth / window.innerHeight;
//         this.camera.updateProjectionMatrix();

//         this.renderer.setSize(window.innerWidth, window.innerHeight);
//         this.renderer.render(this.scene, this.camera);
//     }
//     render() {
//         return (
//             <div className="preview"
//                 ref={mount => {
//                     this.mount = mount;
//                 }}
//             />
//         )
//     }
// }

// export default Model