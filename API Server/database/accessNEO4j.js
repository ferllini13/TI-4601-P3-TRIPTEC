var neo4j = require('neo4j-driver').v1;
var driver  = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4js"));
var session = driver.session();

module.exports = session; //export the session of the neo4j database

ConnectNEO4J_DB = function (tipo, modelo, query, callback) {

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

     if(tipo == "crearCliente"){
        var data = {id: '15487659',name: 'Sopla Mocos 3000',correo: 'mocos@correo.com',phone: '88552214',birth: '1996-09-26',wishList: ['']};
        session
          .run("create (u:Cliente) set u ={client} return u", {client: data})
          .then(function(result) {
            result.records.forEach(function(record) {
              console.log(record._fields[0].properties);
            });
          })
          .catch(function(error) {
            console.log(error);
          });
     }
    else if(tipo == "crearSitio"){
        var data = {name: "Hotel Riu Palace",
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
        website:"riuplace.com"};
        var nombreCliente = "Jairo Mendez";
        var nombreSitio = "Hotel Riu Palace";
        session
          .run("MATCH (clientName:Cliente),(placeName:Sitio) "+
                "WHERE clientName.name = {nombreCliente} AND placeName.name = {nombreSitio}"+
                "create (clientName)-[r:RESERVO {reservacion}]->(placeName)"+
                "set ")
          .then(function(result) {
            result.records.forEach(function(record) {
              console.log(record._fields[0].properties);
            });
          })
          .catch(function(error) {
            console.log(error);
          });
    }
    else if(tipo == "reservar"){
        var data = {name: "Hotel Riu Palace",
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
        website:"riuplace.com"};
        session
          .run("create (s:Sitio) set s ={sitio} return s", {sitio: data})
          .then(function(result) {
            result.records.forEach(function(record) {
              console.log(record._fields[0].properties);
            });
          })
          .catch(function(error) {
            console.log(error);
          });    
    }
}

module.exports.ConnectNEO4J_DB = ConnectNEO4J_DB