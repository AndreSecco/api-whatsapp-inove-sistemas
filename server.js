const express = require("express");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000

const client = new Client({
  authStrategy: new LocalAuth(),
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

app.post("/", (req, res) => {
  console.log("Client is ready!");

  const data = req.body

  const number = "+55" + data.telefone;

  const text = `Olá ${data.nomeMotorista} seu caminhão está pronto`;

  const chatId = number.substring(1) + "@c.us";

  client.sendMessage(chatId, text);

});

client.initialize();

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

client.on("qr", (qr) => {
  // Exiba o QR Code gerado para a autenticação
  console.log("QR Code:", qr);
});

client.on("authenticated", (session) => {
  console.log("Authenticated");
  // Salve as informações da sessão para uso posterior
  // Você pode usar session.toJSON() para salvar em um arquivo
});