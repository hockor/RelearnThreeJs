/**
 * Created by hztangzhao on 2019/11/8.
 */

const model_url = require('../../img/logo-xy.obj')
require('../lib/OBJLoader')
window.scene = null

window.flag = true

class InitThreeJS {

  initScene () {
    this.model = null
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog(0xa0a0a0, 50, 100)
    window.scene = this.scene
  }

  initCamera () {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(-30, 30, 30)
    this.camera.lookAt(this.scene.position)
  }

  initRender () {
    this.render = new THREE.WebGLRenderer({antialias: true})
    this.render.setClearColor(0xFFFFFF)
    this.render.setSize(window.innerWidth, window.innerHeight)

    this.render.shadowMap.enabled = true
    let axes = new THREE.AxesHelper(20)
    this.scene.add(axes)

    this.render.shadowMap.enabled = true
    document.getElementById('app').appendChild(this.render.domElement)
    this.render.render(this.scene, this.camera)
    this.controls = new THREE.OrbitControls(this.camera, this.render.domElement)
    this.controls.update()
  }

  initLight () {
    const spotLight = new THREE.SpotLight('white', 1)
    spotLight.position.set(15, 40, 35)
    spotLight.angle = Math.PI / 4
    spotLight.penumbra = 0.05
    spotLight.decay = 2
    spotLight.distance = 1000
    spotLight.receiveShadow = true
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
      color: '#4ed4ba'
    })
    let plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0
    plane.name = 'plane'
    plane.reciveShadow = true
    this.scene.add(plane)
  }

  initModel () {
    const objLoader = new THREE.OBJLoader()
    const modelMaterial = new THREE.MeshPhongMaterial({
      // wireframe: true,
      color: '#f2490b'
      // specular: 'white',
      // flatShading: true
    })
    // objLoader.setMaterials(materials)
    objLoader.load(model_url, (object) => {

      object.traverse(function (child) {
        if ( child.isMesh ) {
          child.material = modelMaterial
          child.name = 'model'
          child.castShadow = true
          child.receiveShadow = true
        }

      })

      object.position.set(0, 1, 0)
      object.scale.set(0.03, 0.03, 0.03)
      object.name = 'leihuo'
      this.model = object
      this.scene.add(this.model)
    })
  }

  animate () {
    if ( this.model && window.flag ) {

      this.model.rotation.y += 0.01
    }
    this.controls.update()
    this.render.render(this.scene, this.camera)

    requestAnimationFrame(this.animate.bind(this))
  }

  init () {
    this.initScene()
    this.initCamera()
    this.initPlane()
    this.initModel()
    this.initRender()

    this.animate()
    this.initLight()

  }
}

let instance = new InitThreeJS()
instance.init()
