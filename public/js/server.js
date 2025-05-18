const { WebSocket, WebSocketServer } = require("ws") 

// Importação da biblioteca
const dotenv = require("dotenv") // 
// Chamar as variáveis definidas no arquivo .env para dentro do Node.js, recebidas pelo process.env
dotenv.config()

/* Instanciar o servidor 
wss = WebSocketServer 
objeto: coleção de pares de chave e valor { port: 8080 }
Objetos JavaScript são estruturas dinâmicas da linguagem.
                         X
JSON é um formato textual para troca de dados.
*/
const wss = new WebSocketServer({port: process.env.APP_PORT || 8080})

// Evento de conexão
wss.on("connection", (ws) => { /* O parâmetro recebe o WebSocket que no caso seria o 
                                cliente que está conectando-se no servidor*. A partir disso
                                será executado o que está dentro das chaves*/
    ws.on("error", console.error)

    
    ws.on("message", (data) => { /* Bloco executado sempre que alguém mandar mensagem "data" representa
                                 o dado que o cliente vai enviar pro servidor. Mensagem enviada para todos, inclusive
                                 a própria pessoa que mandou */
       
        wss.clients.forEach((client) => client.send(data.toString())) /* Atributo clientes: todos os clientes conectados no servidor
                                                                    Conversão toString para melhor manipulação */
    })
    console.log("client connected")
})