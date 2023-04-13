import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useNavigate } from 'react-router-dom';
// import { CanvasRenderer } from 'three/examples/jsm/renderers/CanvasRenderer';
import './model.css'


// Setting the length and width to a fixed size
///////////////////////////////////////////////
// Get the geometry of the model mesh
// const geometry = gltf.scene.children[0].geometry;
// // Get the vertex positions of the geometry
// geometry.computeBoundingBox();
// const { min, max } = geometry.boundingBox;

// // Calculate the width of the model
// const originalWidth = max.x - min.x;

// const desiredWidth = 200; // desired width of the model
// const scalingFactor = desiredWidth / originalWidth;

// object1.scale.set(scalingFactor, 1, 1)
///////////////////////////////////////////////

class Model extends Component {


    plot_data = {}

    // plot_data = {
    //     length: 300,
    //     width: 300,
    //     houses: [
    //         // Left Lane
    //         {
    //             x: -130,
    //             y: 130,
    //             size: 20,
    //             face: Math.PI / 2
    //         },
    //         {
    //             x: -130,
    //             y: 100,
    //             size: 20,
    //             face: Math.PI / 2
    //         },
    //         {
    //             x: -130,
    //             y: 70,
    //             size: 20,
    //             face: Math.PI / 2
    //         },
    //         {
    //             x: -130,
    //             y: 40,
    //             size: 20,
    //             face: Math.PI / 2
    //         },
    //         {
    //             x: -130,
    //             y: 10,
    //             size: 20,
    //             face: Math.PI / 2
    //         },
    //         // Right Lane
    //         {
    //             x: 130,
    //             y: 130,
    //             size: 20,
    //             face: -Math.PI / 2
    //         },
    //         {
    //             x: 130,
    //             y: 100,
    //             size: 20,
    //             face: -Math.PI / 2
    //         },
    //         {
    //             x: 130,
    //             y: 70,
    //             size: 20,
    //             face: -Math.PI / 2
    //         },
    //         {
    //             x: 130,
    //             y: 40,
    //             size: 20,
    //             face: -Math.PI / 2
    //         },
    //         {
    //             x: 130,
    //             y: 10,
    //             size: 20,
    //             face: -Math.PI / 2
    //         },
    //         // House above on ground left side
    //         {
    //             x: -30,
    //             y: -20,
    //             size: 20,
    //             face: -Math.PI / 2
    //         },
    //         {
    //             x: -30,
    //             y: -50,
    //             size: 20,
    //             face: -Math.PI / 2
    //         },
    //         // House above on ground Right side
    //         {
    //             x: 40,
    //             y: -20,
    //             size: 20,
    //             face: Math.PI / 2
    //         },
    //         {
    //             x: 40,
    //             y: -50,
    //             size: 20,
    //             face: Math.PI / 2
    //         },
    //         {
    //             x: -130,
    //             y: -50,
    //             size: 20,
    //             face: Math.PI / 2
    //         },
    //         {
    //             x: -130,
    //             y: -80,
    //             size: 20,
    //             face: Math.PI / 2
    //         },
    //         {
    //             x: -130,
    //             y: -110,
    //             size: 20,
    //             face: Math.PI / 2
    //         },
    //         // Upper Lane
    //         {
    //             x: -50,
    //             y: -120,
    //             size: 20,
    //             face: 0
    //         },
    //         {
    //             x: -20,
    //             y: -120,
    //             size: 20,
    //             face: 0
    //         },
    //         {
    //             x: 10,
    //             y: -120,
    //             size: 20,
    //             face: 0
    //         },
    //         {
    //             x: 40,
    //             y: -120,
    //             size: 20,
    //             face: 0
    //         },
    //     ],
    //     park: {
    //         x: 5,
    //         y: 40,
    //         size: 60
    //     },
    //     hospital: {
    //         x: 120,
    //         y: -120,
    //         size: 60
    //     }
    // }

    getScalingFactorX(min, max, desiredWidth) {
        // Calculate the width of the model
        const originalWidth = max.x - min.x;
        // const desiredWidth = 200; // desired width of the model
        const scalingFactor = desiredWidth / originalWidth;
        return scalingFactor
    }
    getScalingFactorY(min, max, desiredWidth) {
        // Calculate the width of the model
        const originalWidth = max.y - min.y;
        // const desiredWidth = 200; // desired width of the model
        const scalingFactor = desiredWidth / originalWidth;
        return scalingFactor
    }
    async componentDidMount() {

        const searchParams = new URLSearchParams(window.location.search);
        const townid = searchParams.get('id');

        const resM = await fetch('http://localhost:8080/getMap', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "townid": townid
            })
        })

        const dataM = await resM.json()
        this.plot_data = dataM[0]

        console.log(dataM[0]);

        // .then((result) => {
        //     console.log(result);
        //     result.json().then((jsData) => {
        //         console.log(jsData);
        //         this.plot_data = jsData[0]
        //     })
        // })


        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        // this.renderer = new CanvasRenderer( { alpha: true }); // gradient
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.mount.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 200, 5);
        this.camera.rotateX(-Math.PI / 2)
        this.camera.lookAt(0, 200, 0);

        // initialize the keyboard state
        this.keyboard = {};


        // add the animate function to the requestAnimationFrame loop
        this.animationId = requestAnimationFrame(this.animate);

        // add event listeners for keyboard input
        document.addEventListener('keydown', event => {
            this.keyboard[event.key] = true;
        });
        document.addEventListener('keyup', event => {
            this.keyboard[event.key] = false;
        });

        // this.camera.position.y = 70;
        // this.camera.position.z = 5;
        // this.camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
        // this.camera.lookAt(new THREE.Vector3(5, 0, 5));





        // // Creating Cube Geometry and Material
        // var geometry = new THREE.BoxGeometry(1, 1, 1);
        // var material = new THREE.MeshBasicMaterial({
        //     color: 0x00ff00
        // });
        // this.cube = new THREE.Mesh(geometry, material);
        // ////////////

        // Loading the land - with mesh technique
        const geometry = new THREE.PlaneGeometry(this.plot_data.width, this.plot_data.length, 10, 10);
        const texture = new THREE.TextureLoader().load(process.env.PUBLIC_URL + '/roadTexture.jpg');
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, 0)
        mesh.rotateX(-Math.PI / 2)
        this.scene.add(mesh);

        // // Create the geometry for the road
        // const roadWidth = 60; // Width of the road in meters
        // const roadLength = 310; // Length of the road in meters
        // const roadGeometry = new THREE.PlaneGeometry(roadWidth, roadLength, 1, 1);

        // // Apply a texture to the road surface
        // const textureLoader = new THREE.TextureLoader();
        // const roadTexture = textureLoader.load('Road.png');
        // const roadMaterial = new THREE.MeshBasicMaterial({ map: roadTexture });
        // // Create a mesh for the road and add it to the scene
        // const roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
        // roadMesh.position.set(-70, 1, 140);
        // roadMesh.rotation.x = -Math.PI / 2; // Rotate the mesh to lie flat on the ground
        // this.scene.add(roadMesh);

        // const roadLeft = roadMesh.clone()
        // roadLeft.rotateZ(-Math.PI / 2)
        // roadLeft.position.set(0, 2, -20)
        // roadLeft.scale.set(0.5, 1.8, 1)
        // this.scene.add(roadLeft)

        // const roadMiddle2 = roadMesh.clone()
        // roadMiddle2.rotateZ(-Math.PI / 2)
        // roadMiddle2.position.set(0, 2, -95)
        // roadMiddle2.scale.set(0.5, 1.8, 1)
        // this.scene.add(roadMiddle2)

        // const roadMiddle3 = roadMesh.clone()
        // roadMiddle3.rotateZ(-Math.PI / 2)
        // roadMiddle3.position.set(0, 2, -190)
        // roadMiddle3.scale.set(1, 1.8, 1)
        // this.scene.add(roadMiddle3)

        // const roadCenter = roadMesh.clone()
        // roadCenter.position.set(0, 3, -95)
        // roadCenter.scale.set(0.5, 0.5, 1)
        // this.scene.add(roadCenter)

        // const roadMiddle = roadMesh.clone()
        // roadMiddle.rotateZ(-Math.PI / 2)
        // roadMiddle.position.set(-122, 2, -20)
        // roadMiddle.scale.set(1, 0.22, 1)
        // this.scene.add(roadMiddle)

        // const roadConnector = roadMesh.clone()
        // roadConnector.rotateZ(-Math.PI / 2)
        // roadConnector.position.set(5, 2, -85)
        // roadConnector.scale.set(1, 0.57, 1)
        // this.scene.add(roadConnector)






        // // Loading Land
        // const loader = new GLTFLoader();
        // loader.load(process.env.PUBLIC_URL + '/Tile.glb', (gltf) => {
        //     gltf.scene.scale.set(50,50,50)
        //     gltf.scene.position.set(0, 0, 0)
        //     this.scene.add(gltf.scene);

        // }, function (xhr) {
        //     console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        // },
        //     function (error) {
        //         console.log('Error has Occuered');
        //         console.error(error);
        //     });
        // ////////
        var materialH = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        // Loading House
        const loader1 = new GLTFLoader();

        // async function loadHouses(){
        //     try {
        //         const glft = loader1.load(process.env.PUBLIC_URL + '/modernHouse.glb')
        //         const glft = loader1.load(process.env.PUBLIC_URL + '/texture.glb')
        //     }
        //     catch(error) {
        //         console.log(error);
        //     }
        // }






        const geometryHGround = new THREE.PlaneGeometry(50, 50, 10, 10);
        const textureHGround = new THREE.TextureLoader().load(process.env.PUBLIC_URL + '/texture.png');
        const materialHGround = new THREE.MeshBasicMaterial({ map: textureHGround });
        const meshHGround = new THREE.Mesh(geometryHGround, materialHGround);
        meshHGround.position.set(0, 1, 0)
        meshHGround.rotateX(-Math.PI / 2)





        loader1.load(process.env.PUBLIC_URL + '/modernHouse.glb', (gltf) => {
            // console.log(this.plot_data);

            // Create a container for the shared geometry and material
            // gltf.scene.children[0].rotateX(-Math.PI / 2)
            // gltf.scene.children[0].scale.set(3, 1, 3)
            // const geometryHouse = gltf.scene.children[0];
            // var currentLength = geometryHouse.geometry.parameters.

            const box = new THREE.Box3().setFromObject(gltf.scene);
            var box2 = new THREE.Box3().setFromObject(meshHGround);
            const size = box.getSize(new THREE.Vector3());
            const size2 = box2.getSize(new THREE.Vector3());
            var scaleFactor = size2.length() / size.length()


            const container = new THREE.Object3D();
            container.add(gltf.scene.children[0].clone());

            const grassPatch = new THREE.Object3D();
            grassPatch.add(meshHGround.clone())

            // Create multiple instances of the container
            for (let i = 0; i < this.plot_data.houses.length; i++) {
                const object1 = container.clone();
                const object2 = grassPatch.clone();
                // Setting the Position of House
                object1.position.set(this.plot_data.houses[i].x, 2, this.plot_data.houses[i].y)
                object2.position.set(this.plot_data.houses[i].x, 0, this.plot_data.houses[i].y)
                // Setting the Size of the House
                // object1.scale.set(this.getScalingFactorX(min, max, this.plot_data.houses[i].height - 10), 1, this.getScalingFactorY(min, max, this.plot_data.houses[i].width - 10))
                object1.scale.set((this.plot_data.houses[i].height - 10) / size.x, 1, (this.plot_data.houses[i].width - 10) / size.z)
                object2.scale.set((this.plot_data.houses[i].height) / 50, (this.plot_data.houses[i].width) / 50, (this.plot_data.houses[i].width) / 50)
                object2.scale.set(scaleFactor, scaleFactor, scaleFactor)
                // Face the object to the desired facing Location
                object1.rotateY(this.plot_data.houses[i].face)
                this.scene.add(object1);
                this.scene.add(object2);
            }
            // Get the vertex positions of the geometry
            // geometryHouse.computeBoundingBox();
            // const { min, max } = geometryHouse.boundingBox;
            // Traverse through the model's children
            // gltf.scene.traverse(function (child) {
            //     if (child.isMesh) {
            //         // Set the new material to each mesh in the model
            //         child.material = materialH;
            //     }
            // });



        }, function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
            function (error) {
                console.log('Error has Occuered');
                console.error(error);
            });
        ////////


        // Loading Park
        if (this.plot_data.park.length > 0) {
            const loader2 = new GLTFLoader();
            loader2.load(process.env.PUBLIC_URL + '/Park.glb', (gltf) => {
                // Create a container for the shared geometry and material
                gltf.scene.scale.set(10, 10, 10)
                const box = new THREE.Box3().setFromObject(gltf.scene);
                const size = box.getSize(new THREE.Vector3());

                const containerPark = new THREE.Object3D();
                containerPark.add(gltf.scene.clone());

                for (let i = 0; i < this.plot_data.park.length; i++) {
                    const object1 = containerPark.clone();
                    // Setting the Position of House
                    object1.position.set(this.plot_data.park[i].x, 30, this.plot_data.park[i].y)
                    // Setting the Size of the House
                    object1.scale.set((this.plot_data.park[i].height - 10) / size.x, 1, (this.plot_data.park[i].width - 10) / size.z)
                    // Face the object to the desired facing Location
                    this.scene.add(object1);
                }

            }, function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% Park loaded');
            },
                function (error) {
                    console.log('Error has Occuered while loading Park');
                    console.error(error);
                });

        }
        //////////

        // Loading Hospital
        if (this.plot_data.hospital.length > 0) {
            const loader3 = new GLTFLoader();
            loader3.load(process.env.PUBLIC_URL + '/Hospital.glb', (gltf) => {
                // Create a container for the shared geometry and material
                // gltf.scene.scale.set(0.1, 0.1, 0.1)
                gltf.scene.rotateY(3 * Math.PI / 2)
                const box = new THREE.Box3().setFromObject(gltf.scene);
                const size = box.getSize(new THREE.Vector3());

                const containerHospital = new THREE.Object3D();
                containerHospital.add(gltf.scene.clone());

                for (let i = 0; i < this.plot_data.hospital.length; i++) {
                    const object1 = containerHospital.clone();
                    // Setting the Position of House
                    object1.position.set(this.plot_data.hospital[i].x, 30, this.plot_data.hospital[i].y)
                    // Setting the Size of the House
                    object1.scale.set((this.plot_data.hospital[i].height - 10) / size.x, 0.3, (this.plot_data.hospital[i].width - 10) / size.z)
                    // Face the object to the desired facing Location
                    this.scene.add(object1);
                }

            }, function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% Hospital loaded');
            },
                function (error) {
                    console.log('Error has Occuered while loading Hospital');
                    console.error(error);
                });

        }
        //////

        // Loading School
        if (this.plot_data.school.length > 0) {
            const loader3 = new GLTFLoader();
            loader3.load(process.env.PUBLIC_URL + '/School.glb', (gltf) => {
                // Create a container for the shared geometry and material
                gltf.scene.scale.set(1, 70, 1)
                // gltf.scene.rotateY(3 * Math.PI / 2)
                const box = new THREE.Box3().setFromObject(gltf.scene);
                const size = box.getSize(new THREE.Vector3());

                const containerSchool = new THREE.Object3D();
                containerSchool.add(gltf.scene.clone());

                for (let i = 0; i < this.plot_data.school.length; i++) {
                    const object1 = containerSchool.clone();
                    // Setting the Position of House
                    object1.position.set(this.plot_data.school[i].x, 5, this.plot_data.school[i].y)
                    // Setting the Size of the House
                    object1.scale.set((this.plot_data.school[i].height - 10) / size.x, 1, (this.plot_data.school[i].width - 10) / size.z)
                    // Face the object to the desired facing Location
                    this.scene.add(object1);
                }

            }, function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% School loaded');
            },
                function (error) {
                    console.log('Error has Occuered while loading School');
                    console.error(error);
                });

        }
        //////

        // Loading Mosque
        if (this.plot_data.mosque.length > 0) {
            const loader3 = new GLTFLoader();
            loader3.load(process.env.PUBLIC_URL + '/School.glb', (gltf) => {
                // Create a container for the shared geometry and material
                gltf.scene.scale.set(1, 20, 1)
                // gltf.scene.rotateY(3 * Math.PI / 2)
                const box = new THREE.Box3().setFromObject(gltf.scene);
                const size = box.getSize(new THREE.Vector3());

                const containerMosque = new THREE.Object3D();
                containerMosque.add(gltf.scene.clone());

                for (let i = 0; i < this.plot_data.mosque.length; i++) {
                    const object1 = containerMosque.clone();
                    // Setting the Position of House
                    object1.position.set(this.plot_data.mosque[i].x, 5, this.plot_data.mosque[i].y)
                    // Setting the Size of the House
                    object1.scale.set((this.plot_data.mosque[i].height - 10) / size.x, 1, (this.plot_data.mosque[i].width - 10) / size.z)
                    // Face the object to the desired facing Location
                    this.scene.add(object1);
                }

            }, function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% School loaded');
            },
                function (error) {
                    console.log('Error has Occuered while loading School');
                    console.error(error);
                });

        }

        /////////

        this.pointLight = new THREE.AmbientLight(0xffffff, 2);
        // Set up the OrbitControls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 0, 0);

        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.5;
        this.controls.rotateSpeed = 0.5;

        // set the minimum and maximum values for the rotation angles
        const minPolarAngle = 20 * Math.PI / 180; // 45 degrees
        const maxPolarAngle = 85 * Math.PI / 180; // 90 degrees
        this.controls.minPolarAngle = minPolarAngle;
        this.controls.maxPolarAngle = maxPolarAngle;

        // const minAzimuthAngle = -Math.PI / 4; // -45 degrees
        // const maxAzimuthAngle = Math.PI / 4; // 45 degrees
        // this.controls.minAzimuthAngle = minAzimuthAngle;
        // this.controls.maxAzimuthAngle = maxAzimuthAngle;
        this.controls.update();

        // this.scene.add(this.cube);
        this.scene.add(this.pointLight);
        this.scene.add(this.camera);


        this.animation();

        this.renderer.render(this.scene, this.camera);

        window.addEventListener("resize", this.handleWindowResize);
    }

    animate = () => {
        // request another animation frame and bind the animate function to the component instance
        this.animationId = requestAnimationFrame(this.animate);

        // move the camera based on the keys pressed
        const speed = 5;
        const angularSpeed = THREE.MathUtils.degToRad(1);
        if (this.keyboard['w']) this.camera.position.add(this.camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(speed));
        if (this.keyboard['s']) this.camera.position.add(this.camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(-speed));
        if (this.keyboard['a']) this.camera.position.add(this.camera.getWorldDirection(new THREE.Vector3()).cross(new THREE.Vector3(0, 1, 0)).multiplyScalar(-speed));
        if (this.keyboard['d']) this.camera.position.add(this.camera.getWorldDirection(new THREE.Vector3()).cross(new THREE.Vector3(0, 1, 0)).multiplyScalar(speed));
        if (this.keyboard['q']) this.camera.rotateZ(angularSpeed);
        if (this.keyboard['e']) this.camera.rotateZ(-angularSpeed);

        // render the scene using the camera and renderer
        this.renderer.render(this.scene, this.camera);
    }

    animation = () => {
        requestAnimationFrame(this.animation);
        this.renderer.render(this.scene, this.camera);
    }

    handleWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
    }
    render() {
        return (
            <div className="preview"
                ref={mount => {
                    this.mount = mount;
                }}
            />
        )
    }
}

export default Model