var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4js"));
var session = driver.session();

module.exports = session; //export the session of the neo4j database

ConnectNEO4J_DB = function (tipo, objeto) {

  // console.log("Tipo: " + tipo +", query: " + query + ", modelo: " + modelo + " Im NEO4J ")
  /** query crear usuario
    create (name:Cliente {id: "116860517",
      name: "Jairo Mendez",
      correo: "jm@correo.com",
      phone: "88552214",
      birth: "1996-09-26",
      wishList: [""]})

      ***** crear sitio*****
  create (RiuPalace:Sitio {name: "Hotel Riu Palace",
      direction: "en guana",
      long: -0.5,
      lat:25.5,
      description:"hotel de playa, vengase",
      activities: ["playa","playita"],
      price: 40,
      type: "hotel",
      image: "alguna",
      rating:10,
      cellphone: "+506 22222222",
      schedule: ["hoy","ma;ana"],
      website:"riuplace.com"})
  
      ***** crear reservacion ****
  MATCH (clientName:Cliente),(placeName:Sitio)
  WHERE clientName.name = "Jairo" AND placeName.name = "Hotel Riu Palace"
   create (clientName)-[:RESERVO {clientsAmount:5,
      checkIn:"2018-11-20",
      checkOut:"2018-11-22",
      needs: ["vegan"],
      additionals:["no sean necios"],
      possibleVist: []}]->(placeName)
      RETURN r
   */

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
  else if (tipo == "findOne") {
    console.log("NEO WORKING");
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
  }
}

module.exports.ConnectNEO4J_DB = ConnectNEO4J_DB