/**
 * Created by tangzhao on 2020/4/20.
 */
window.onload = function () {
  var canvas = document.getElementById("mycanvas")
  var webgl = canvas.getContext("webgl")

  webgl.clearColor(0,1.0,0,1.0);

  webgl.clear(webgl.COLOR_BUFFER_BIT);
}
