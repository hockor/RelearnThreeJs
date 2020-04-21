uniform sampler2D tex;
varying vec2 vUv;
uniform vec2 resolution;
uniform float time;
uniform float imageOpacity;
uniform float invert;
uniform float gradationMap;
uniform float gradationStrength;
uniform float speedX;
uniform float speedY;
uniform vec3 bg1;
uniform vec3 bg2;
uniform vec3 bg3;
vec3 mod289(vec3 x){ return x-floor(x*(1./289.))*289.; }
vec2 mod289(vec2 x){ return x-floor(x*(1./289.))*289.; }
vec3 permute(vec3 x){ return mod289(((x*34.)+1.)*x); }
float snoise(vec2 v){
	const vec4 C=vec4(.211324865405187, // (3.0-sqrt(3.0))/6.0
	.366025403784439, // 0.5*(sqrt(3.0)-1.0)
	-.577350269189626, // -1.0 + 2.0 * C.x
	.044390243902439);// 1.0 / 41.0
	vec2 i=floor(v+dot(v, C.yy));
	vec2 x0=v-i+dot(i, C.xx);
	vec2 i1;
	i1=(x0.x>x0.y)?vec2(1., 0.):vec2(0., 1.);
	vec4 x12=x0.xyxy+C.xxzz;
	x12.xy-=i1;
	i=mod289(i);// Avoid truncation effects in permutation
	vec3 p=permute(permute(i.y+vec3(0., i1.y, 1.))
	+i.x+vec3(0., i1.x, 1.));
	vec3 m=max(.5-vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.);
	m=m*m;
	m=m*m;
	vec3 x=2.*fract(p*C.www)-1.;
	vec3 h=abs(x)-.5;
	vec3 ox=floor(x+.5);
	vec3 a0=x-ox;
	m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
	vec3 g;
	g.x=a0.x*x0.x+h.x*x0.y;
	g.yz=a0.yz*x12.xz+h.yz*x12.yw;
	return 130.*dot(m, g);
}
void main(){
	vec2 st=gl_FragCoord.xy/resolution.xy;
	st*=gradationMap;
	float v=snoise(vec2(
	(cos(st.x+cos(time*speedX)*2.2)*1.2+cos(st.x+time*speedX*.64)*.72+cos(st.x+time*speedX*2.14)*1.42)*.33333,
	(sin(st.y+time*speedY*2.2)*1.2+sin(st.y+sin(time*speedY)*.64)*.72+sin(st.y+time*speedY*2.14)*1.42)*.33333
	))*gradationStrength;
	v=snoise(vec2((cos(st.x+v+time*2.2)*1.2+cos(st.x+v+cos(time)*.64)*.72+cos(st.x+v+time*2.14)*1.42)*.33333, (sin(st.y+v+time*2.2)*1.2+sin(st.y+v+time*.64)*.72+sin(st.y+v+sin(time)*2.14)*1.42)*.33333))*.5;
	vec3 baseColor=mix(bg1, bg2, smoothstep(0., .9, v));
	baseColor=mix(baseColor, bg3, smoothstep(.3, 1., v));
	vec3 negaColor=vec3(1.)-baseColor;
	baseColor=mix(baseColor, negaColor, invert);
	vec4 texColor=texture2D(tex, vUv);
	texColor.a=texColor.a*imageOpacity;
	vec3 color=mix(baseColor.rgb, texColor.rgb, texColor.a);
	gl_FragColor=vec4(color.rgb, 1.);

}
