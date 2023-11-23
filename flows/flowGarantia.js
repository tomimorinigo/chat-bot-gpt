const { addKeyword } = require("@bot-whatsapp/bot");
const { readFileSync } = require("fs");
const { join } = require("path");
// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Recuperamos el prompt "GARANTIA"
 */
const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, "03_GARANTIA.txt"), "utf-8");
  return text;
};

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */
module.exports = {
  flowGarantia: (chatgptClass) => {
    return addKeyword(["3", "Garantia", "devolucion", "falla", "problema"], {
      sensitive: true,
    }).addAction(async (ctx, {flowDynamic}) => {
        await flowDynamic('Ok, te transfiero a un agente de garantía!')

        const data = await getPrompt(); // CARGAMOS EL PROMPT
        await chatgptClass.handleMsgChatGPT(data); // SE LO PASAMOS AL CHAT
        const textFromAI = await chatgptClass.handleMsgChatGPT('Necesito pedir garantía'); // Le pasamos al chat el contenido del mensaje
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
