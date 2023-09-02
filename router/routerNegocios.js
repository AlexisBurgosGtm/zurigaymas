const execute = require('./connection');
const express = require('express');
const router = express.Router();


router.get("/lista_negocios",async(req,res)=>{

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




module.exports = router;
