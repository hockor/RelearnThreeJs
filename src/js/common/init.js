/**
 * Created by hztangzhao on 2019-04-19.
 */

window.scene = null

class InitThreeJS {

  initScene () {
    this.scene = new THREE.Scene()
    window.scene = this.scene
  }

  initCamera () {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(-30, 30, 30)
    this.camera.lookAt(this.scene.position)
  }

  initRender () {
    this.render = new THREE.WebGLRenderer()
    this.render.setClearColor(0xFFFE3A)
    this.render.setSize(window.innerWidth, window.innerHeight)

    // this.render.shadowMapEnabled = true
    let axes = new THREE.AxesHelper(20)
    this.scene.add(axes)

    this.render.shadowMap.enabled = true
    this.render.shadowMap.type = THREE.PCFSoftShadowMap
    document.getElementById('app').appendChild(this.render.domElement)
    this.render.render(this.scene, this.camera)
  }

  initLight () {
    const spotLight = new THREE.SpotLight(0xffffff, 1)
    spotLight.position.set(15, 40, 35)
    spotLight.angle = Math.PI / 4
    spotLight.penumbra = 0.05
    spotLight.decay = 2
    spotLight.distance = 200
    spotLight.castShadow = true
    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024
    spotLight.shadow.camera.near = 10
    spotLight.shadow.camera.far = 200
    this.scene.add(spotLight)
  }

  initPlane () {
    let planeGeometry = new THREE.PlaneGeometry(600, 420, 1, 1)
    let planeMaterial = new THREE.MeshBasicMaterial({
      color: '#3fd4d2'
    })
    let plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0

    plane.reciveShadow = true
    this.scene.add(plane)
  }

  initCube () {
    let cubeGeometry = new THREE.BoxGeometry(4, 8, 4)
    let cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xff0000
    })
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    this.cube.position.x = 0
    this.cube.position.y = 5
    this.cube.position.z = 0
    this.cube.castShadow = true
    this.scene.add(this.cube)
  }

  animate () {
    this.cube.rotation.y += 0.01
    this.render.render(this.scene, this.camera)
    requestAnimationFrame(this.animate.bind(this))
  }

  init () {
    this.initScene()
    this.initCamera()
    this.initPlane()
    this.initCube()
    this.initRender()

    this.animate()
    this.initLight()

  }
}

export default InitThreeJS
