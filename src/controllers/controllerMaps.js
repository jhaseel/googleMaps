const controller = {};

controller.index = (req, res, next) => {
  req.getConnection((err, conn) => {
    conn.query('call municipios',true, (err, row, fields) => {
      if (err){
        res.json(err); 
        return next(err);
      }else{
          res.render('maps', {data : row[0]});
      }

    })
  });
};


controller.localidades = (req, res, next) => {
  console.log("entro en localidades");
  req.getConnection((err, conn) => {
    var municipio = req.query.municipio;
    conn.query('call localidades(?)',[municipio], (err, row, fields) => {
      if (err){
        res.json(err); 
        return next(err);
      }else{
        res.send(row[0]);
      }

    })
  });
};


controller.tipo = (req, res, next) => {
  req.getConnection((err, conn) => {
    var municipio = req.query.municipio;
    conn.query('call tipo',true, (err, row, fields) => {
      if (err){
        res.json(err); 
        return next(err);
      }else{
        res.send(row[0]);
      }

    })
  });
};

controller.coordenadas = (req, res, next) => {
  console.log("coordenadas");
  req.getConnection((err, conn) => {
    console.log(req.query);
    var municipio = req.query.municipio;
    var localidad = req.query.localidad;
    var tipo = req.query.tipo;
    conn.query('call coordenadas(?,?,?)',[municipio,localidad,tipo], (err, row, fields) => {
      if (err){
        res.json(err); 
        return next(err);
      }else{
        console.log(row[0]);
        res.send(row[0]);
      }

    })
  });
};

controller.coordenadas_todo = (req, res, next) => {
  req.getConnection((err, conn) => {
    console.log(req.query);
    var municipio = req.query.municipio;
    var localidad = req.query.localidad;
    conn.query('call coordenadas_todo(?,?)',[municipio,localidad], (err, row, fields) => {
      if (err){
        res.json(err); 
        return next(err);
      }else{
        console.log(row[0]);
        res.send(row[0]);
      }

    })
  });
};


module.exports = controller;