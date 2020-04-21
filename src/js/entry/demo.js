/**
 * Created by hztangzhao on 2019/9/27.
 */
import Post from '../common/post'

window.scene = null
var $width = document.documentElement.clientWidth
var $height = document.documentElement.clientHeight

class InitThreeJS {

  constructor () {

    this.$canvas = document.getElementById('js-canvas')

    this.mainScene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.$canvas,
      alpha: true,
      antialias: false,
      stencil: false,
      depth: true,
      premultipliedAlpha: false
    })
    this.renderer.setClearColor(new THREE.Color('#000000'))
    this.renderer.autoClear = true
    this.renderer.setSize($width, $height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.camera = new THREE.PerspectiveCamera(75, $width / $height, 0.1, 4000)

    this.renderTarget = new THREE.WebGLRenderTarget($width, $height, {
      magFilter: THREE.LinearFilter,
      minFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping
    })
    this.updateCamera()

    this.initPost()

  }

  initPost () {
    this.post = new Post(this.renderTarget.texture)
  }

  updateCamera () {
    this.camera.aspect = $width / $height
    this.camera.updateProjectionMatrix()
    this.camera.position.z = $height / Math.tan(this.camera.fov * Math.PI / 360) / 2
  }
  
  render () {

    var _this = this

    _this.renderer.clear()
    _this.post.update()
    _this.renderer.setRenderTarget(this.renderTarget)
    _this.renderer.render(this.mainScene, this.camera)
    _this.renderer.setRenderTarget(null)

    _this.renderer.render(this.post.scene, this.camera)
  }

  init () {

    if ( this ) {
      window._this = this
    }

    window._this.render()

    requestAnimationFrame(window._this.init)
  }

}

$(function () {

  let instance = new InitThreeJS()
  instance.init()

})


