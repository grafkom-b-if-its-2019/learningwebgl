precision mediump float;

attribute vec3 vPosition;
attribute vec3 vColor;
attribute vec3 vNormal;

varying vec3 fColor;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

uniform mat3 normalMatrix;

uniform vec3 lightColor;
uniform vec3 lightPosition;
uniform vec3 ambientColor;

void main() {
  vec3 normal = normalize(normalMatrix * vNormal); // Supaya jadi unit vector
  vec3 lightDirection = lightPosition - vec3(model * vec4(vPosition, 1.0));
  float lightIntensity = max(dot(lightDirection, normal), 0.0);
  vec3 diffuse = lightColor * vColor * lightIntensity;
  vec3 ambient = ambientColor * vColor;
  fColor = diffuse + ambient;

  gl_Position = projection * view * model * vec4(vPosition, 1.0);
  // urutan perkaliannya harus = projection x view x model (transformasi)
}
