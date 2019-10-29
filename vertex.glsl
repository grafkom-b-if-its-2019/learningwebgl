precision mediump float;

attribute vec3 vPosition;
attribute vec3 vColor;
attribute vec3 vNormal;
varying vec3 fColor;

uniform vec3 theta;
uniform mat4 projection;
uniform mat4 view;

uniform vec3 lightColor;
uniform vec3 lightDirection;

void main() {
  vec3 normal = normalize(vNormal); // Supaya jadi unit vector
  float lightIntensity = max(dot(lightDirection, normal), 0.0);
  vec3 diffuse = lightColor * vColor * lightIntensity;
  fColor = diffuse;
  
  mat4 translate = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, -2.0, 1.0         // Kita geser setiap verteks sejau 2 unit menjauhi kamera, untuk memastikan seluruh bagian kubus ada di antara near dan far.
  );
  vec3 angle = radians(theta);
  vec3 c = cos(angle);
  vec3 s = sin(angle);
  mat4 rx = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, c.x, s.x, 0.0,
    0.0, -s.x, c.x, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  mat4 ry = mat4(
    c.y, 0.0, -s.y, 0.0,
    0.0, 1.0, 0.0, 0.0,
    s.y, 0.0, c.y, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  mat4 rz = mat4(
    c.z, s.z, 0.0, 0.0,
    -s.z, c.z, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  gl_Position = projection * view * translate * rz * ry * rx * vec4(vPosition, 1.0);
  // urutan perkaliannya harus = projection x view x model (transformasi)
}
