var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

const execute = require('./router/connection');
var routerNegocios = require('./router/routerNegocios');

var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3333;

app.use(bodyParser.json());

app.use(express.static('build'));

var path = __dirname + '/'

//manejador de rutas
router.use(function (req,res,next) {
/*  
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name, pplication/json');
        // Set to true if you need the website to include cookies in the requests sent
      res.setHeader('Access-Control-Allow-Credentials', true);
*/
  //console.log(req);
  next();
});

app.get("/",function(req,res){
  //execute.start();
	res.sendFile(path + 'index.html');
}); 

app.get("/lista_negocios",function(req,res){
  
  const {sucursal} = req.query;

    
  let qry ='';
  qry = `SELECT   ME_CENSO.FECHA, 
                  ME_CENSO.ID AS CODNEGOCIO, 
                  ME_CENSO.TIPONEGOCIO AS CODTIPONEGOCIO, 
                  ME_TIPO_NEGOCIOS.DESTIPO AS TIPO, 
                  ME_CENSO.NEGOCIO AS ESTABLECIMIENTO, 
                  ME_CENSO.DIRCLIE AS DIRECCION, 
                  ME_CENSO.REFERENCIA, 
                  ME_CENSO.CODMUN, 
                  ME_Municipios.DESMUNI AS MUNICIPIO, 
                  ME_CENSO.CODDEPTO, 
                  ME_Departamentos.DESDEPTO AS DEPARTAMENTO, 
                  ME_CENSO.TELEFONO, 
                  ME_CENSO.VISITA AS TIENEDOMICILIO, 
                  ME_CENSO.LAT AS LATITUD, 
                  ME_CENSO.LONG AS LONGITUD
          FROM ME_CENSO LEFT OUTER JOIN
               ME_TIPO_NEGOCIOS ON ME_CENSO.CODSUCURSAL = ME_TIPO_NEGOCIOS.CODSUCURSAL AND ME_CENSO.TIPONEGOCIO = ME_TIPO_NEGOCIOS.CODTIPO LEFT OUTER JOIN
               ME_Departamentos ON ME_CENSO.CODDEPTO = ME_Departamentos.CODDEPTO AND ME_CENSO.CODSUCURSAL = ME_Departamentos.CODSUCURSAL LEFT OUTER JOIN
               ME_Municipios ON ME_CENSO.CODMUN = ME_Municipios.CODMUNI AND ME_CENSO.CODSUCURSAL = ME_Municipios.CODSUCURSAL
          WHERE (ME_CENSO.CODSUCURSAL = '${sucursal}')`;
            
        
  execute.Query(res,qry);

});

app.use('/negocios', routerNegocios);


app.use("/",router);

app.use("*",function(req,res){
  //res.sendFile(path + 'build/404.html');
  res.send('<h1>No permitido</h1>')
});


// SOCKET HANDLER
io.on('connection', function(socket){
  
  socket.on('comandas nueva', (msg,usuario)=>{
    io.emit('comandas nueva', msg,usuario);
  });
 
  socket.on('comandas finalizada', (msg,usuario)=>{
    io.emit('comandas finalizada', msg,usuario);
  });
  
});


http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});

