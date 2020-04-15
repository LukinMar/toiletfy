const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 21017;
const mysql = require("mysql");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

const router = express.Router();
router.get("/banheiros", (req, res) => {
  execSQLQuery("SELECT Id, Latitude, Longitude, Descricao FROM banheiros", res);
});

router.get("/erros", (req, res) => {
  execSQLQuery("SELECT * FROM erros", res);
});

router.post("/adicionarbanheiro", (req, res) => {
  const nomelocal = req.body.nomelocal.substring(0, 50);
  const endereco = req.body.endereco.substring(0, 300);
  const observacao = req.body.observacao.substring(0, 500);
  const avaliacao = req.body.avaliacao.substring(0, 100);
  const informacao = req.body.informacao.substring(0, 200);
  const latitude = req.body.latitude.substring(0, 10);
  const longitude = req.body.longitude.substring(0, 11);
  const descricao =
    nomelocal +
    ", " +
    endereco +
    "<br><br> Observação: " +
    observacao +
    ` <br><br> <a href=https://www.google.com.br/maps/search/` +
    latitude +
    "+" +
    longitude +
    " target=_blank> Visualize no Google Maps </a> <br><br>" +
    avaliacao +
    informacao;
  execSQLQuery(
    `INSERT INTO banheiros (latitude, longitude, descricao, nomelocal, endereco, observacao, avaliacao, informacao) VALUES ('${latitude}','${longitude}','${descricao}','${nomelocal}','${endereco}','${observacao}','${avaliacao}','${informacao}')`,
    res
  );
});

router.post("/alexa", (req, res) => {
  var latUser = req.body.latUser;
  var lngUser = req.body.lngUser;
  const dist = 10;
  execSQLQuery(
    `SELECT latitude, longitude, nomelocal, endereco, informacao, observacao, avaliacao, (6371 * acos(cos(radians(${latUser})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${lngUser}) ) + sin(radians(${latUser})) * sin(radians(latitude)))) AS distancia FROM banheiros HAVING distancia < ${dist} ORDER BY distancia`,
    res
  );
});

router.post("/reportar", (req, res) => {
  const nomelocal = req.body.nomelocal.substring(0, 50);
  const endereco = req.body.endereco.substring(0, 300);
  const latitude = req.body.latitude.substring(0, 10);
  const longitude = req.body.longitude.substring(0, 11);
  const categorias = req.body.categorias.substring(0, 100);
  const descricao = req.body.descricao.substring(0, 700);
  execSQLQuery(
    `INSERT INTO erros (latitude, longitude, descricao, nomelocal, categorias, endereco) VALUES ('${latitude}','${longitude}','${descricao}','${nomelocal}','${categorias}','${endereco}')`,
    res
  );
});

router.get("*", function (req, res) {
  res.status(404).send("Página não encontrada!");
});

app.use("/", router);

app.listen(port);

console.log("API funcionando!");

function execSQLQuery(sqlQry, res) {
  const connection = mysql.createConnection({
    host: "mysql18-farm76.kinghost.net",
    user: "toiletfy",
    password: "320798lucas",
    database: "toiletfy",
  });

  connection.query(sqlQry, function (error, results, fields) {
    if (error) res.json(error);
    else res.json(results);
    connection.end();
    console.log("executou!");
  });
}
