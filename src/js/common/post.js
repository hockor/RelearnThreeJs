/**
 * Created by hztangzhao on 2019/9/27.
 */
class Post {
  constructor (tex) {

    this.parmas = {
      imageOpacity: {value: 0.0, min: 0.0, max: 1.0},
      invert: {value: 0.01, min: 0.0, max: 1.0},
      gradationMap: {value: 0.8, min: 0.5, max: 10.0},
      gradationStrength: {value: 2.0, min: 0.5, max: 10.0},
      speedX: {value: -0.8, min: -10.0, max: 10.0},
      speedY: {value: 1.0, min: -10.0, max: 10.0},
      bgColor1: {value: 'rgba(0,0,0,0.94)'},
      bgColor2: {value: '#f2bd13'},
      bgColor3: {value: '#ef0f22'}
    }
    this.scene = new THREE.Scene()
    this.tex = tex
    this.geometory = null
    this.material = null
    this.mesh = null
    this.uniforms = {
      resolution: {
        type: 'v2',
        value: {
          x: document.documentElement.clientWidth,
          y: document.documentElement.clientHeight
        }
      },
      tex: {
        type: 't',
        value: this.tex
      },
      time: {
        type: 'f',
        value: 0
      },
      imageOpacity: {
        type: 'f',
        value: this.parmas.imageOpacity.value
      },
      invert: {
        type: 'f',
        value: this.parmas.invert.value
      },
      gradationMap: {
        type: 'f',
        value: this.parmas.gradationMap.value
      },
      gradationStrength: {
        type: 'f',
        value: this.parmas.gradationStrength.value
      },
      speedX: {
        type: 'f',
        value: this.parmas.speedX.value
      },
      speedY: {
        type: 'f',
        value: this.parmas.speedY.value
      },
      bg1: {
        type: 'c',
        value: new THREE.Color(this.parmas.bgColor1.value)
      },
      bg2: {
        type: 'c',
        value: new THREE.Color(this.parmas.bgColor2.value)
      },
      bg3: {
        type: 'c',
        value: new THREE.Color(this.parmas.bgColor3.value)
      }
    }

    this.init()
  }

  init () {
    if ( this.mesh ) this.scene.remove(this.mesh)
    if ( this.geometory ) this.geometory.dispose()
    if ( this.material ) this.material.dispose()

    this.geometory = new THREE.PlaneBufferGeometry(document.documentElement.clientWidth, document.documentElement.clientHeight, 1, 1)
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: document.getElementById('vs').textContent,
      fragmentShader: document.getElementById('fs').textContent,
    })
    this.mesh = new THREE.Mesh(this.geometory, this.material)
    this.scene.add(this.mesh)
  }

  initGUI () {
    var _this = this

    this.parmas.imageOpacity.gui.onChange(function (val) {
      _this.material.uniforms.imageOpacity.value = val
    })
    this.parmas.invert.gui.onChange(function (val) {
      _this.material.uniforms.invert.value = val
    })
    this.parmas.gradationMap.gui.onChange(function (val) {
      _this.material.uniforms.gradationMap.value = val
    })
    this.parmas.gradationStrength.gui.onChange(function (val) {
      _this.material.uniforms.gradationStrength.value = val
    })
    this.parmas.speedX.gui.onChange(function (val) {
      _this.material.uniforms.speedX.value = val
    })
    this.parmas.speedY.gui.onChange(function (val) {
      _this.material.uniforms.speedX.value = val
    })
    this.parmas.bgColor1.gui.onChange(function (val) {
      _this.material.uniforms.bg1.value = new THREE.Color(val)
    })
    this.parmas.bgColor2.gui.onChange(function (val) {
      _this.material.uniforms.bg2.value = new THREE.Color(val)
    })
    this.parmas.bgColor3.gui.onChange(function (val) {
      _this.material.uniforms.bg3.value = new THREE.Color(val)
    })
  }

  update () {
    this.material.uniforms.time.value += 0.001
  }

  invert () {
    TweenLite.to(this.material.uniforms.invert, 0.5, {
      value: val
    })
  }

  hideImage () {
    TweenLite.to(this.material.uniforms.imageOpacity, 0.5, {
      value: 0
    })
  }

  showImage () {
    TweenLite.to(this.material.uniforms.imageOpacity, 0.5, {
      value: 1
    })
  }
}

export default Post
