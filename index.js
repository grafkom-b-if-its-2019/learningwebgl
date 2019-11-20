(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
  
    // Inisialisasi shaders dan program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);
  
    // Definisi verteks dan buffer
    /**
     *  A ( -0.5, -0.5,  0.5 )
     *  B ( -0.5,  0.5,  0.5 )
     *  C (  0.5,  0.5,  0.5 )
     *  D (  0.5, -0.5,  0.5 )
     *  E ( -0.5, -0.5, -0.5 )
     *  F ( -0.5,  0.5, -0.5 )
     *  G (  0.5,  0.5, -0.5 )
     *  H (  0.5, -0.5, -0.5 )
     */
 /*   var cubeVertices = [
      // x, y, z            r, g, b         normal

      -0.5,  0.5,  0.5,     1.0, 0.0, 0.0,  0.0, 0.0, 1.0, // depan, merah, BAD BDC
      -0.5, -0.5,  0.5,     1.0, 0.0, 0.0,  0.0, 0.0, 1.0, 
       0.5, -0.5,  0.5,     1.0, 0.0, 0.0,  0.0, 0.0, 1.0, 
      -0.5,  0.5,  0.5,     1.0, 0.0, 0.0,  0.0, 0.0, 1.0, 
       0.5, -0.5,  0.5,     1.0, 0.0, 0.0,  0.0, 0.0, 1.0, 
       0.5,  0.5,  0.5,     1.0, 0.0, 0.0,  0.0, 0.0, 1.0, 

       0.5,  0.5,  0.5,     0.0, 1.0, 0.0,  1.0, 0.0, 0.0, // kanan, hijau, CDH CHG
       0.5, -0.5,  0.5,     0.0, 1.0, 0.0,  1.0, 0.0, 0.0,
       0.5, -0.5, -0.5,     0.0, 1.0, 0.0,  1.0, 0.0, 0.0,
       0.5,  0.5,  0.5,     0.0, 1.0, 0.0,  1.0, 0.0, 0.0,
       0.5, -0.5, -0.5,     0.0, 1.0, 0.0,  1.0, 0.0, 0.0,
       0.5,  0.5, -0.5,     0.0, 1.0, 0.0,  1.0, 0.0, 0.0,

       0.5, -0.5,  0.5,     0.0, 0.0, 1.0,  0.0, -1.0, 0.0, // bawah, biru, DAE DEH
      -0.5, -0.5,  0.5,     0.0, 0.0, 1.0,  0.0, -1.0, 0.0,
      -0.5, -0.5, -0.5,     0.0, 0.0, 1.0,  0.0, -1.0, 0.0,
       0.5, -0.5,  0.5,     0.0, 0.0, 1.0,  0.0, -1.0, 0.0,
      -0.5, -0.5, -0.5,     0.0, 0.0, 1.0,  0.0, -1.0, 0.0,
       0.5, -0.5, -0.5,     0.0, 0.0, 1.0,  0.0, -1.0, 0.0,

      -0.5, -0.5, -0.5,     1.0, 1.0, 0.0,  0.0, 0.0, -1.0, // belakang, kuning, EFG EGH
      -0.5,  0.5, -0.5,     1.0, 1.0, 0.0,  0.0, 0.0, -1.0,
       0.5,  0.5, -0.5,     1.0, 1.0, 0.0,  0.0, 0.0, -1.0,
      -0.5, -0.5, -0.5,     1.0, 1.0, 0.0,  0.0, 0.0, -1.0,
       0.5,  0.5, -0.5,     1.0, 1.0, 0.0,  0.0, 0.0, -1.0,
       0.5, -0.5, -0.5,     1.0, 1.0, 0.0,  0.0, 0.0, -1.0,

      -0.5,  0.5, -0.5,     0.0, 1.0, 1.0,  -1.0, 0.0, 0.0, // kiri, cyan, FEA FAB
      -0.5, -0.5, -0.5,     0.0, 1.0, 1.0,  -1.0, 0.0, 0.0,
      -0.5, -0.5,  0.5,     0.0, 1.0, 1.0,  -1.0, 0.0, 0.0,
      -0.5,  0.5, -0.5,     0.0, 1.0, 1.0,  -1.0, 0.0, 0.0,
      -0.5, -0.5,  0.5,     0.0, 1.0, 1.0,  -1.0, 0.0, 0.0,
      -0.5,  0.5,  0.5,     0.0, 1.0, 1.0,  -1.0, 0.0, 0.0,

       0.5,  0.5, -0.5,     1.0, 0.0, 1.0,  0.0, 1.0, 0.0, // atas, magenta, GFB GBC
      -0.5,  0.5, -0.5,     1.0, 0.0, 1.0,  0.0, 1.0, 0.0,
      -0.5,  0.5,  0.5,     1.0, 0.0, 1.0,  0.0, 1.0, 0.0,
       0.5,  0.5, -0.5,     1.0, 0.0, 1.0,  0.0, 1.0, 0.0,
      -0.5,  0.5,  0.5,     1.0, 0.0, 1.0,  0.0, 1.0, 0.0,
       0.5,  0.5,  0.5,     1.0, 0.0, 1.0,  0.0, 1.0, 0.0
    ];*/

    var cubeVertices = [
      // x, y, z            u, v         normal

      -0.5,  0.5,  0.5,     0.0, 1.0,  0.0, 0.0, 1.0, // depan, merah, BAD BDC
      -0.5, -0.5,  0.5,     0.0, 0.0,  0.0, 0.0, 1.0, 
       0.5, -0.5,  0.5,     1.0, 0.0,  0.0, 0.0, 1.0, 
      -0.5,  0.5,  0.5,     0.0, 1.0,  0.0, 0.0, 1.0, 
       0.5, -0.5,  0.5,     1.0, 0.0,  0.0, 0.0, 1.0, 
       0.5,  0.5,  0.5,     1.0, 1.0,  0.0, 0.0, 1.0, 

       0.5,  0.5,  0.5,     0.0, 1.0,  1.0, 0.0, 0.0, // kanan, hijau, CDH CHG
       0.5, -0.5,  0.5,     0.0, 0.0,  1.0, 0.0, 0.0,
       0.5, -0.5, -0.5,     1.0, 0.0,  1.0, 0.0, 0.0,
       0.5,  0.5,  0.5,     0.0, 1.0,  1.0, 0.0, 0.0,
       0.5, -0.5, -0.5,     1.0, 0.0,  1.0, 0.0, 0.0,
       0.5,  0.5, -0.5,     1.0, 1.0,  1.0, 0.0, 0.0,

       0.5, -0.5,  0.5,     0.0, 1.0,  0.0, -1.0, 0.0, // bawah, biru, DAE DEH
      -0.5, -0.5,  0.5,     0.0, 0.0,  0.0, -1.0, 0.0,
      -0.5, -0.5, -0.5,     1.0, 0.0,  0.0, -1.0, 0.0,
       0.5, -0.5,  0.5,     0.0, 1.0,  0.0, -1.0, 0.0,
      -0.5, -0.5, -0.5,     1.0, 0.0,  0.0, -1.0, 0.0,
       0.5, -0.5, -0.5,     1.0, 1.0,  0.0, -1.0, 0.0,

      -0.5, -0.5, -0.5,     0.0, 1.0,  0.0, 0.0, -1.0, // belakang, kuning, EFG EGH
      -0.5,  0.5, -0.5,     0.0, 0.0,  0.0, 0.0, -1.0,
       0.5,  0.5, -0.5,     1.0, 0.0,  0.0, 0.0, -1.0,
      -0.5, -0.5, -0.5,     0.0, 1.0,  0.0, 0.0, -1.0,
       0.5,  0.5, -0.5,     1.0, 0.0,  0.0, 0.0, -1.0,
       0.5, -0.5, -0.5,     1.0, 1.0,  0.0, 0.0, -1.0,

      -0.5,  0.5, -0.5,     0.0, 1.0,  -1.0, 0.0, 0.0, // kiri, cyan, FEA FAB
      -0.5, -0.5, -0.5,     0.0, 0.0,  -1.0, 0.0, 0.0,
      -0.5, -0.5,  0.5,     1.0, 0.0,  -1.0, 0.0, 0.0,
      -0.5,  0.5, -0.5,     0.0, 1.0,  -1.0, 0.0, 0.0,
      -0.5, -0.5,  0.5,     1.0, 0.0,  -1.0, 0.0, 0.0,
      -0.5,  0.5,  0.5,     1.0, 1.0,  -1.0, 0.0, 0.0,

       0.5,  0.5, -0.5,     0.0, 1.0,  0.0, 1.0, 0.0, // atas, magenta, GFB GBC
      -0.5,  0.5, -0.5,     0.0, 0.0,  0.0, 1.0, 0.0,
      -0.5,  0.5,  0.5,     1.0, 0.0,  0.0, 1.0, 0.0,
       0.5,  0.5, -0.5,     0.0, 1.0,  0.0, 1.0, 0.0,
      -0.5,  0.5,  0.5,     1.0, 0.0,  0.0, 1.0, 0.0,
       0.5,  0.5,  0.5,     1.0, 1.0,  0.0, 1.0, 0.0
    ];

    var cubeVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVBO);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vTexCoord = gl.getAttribLocation(program, 'vTexCoord');
    var vNormal = gl.getAttribLocation(program, 'vNormal');
    gl.vertexAttribPointer(
      vPosition,  // variabel yang memegang posisi attribute di shader
      3,          // jumlah elemen per attribute
      gl.FLOAT,   // tipe data atribut
      gl.FALSE,
      8 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
      0                                   // offset dari posisi elemen di array
    );
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, gl.FALSE, 
      8 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, gl.FALSE, 
      8 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vTexCoord);
    gl.enableVertexAttribArray(vNormal);

    var theta = [0.0, 0.0, 0.0];
    var axis = 0;
    var xAxis = 0;
    var yAxis = 1;
    var zAxis = 2;

    // Uniform untuk definisi cahaya
    var lightColorLoc = gl.getUniformLocation(program, 'lightColor');
    var lightPositionLoc = gl.getUniformLocation(program, 'lightPosition');
    var ambientColorLoc = gl.getUniformLocation(program, 'ambientColor');
    var lightColor = [0.5, 0.5, 0.5];
    var lightPosition = [1., 2., 1.7];
    var ambientColor = glMatrix.vec3.fromValues(0.2, 0.2, 0.2);
    gl.uniform3fv(lightColorLoc, lightColor);
    gl.uniform3fv(lightPositionLoc, lightPosition);
    gl.uniform3fv(ambientColorLoc, ambientColor);

    var nmLoc = gl.getUniformLocation(program, 'normalMatrix');

    function onKeyPress(event) {
      if (event.keyCode == 88 || event.keyCode == 120) {
        axis = xAxis;
      } else if (event.keyCode == 89 || event.keyCode == 121) {
        axis = yAxis;
      } else if (event.keyCode == 90 || event.keyCode == 122) {
        axis = zAxis;
      }
    }
    document.addEventListener('keypress', onKeyPress);

    // Definisi view, model, dan projection
    var vmLoc = gl.getUniformLocation(program, 'view');
    var pmLoc = gl.getUniformLocation(program, 'projection');
    var mmLoc = gl.getUniformLocation(program, 'model');
    var vm = glMatrix.mat4.create();
    var pm = glMatrix.mat4.create();

    glMatrix.mat4.lookAt(vm,
      glMatrix.vec3.fromValues(0.0, 0.0, 0.0),    // posisi kamera
      glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
      glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
    );

    var fovy = glMatrix.glMatrix.toRadian(90.0);
    var aspect = canvas.width / canvas.height;
    var near = 0.5;
    var far = 10.0;
    glMatrix.mat4.perspective(pm,
      fovy,
      aspect,
      near,
      far
    );

    gl.uniformMatrix4fv(vmLoc, false, vm);
    gl.uniformMatrix4fv(pmLoc, false, pm);

    function render() {
      
      theta[axis] += glMatrix.glMatrix.toRadian(0.5);  // dalam derajat
      var mm = glMatrix.mat4.create();
      glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -2.0]);
      glMatrix.mat4.rotateZ(mm, mm, theta[zAxis]);
      glMatrix.mat4.rotateY(mm, mm, theta[yAxis]);
      glMatrix.mat4.rotateX(mm, mm, theta[xAxis]);
      gl.uniformMatrix4fv(mmLoc, false, mm);

      // Perhitungan modelMatrix untuk vektor normal
      var nm = glMatrix.mat3.create();
      glMatrix.mat3.normalFromMat4(nm, mm);
      gl.uniformMatrix3fv(nmLoc, false, nm);

      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
      gl.drawArrays(gl.TRIANGLES, 0, 36);
      requestAnimationFrame(render); 
    }
    // Bersihkan layar jadi hitam
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    // Uniform untuk tekstur
    var sampler0Loc = gl.getUniformLocation(program, 'sampler0');
    gl.uniform1i(sampler0Loc, 0);
    // Inisialisasi tekstur
    var texture = gl.createTexture();
    if (!texture) {
      reject(new Error('Gagal membuat objek tekstur'));
    }
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Sementara warnai tekstur dengan sebuah 1x1 piksel biru
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
    initTexture(function () {
      render();
    });

    // Membuat mekanisme pembacaan gambar jadi tekstur
    function initTexture(callback, args) {
      var imageSource = 'images/txStainglass.bmp';
      var promise = new Promise(function(resolve, reject) {
        var image = new Image();
        if (!image) {
          reject(new Error('Gagal membuat objek gambar'));
        }
        image.onload = function() {
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          resolve('Sukses');
        }
        image.src = imageSource;
      });
      promise.then(function() {
        if (callback) {
          callback(args);
        }
      }, function (error) {
        console.log('Galat pemuatan gambar', error);
      });
    }

  }

})();
