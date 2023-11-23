const { addKeyword } = require("@bot-whatsapp/bot");
const { readFileSync } = require("fs");
const { join } = require("path");
const delay = (ms) => new Promise((res =>  setTimeout(res, ms)))

/**
 * Recuperamos el prompt "VENDEDOR"
 */
const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, "01_VENDEDOR.txt"), "utf-8");
  return text;
};

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */
module.exports = {
  flowVentas: (chatgptClass) => {
    return addKeyword(["1", "Combo", "Nueva PC", "comprar", "nuevo pedido"], {
      sensitive: true,
    })
      .addAction(async (ctx, {flowDynamic}) => {
        await flowDynamic("Ok, te transfiero a un agente de ventas!");

        const data = await getPrompt();
        await chatgptClass.handleMsgChatGPT(data);
        const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
        await flowDynamic(textFromAI.text);
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
