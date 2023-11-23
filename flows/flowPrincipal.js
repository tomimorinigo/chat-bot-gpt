const { addKeyword} = require("@bot-whatsapp/bot");

const flowPrincipal = addKeyword(['Hola', 'alo', 'Buen dia', 'buenas tardes', 'buenas noches', 'como andas'])
  .addAnswer(
    "Bivenido a *JM COMPUTACION*",
    "Armado y Servicio de Computadoras"
  )
  .addAnswer(
    [
        "¿Como podemos ayudarte?",
        "",
        "*1* Quiero una nueva PC",
        "*2* Necesito un servicio",
        "*3* Necesito pedir garantía",
    ]
  )  
  .addAnswer('Responda con el número de la opcion!')

module.exports = flowPrincipal;