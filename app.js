require("dotenv").config();
const {createBot, createProvider, createFlow} = require("@bot-whatsapp/bot");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

/**
 * ChatGPT
 */
const ChatGPTClass = require("./chatgpt.class");
const chatGPT = new ChatGPTClass();

/**
 * Flows
 */
const flowPrincipal = require("./flows/flowPrincipal");
const flowAgente = require("./flows/flowAgente");
const { flowVentas } = require("./flows/flowVentas");
const { flowServicios } = require("./flows/flowServicios");
const { flowGarantia } = require("./flows/flowGarantia");

/**
 * Funcion principal
 */
const main = async () => {
  const adapterDB = new MockAdapter();

  const adapterFlow = createFlow([
    flowPrincipal,
    flowAgente,
    flowVentas(chatGPT),
    flowServicios(chatGPT),
    flowGarantia(chatGPT),
  ]);
  
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

};

main();