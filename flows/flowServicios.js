const { addKeyword } = require("@bot-whatsapp/bot");
const { readFileSync } = require("fs");
const { join } = require("path");
// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Recuperamos el prompt "ASISTENTE"
 */
const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, "02_ASISTENTE.txt"), "utf-8");
  return text;
};

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */
module.exports = {
  flowServicios: (chatgptClass) => {
    return addKeyword(["2", "Servicios", "servicio", "mantenimiento", "formateo"], {
      sensitive: true,
    }).addAction(async (ctx, {flowDynamic}) => {
        await flowDynamic('Ok, te transfiero a un agente de servicios!')

        const data = await getPrompt(); // CARGAMOS EL PROMPT
        await chatgptClass.handleMsgChatGPT(data); // SE LO PASAMOS AL CHAT
        const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body); // Le pasamos al chat el contenido del mensaje
        await flowDynamic(textFromAI.text); // Respuesta del Chat
      })
      .addAnswer(
        'Tienes alguna otra duda?',
        { capture: true },
        async (ctx, { fallBack }) => {
          // ctx.body = es lo que la persona escribe!!
          const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
          await fallBack(textFromAI.text);
        }
      );
  },
};
