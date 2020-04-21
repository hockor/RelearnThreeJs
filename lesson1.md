# Three.js系列 No.1 入门

## three.js 和 webgl 的关系

Web图形库（Web Graphics Library）简称WebGL，是在浏览器环境下进行3D/2D图像渲染的技术。你不需要额外的插件，就可以在HTML5的Canvas上绘制复杂的、可交互的图形。

大部分现代浏览器支持WebGL技术，IE从11开始支持，新版的 chrome 甚至已经支持 webgl2了。

WebGL基于OpenGL ES 2.0提供3D图形接口。后者是OpenGL的一个子集，主要针对手机、PDA之类的嵌入式设备。

直接使用WebGL编程难度较高，需要了解WebGL的细节、学习复杂的着色器（Shader）语言。Three.js对WebGL的底层细节进行了封装，让你更加容易的、仅利用JavaScript语言创建3D图形，你可以：

- 创建简单/复杂的3D几何图形
- 在3D场景中动画、移动对象
- 给对象应用纹理、材质
- 从3D模型软件中加载对象

## three.js 的案例

先来简单看一些案例：

- 腾讯3D 捏脸 : [https://wmsj.qq.com/act/a20190307km/](https://wmsj.qq.com/act/a20190307km/)
- 我的世界：[http://test.nie.163.com/test_html/mc/exp/](http://test.nie.163.com/test_html/mc/exp/)
- 逆水寒甜水巷：[https://test.nie.163.com/test_html/n//branch_webgl/](https://test.nie.163.com/test_html/n//branch_webgl/)
- shader 的使用：[https://threejs.org/examples/webgl_shaders_ocean.html](https://threejs.org/examples/webgl_shaders_ocean.html)
- 本地 demo：[http://test.163.com:9005/practice/shader1.html](http://test.163.com:9005/practice/shader1.html)，[http://test.163.com:9005/practice/shader2.html](http://test.163.com:9005/practice/shader2.html)


## threejs 中的基础概念

![](http://davidscottlyons.com/threejs-intro/images/node-map.png)

重点的几个就是：场景（scene）、摄像机(camera)、灯光(light)、几何体(mesh)、材质(material)

我们来看一个最简单的例子

```js

class InitThreeJS {
  // 初始化场景
  initScene () {
    this.scene = new THREE.Scene()
  }

  // 初始化摄像机
  initCamera () {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(-30, 30, 30)
    this.camera.lookAt(this.scene.position)
  }

  // 初始化渲染器，并渲染场景
  initRender () {
    this.render = new THREE.WebGLRenderer()
    this.render.setClearColor(0xEEEEEE)
    this.render.setSize(window.innerWidth, window.innerHeight)

    let axes = new THREE.AxisHelper(20)
    this.scene.add(axes)
    document.getElementById('app').appendChild(this.render.domElement)
    this.render.render(this.scene, this.camera)
  }

  // 在场景中添加一个地平面
  initPlane () {
    let planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1)
    let planeMaterial = new THREE.MeshBasicMaterial({
      color: '#3fd4d2'
    })
    let plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0
    this.scene.add(plane)
  }

  // 在场景中添加一个 cube
  initCube () {
    let cubeGeometry = new THREE.BoxGeometry(4, 8, 4)
    let cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xff0000
    })
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.x = 0
    cube.position.y = 0
    cube.position.z = 0
    this.scene.add(this.cube)
  }

  // 动起来
  animate () {
    this.cube.rotation.y += 0.01
 
    // 记得重新 render
    this.render.render(this.scene, this.camera)
    requestAnimationFrame(this.animate.bind(this))
  }
  
  // 执行所有操作，注意执行顺序
  init () {
    this.initScene()
    this.initCamera()
    this.initPlane()
    this.initCube()
    this.initRender()
    this.animate()
  }
}

let instance = new InitThreeJS()
instance.init()
```

## 如何学习 threejs(有哪些资料推荐)

- 最好的资料：官方文档
- 将自己想象成一个造物主，在合适的位置摆放自己想要的物体，并赋予他们动画和交互
建议的学习方式：

- 首先搞明白3D 世界中的一些具体概念
- 然后按照场景（scene）、摄像机(camera)、灯光(light)、几何体(mesh)、材质(material)的类别分别去看看对应的 demo,揣摩其中的原理
- 分析源代码
- 从官方仓库指定一个版本下载全部内容，所有的 lib 都从这里面找，然后自己实现一些自己感兴趣的效果
- 再去对应着 demo 拓展

**特别注意，官方文档上很多函数可能和你下载下来的 lib 有出入，请自己从官方issue 里面确认下，或者自己打印下 object 查证**

## 如何调试threejs
- 推荐一个插件：[https://chrome.google.com/webstore/detail/threejs-inspector/dnhjfclbfhcbcdfpjaeacomhbdfjbebi?hl=en](https://chrome.google.com/webstore/detail/threejs-inspector/dnhjfclbfhcbcdfpjaeacomhbdfjbebi?hl=en)
- 善于利用各种 helper 插件
- 分析 FPS
- 模型查看利用：[https://threejs.org/editor/](https://threejs.org/editor/)

## threejs 中有那些注意点
- threejs 没有像素的概念
- 需要注意导入的模型中的层级关系
- threejs 的贴图尺寸需要2^n
- threejs 中很多效果需要`原生 webgl`实现

## Practice
