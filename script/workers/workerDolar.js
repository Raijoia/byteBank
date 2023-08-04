async function conectaAPI() {
  const conecta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL')
  const conectaTraduzido = await conecta.json()
  postMessage(conectaTraduzido.USDBRL)
}

// quando o worker receber a mensagem
addEventListener('message', () => {
  conectaAPI()

  // colocando para atualizar a api a cada 5Segundos
  setInterval(() => conectaAPI(), 5000)
})