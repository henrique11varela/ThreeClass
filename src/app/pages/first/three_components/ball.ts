import * as THREE from "three";

export const geometry: THREE.SphereGeometry = new THREE.SphereGeometry()

export const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
    color: '#0000ff',
})

export const ball = () => new THREE.Mesh(geometry, material)

export default ball