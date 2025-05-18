// Elementos do login
const login = document.querySelector(".login") // document: documento inteiro
const loginForm = login.querySelector(".login__form") // procura direto na classe login
const loginInput = login.querySelector(".login__input")

// Elementos do chat
const chat = document.querySelector(".chat") // document: documento inteiro
const chatForm = chat.querySelector(".chat__form") // procura direto na classe chat
const chatInput = chat.querySelector(".chat__input")
const chatMessages = chat.querySelector(".chat__messages")

const colors = [
    "cadeteblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
]

const user = { id: "", name: "", color: "" }

let websocket

const createMessageSelfElement = (content) => {
    // Replicação do html 
    const div = document.createElement("div")

    div.classList.add("message--self")
    div.innerHTML = content

    return div // Para usar em outros lugares
}

const createMessageOtherElement = (content, sender, senderColor) => {
    // Replicação do html 
    const div = document.createElement("div")
    const span = document.createElement("span")

    div.classList.add("message--other")

    span.classList.add("message--sender")
    span.style.color = senderColor

    div.appendChild(span) // span filho da div

    span.innerHTML = sender
    div.innerHTML += content // Agregar o conteúdo da mensagem

    return div // Para usar em outros lugares
}

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length) // Com o uso de floor não precisa do -1
    return colors[randomIndex]
}

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior:"smooth"
    })
}

const processMessage = ({ data }) => { // Desestruturação para pegar o valor da chave data do evento
    // Transformação para objeto novamente para poder manipular. Antes estava em string: websocket.send(JSON.stringify(message))
    const { userId, userName, userColor, content } = JSON.parse(data)

    let message;

    if (userId == user.id) {
        message = createMessageSelfElement(content)
    } else {
        message = createMessageOtherElement(content, userName, userColor)
    }

    chatMessages.appendChild(message) // Filho da section
    scrollScreen()

    
}


const handleLogin = (event) => {
    event.preventDefault() // Para nao reiniciar a página

    user.id = crypto.randomUUID() // id aleatório
    user.name = loginInput.value
    user.color = getRandomColor()

    login.style.display = "none" // AQUI VAI A APIIIIIIII
    chat.style.display = "flex"

    websocket = new WebSocket("ws://localhost:8080") // Cria conexão com o servidor
    websocket.onmessage = processMessage // .onmessage: servidor envia mensagem

}

const sendMessage = (event) => {
    event.preventDefault()

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value // Mensagem
    }

    websocket.send(JSON.stringify(message)) // Envia ao servidor o conteúdo do chat em forma de string

    chatInput.value = "" // Limpa o input depois de enviar a mensagem
}

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit", sendMessage)