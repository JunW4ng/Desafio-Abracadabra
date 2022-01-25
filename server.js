const express = require("express");
const app = express();
const port = 3000;

const user = [
  "Juan",
  "Jocelyn",
  "Astrid",
  "Maria",
  "Ignacia",
  "Javier",
  "Brian",
];

app.use(express.static("assets"));

//? Devuelve nombres de usuarios
app.get("/abracadabra/usuarios", (_, res) => {
  res.send({ user });
});

//? Valida usuario
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  const paramUser = req.params.usuario;
  user.find((name) => name == paramUser)
    ? next()
    : res.sendFile(__dirname + "/assets/who.jpeg");
});

app.get("/abracadabra/juego/:usuario", (_, res) => {
  res.sendFile(__dirname + "/index.html");
});

//? Validacion de numero
app.get("/abracadabra/conejo/:n", (req, res) => {
  const n = req.params.n;
  const random = Math.floor(Math.random() * (5 - 1)) + 1;
  n == random
    ? res.sendFile(__dirname + "/assets/conejito.jpg")
    : res.sendFile(__dirname + "/assets/voldemort.jpg");
});

app.get("*", (_, res) => {
  res.send("<h1>Esta pagina no existe</h1>");
});

app.listen(port, () => console.log(`Server listening to port ${port}`));
