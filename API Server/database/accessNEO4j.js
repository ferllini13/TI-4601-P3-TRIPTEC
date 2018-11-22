var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4js"));
var session = driver.session();

module.exports = session; //export the session of the neo4j database

ConnectNEO4J_DB = function (tipo, objeto, callback) {

  if (tipo == "crearCliente") {
    var data = { id: objeto.id, name: objeto.name, correo: objeto.correo, phone: objeto.phone };
    session
      .run("create (u:Cliente) set u ={client} return u", { client: data })
      .then(function (result) {
        result.records.forEach(function (record) {
          console.log(record._fields[0].properties);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  else if (tipo == "reservar") {
    var data = { id: objeto.idClient, name: objeto.name, clientsAmount: objeto.clientsAmount };
    console.log(objeto.name);
    console.log(data)
    session

        .run("MATCH (c:Cliente),(s:Sitio) WHERE c.id = $cID AND s.name = $sName create (c)-[r:R]->(s) set r={reservacion}", {reservacion: data, cID: objeto.idClient, sName: objeto.name})
        
      .then(function (result) {
        result.records.forEach(function (record) {
          console.log(record._fields[0].properties);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  else if (tipo == "crearSitio") {
    var data = {
      name: objeto.name,
      direction: objeto.direction,
      long: objeto.long,
      lat: objeto.lat,
      description: objeto.description,
      activities: objeto.activities,
      price: objeto.price,
      type: objeto.type,
      image: objeto.image,
      rating: objeto.rating,
      cellphone: objeto.cellphone,
      schedule: objeto.schedule,
      website: objeto.website
    };
    session
      .run("create (s:Sitio) set s ={sitio} return s", { sitio: data })
      .then(function (result) {
        result.records.forEach(function (record) {
          console.log(record._fields[0].properties);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }else if (tipo == "sitios cliente"){
    var sitios = [];
    session
    .run("match (c:Cliente {id: $id})-[r:R]->(Sitio) return Sitio", {id: objeto.id}).then(function (result) {
      result.records.forEach(function (record) {
        sitios.push(record._fields[0]);
      });
      callback({status: true, resultado: sitios});

    })
    .catch(function (error) {
      callback({status: false, error: error})
    });

  }else if (tipo == "sitios reservados"){
    var sitios = [];
    session
    .run("match ()-[r:R]->(Sitio) return Sitio.name, count(Sitio.name) as name").then(function (result) {
      result.records.forEach(function (record) {
        console.log(record)
        sitios.push(record._fields[0]);
      });
      callback({status: true, resultado: sitios});

    })
    .catch(function (error) {
      callback({status: false, error: error})
    });

  }else if (tipo == "sitios mas reservados"){
    var sitios = [];
    session
    .run("match ()-[r:R]->(Sitio) return Sitio.name, count(Sitio.name) as name ORDER BY name LIMIT 5").then(function (result) {
      result.records.forEach(function (record) {
        console.log(record)
        sitios.push(record._fields[0]);
      });
      callback({status: true, resultado: sitios});

    })
    .catch(function (error) {
      callback({status: false, error: error})
    });
  }else if (tipo == "sitios en comun"){
    var sitios = [];
    session
    .run("match (c:Cliente) where c.id = $id " +
    "match (c2:Cliente) where not c2.id = $id "+
    "match (c)-[:R]->(s:Sitio) "+
    "match (c2)-[:R]->(s2:Sitio) where s.name = s2.name "+
    "return c2.name as nombreCliente, s.name as sitio, count(c2.name) as cantidad", {id: objeto.id}).then(function (result) {
      result.records.forEach(function (record) {
        console.log(record)
        sitios.push(record._fields);
      });
      callback({status: true, resultado: sitios});

    })
    .catch(function (error) {
      console.log(error)
      callback({status: false, error: error})
    });
  }
}
module.exports.ConnectNEO4J_DB = ConnectNEO4J_DB