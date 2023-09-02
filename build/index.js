
function getCategoria(categoria){

    document.getElementById('lbCategoria').innerText = categoria;

    let container = document.getElementById('containerNegocios');
    container.innerHTML = GlobalLoader;

    getDataNegocios()
    .then((data)=>{
        let datos = ''; let titulocategoria = '';
        console.log(data);

        data.map((r)=>{
            if(r.CODTIPONEGOCIO==categoria){
                    datos += `
                    <tr class="border-bottom-secondary border-left-0 border-right-0 border-top-0">
                        <td class="text-left">${r.ESTABLECIMIENTO}
                              <br>
                              <small class="negrita" style="font-size:70%;">${r.DIRECCION}</small>
                              <br>
                              <small style="font-size:70%;">${r.REFERENCIA}</small>
                        </td>
                        <td>${r.TELEFONO}</td>
                        <td>
                            <a class="btn-circle btn-md text-info hand" onclick="funciones.gotoGoogleMaps('${r.LATITUD}','${r.LONGITUD}')">
                                <i class="lni lni-map-marker"></i>
                            </a>
                        </td>
                        <td>
                            <a class="btn-circle btn-md hand text-success hand" href="https://api.whatsapp.com/send?phone=502${r.TELEFONO}&text=Hola%2C%20quisiera%20solicitar%20lo%20siguiente..." target="_blank">
                                <i class="lni lni-whatsapp"></i>
                            </a>
                        </td>
                    </tr>
                  `;
                  titulocategoria = r.TIPO;
            }
        })
        container.innerHTML = datos;
        document.getElementById('lbCategoria').innerText = titulocategoria;
    })
    .catch((error)=>{
        console.log(error);
        container.innerHTML ='<h3 class="text-danger">Ups!! necesitas internet para poder ver los negocios la primera vez!!</h3>';
    })
  

    $('#modalListado').modal('show');
    //funciones.Aviso('carga datos');
};

function getDataNegocios(){
  return new Promise((resolve,reject)=>{
        axios.get('/lista_negocios?sucursal=' + Token)
        .then((response) => {
            let data = response.data.recordset;
            resolve(data);
        }, (error) => {
            console.log('error 3')
            console.log(error);
            reject(error);
        });     

  });

};

function plantillaCard(negocio,direccion,descripcion,telefono,categoria){
  let str = `<br>
              <div class="card shadow col-12">
                <h4 class="text-danger">${negocio}</h4>
                <div class="form-group">
                    <small>${direccion}</small>
                    <br>
                    <small>${descripcion}</small>
                    <div class="row">
                      <div class="col-6">
                        <a 
                          href="https://api.whatsapp.com/send?phone=502${telefono}&text=Hola%20vi%20tu%20anuncio%20en%20Negocios%20Retalhuleu"
                          target="_blank" class="negrita"
                          >Tel: ${telefono}</a>
                      </div>
                      <div class="col-6">
                        <small class="bg-info text-white">${categoria}</small>
                      </div>
                    </div>
                    
                </div>
              </div>
              `
  return str;
}


function getBanner(){

 
    let str = `
        <div class="single-hero-slide" style="background-image: url('img/bg-img/1.jpg')">
          <div class="slide-content h-100 d-flex align-items-center">
            <div class="container">
              <h4 class="text-white mb-0" data-animation="fadeInUp" data-delay="100ms" data-wow-duration="1000ms">Electrónica Pérez</h4>
              <p class="text-white" data-animation="fadeInUp" data-delay="400ms" data-wow-duration="1000ms">Ofertas en artículos 20% descuento</p><a class="btn btn-primary btn-sm" href="#" data-animation="fadeInUp" data-delay="800ms" data-wow-duration="1000ms">Contactar</a>
            </div>
          </div>
        </div>

        <div class="single-hero-slide" style="background-image: url('img/bg-img/2.jpg')">
          <div class="slide-content h-100 d-flex align-items-center">
            <div class="container">
              <h4 class="text-white mb-0" data-animation="fadeInUp" data-delay="100ms" data-wow-duration="1000ms">El Museo</h4>
              <p class="text-white" data-animation="fadeInUp" data-delay="400ms" data-wow-duration="1000ms">Artículos decorativos</p><a class="btn btn-success btn-sm" href="#" data-animation="fadeInUp" data-delay="500ms" data-wow-duration="1000ms">Contactar</a>
            </div>
          </div>
        </div>

        <div class="single-hero-slide" style="background-image: url('img/bg-img/3.jpg')">
          <div class="slide-content h-100 d-flex align-items-center">
            <div class="container">
              <h4 class="text-white mb-0" data-animation="fadeInUp" data-delay="100ms" data-wow-duration="1000ms">Veterinaria Cat & Dog</h4>
              <p class="text-white" data-animation="fadeInUp" data-delay="400ms" data-wow-duration="1000ms">5 años consintiendo a tu mascota</p><a class="btn btn-danger btn-sm" href="#" data-animation="fadeInUp" data-delay="800ms" data-wow-duration="1000ms">Contactar</a>
            </div>
          </div>
        </div>
    `

    let rootBanner = document.getElementById('rootBanner');
    rootBanner.innerHTML = str;

};



getBanner();



