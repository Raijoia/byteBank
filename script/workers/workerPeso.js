// quando o worker receber a mensagem
addEventListener('message', event => {
  conectaAPI()

  // colocando para atualizar a api a cada 5Segundos
  setInterval(() => conectaAPI(), 5000)
})

async function conectaAPI() {
  const conecta = await fetch('https://economia.awesomeapi.com.br/json/last/ARS-BRL')
  const conectaTraduzido = await conecta.json()
  postMessage(conectaTraduzido.ARSBRL)
}