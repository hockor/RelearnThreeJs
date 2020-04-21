/**
 * Created by tangzhao on 2020/4/20.
 */
window.onload = function () {
  var canvas = document.getElementById('mycanvas')
  var webgl = canvas.getContext('webgl')

  var v3Position = 0, inColor = 1, triangleBuffer, indexBuffer

  // 创建 shader
  var vertexShaderObject = webgl.createShader(webgl.VERTEX_SHADER)
  var fragmentShaderObject = webgl.createShader(webgl.FRAGMENT_SHADER)

  // 绑定 2 个 shader 的代码
  webgl.shaderSource(vertexShaderObject, document.getElementById('vert').textContent)
  webgl.shaderSource(fragmentShaderObject, document.getElementById('frag').textContent)

  // 编译 shader
  webgl.compileShader(vertexShaderObject)
  webgl.compileShader(fragmentShaderObject)

  if ( !webgl.getShaderParameter(vertexShaderObject, webgl.COMPILE_STATUS) ) {
    var err = webgl.getShaderInfoLog(vertexShaderObject)
    return alert(err)
  }

  if ( !webgl.getShaderParameter(fragmentShaderObject, webgl.COMPILE_STATUS) ) {
    var err = webgl.getShaderInfoLog(fragmentShaderObject)
    return alert(err)
  }

  // 创建一个程序
  var programObject = webgl.createProgram()

  // 和 shader 关联起来
  webgl.attachShader(programObject, vertexShaderObject)
  webgl.attachShader(programObject, fragmentShaderObject)

  // 编译程序
  webgl.linkProgram(programObject)
  if ( !webgl.getProgramParameter(programObject, webgl.LINK_STATUS) ) {
    var err = webgl.getShaderInfoLog(programObject)
    return alert(err)
  }

  /*
  * 顶点缓冲区
  * 索引缓冲区
  * 纹理
  * 帧缓冲
  * 深度缓冲区
  * 颜色缓冲区
  * 模板缓冲区
  *
  *
  * 模型矩阵
  * 观察矩阵
  * 投影矩阵
  * 视口矩阵
  *
  * */

  // 开始使用程序
  webgl.useProgram(programObject)

  // 顶点和颜色数据
  var jsArrayData = [
    // x   y     z    r    g    b   a
    -0.5, +0.5, 0.0, 1.0, 0.0, 0.0, 1.0,
    +0.5, +0.5, 0.0, 0.0, 1.0, 0.0, 1.0,
    +0.5, -0.5, 0.0, 0.0, 0.0, 1.0, 1.0,
    -0.5, -0.5, 0.0, 1.0, 0.0, 1.0, 1.0,
    -0.8, -0.8, 0.0, 0.0, 1.0, 1.0, 1.0,

  ]
  // 索引数据
  var indexData = [

    0, 1, 2,
    0, 2, 3,
    0, 3, 4
  ]

  // 分别绑定 2 个外部变量
  webgl.bindAttribLocation(programObject, v3Position, 'v3Position')
  webgl.bindAttribLocation(programObject, inColor, 'inColor')

  // 创建一个缓冲区
  triangleBuffer = webgl.createBuffer()
  webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer)

  // 传入顶点数据
  webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(jsArrayData), webgl.STATIC_DRAW)

  // 再创建一个索引缓冲区，防止顶点内容太多，
  indexBuffer = webgl.createBuffer()
  webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, indexBuffer)
  webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), webgl.STATIC_DRAW)

  // 清空画布，准备绘制
  webgl.clearColor(1.0, 1.0, 1.0, 1.0)
  webgl.clear(webgl.COLOR_BUFFER_BIT)

  // 启用顶点属性数组
  webgl.enableVertexAttribArray(v3Position)
  webgl.enableVertexAttribArray(inColor)

  //将缓冲区对象分配给a_Position变量

  // 指定数组中属性的偏移和长度
  // 3 表示 xyz   一个 float4 个字节，所以每次需要跨过 xyzrgba (4*7)，继续获取
  // 最后那个 0 表示从每一组第一个就开始
  webgl.vertexAttribPointer(v3Position, 3, webgl.FLOAT, false, 4 * 7, 0 * 4)
  // 4 表示 rgba
  // 12 表示要从每一组的第 12 个字节开始获取（因为 xyz 刚好 3*4）
  webgl.vertexAttribPointer(inColor, 4, webgl.FLOAT, false, 4 * 7, 3 * 4)

  // 根据索引绘制三角形， 绘制的类型   有几个索引需要绘制    数据类型   数据偏移（从第几个开始画，short 1个字符 2 个字节，所以需要 X2
  // webgl.drawElements(webgl.TRIANGLES, 6, webgl.UNSIGNED_SHORT, 3 * 2)
  webgl.drawElements(webgl.TRIANGLES, 9, webgl.UNSIGNED_SHORT, 0 * 2)

}
