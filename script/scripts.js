import selecionaCotacao from "./imprimiCotacao.js"

// pegando o canvas
const graficoDolar = document.getElementById("graficoDolar");

// fazendo o grafico com o canvas
const graficoParaDolar = new Chart(graficoDolar, {
    type: "line",
    data: {
        labels: [],
        datasets: [
            {
                label: "Dólar",
                data: [],
                borderWidth: 1,
            },
        ],
    },
});

// pegando o horario atual
function geraHorario() {
  let data = new Date();
  let horario = data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds() 
  console.log(horario)

  // return pois esse valor será armazenado em uma variável
  return horario
}

// adicionando dados
function adicionarDados(grafico, legenda, dados) {
  grafico.data.labels.push(legenda)
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(dados)
  })

  // update é da biblioteca
  grafico.update();
}

// worker serve para executar threads em segundo plano na web
// diretório do worker precisa ser desde a raiz do projeto, aqui estou falando para o arquivo do diretório trabalhar como worker
let workerDolar = new Worker('./script/workers/workerDolar.js')

// mandando msg pro worker
workerDolar.postMessage('usd')

// quando worker receber message
workerDolar.addEventListener('message', event => {
  console.log(event)
  let tempo = geraHorario()
  let valor = event.data.ask
  selecionaCotacao("dolar", valor)
  adicionarDados(graficoParaDolar, tempo, valor)
})

const graficoEuro = document.getElementById('graficoEuro')
const graficoParaEuro = new Chart(graficoEuro, {
    type: "line",
    data: {
        labels: [],
        datasets: [
            {
                label: "Euro",
                data: [],
                borderWidth: 1,
            },
        ],
    },
})

// worker serve para executar threads em segundo plano na web
// diretório do worker precisa ser desde a raiz do projeto, aqui estou falando para o arquivo do diretório trabalhar como worker
let workerEuro = new Worker('./script/workers/workerEuro.js')

// mandando msg pro worker
workerEuro.postMessage('euro')

// quando worker receber message
workerEuro.addEventListener('message', event => {
  let tempo = geraHorario()
  let valor = event.data.ask
  selecionaCotacao("euro", valor)
  adicionarDados(graficoParaEuro, tempo, valor)
})

const graficoPeso = document.getElementById("graficoPeso")
const graficoParaPeso = new Chart(graficoPeso, {
    type: "line",
    data: {
        labels: [],
        datasets: [
            {
                label: "Peso Argentino",
                data: [],
                borderWidth: 1,
            },
        ],
    },
})

// worker serve para executar threads em segundo plano na web
// diretório do worker precisa ser desde a raiz do projeto, aqui estou falando para o arquivo do diretório trabalhar como worker
let workerPeso = new Worker('./script/workers/workerPeso.js')

// mandando msg pro worker
workerPeso.postMessage('peso argentino')

// quando worker receber message
workerPeso.addEventListener('message', event => {
  console.log(event)
  let tempo = geraHorario()
  let valor = event.data.ask
  selecionaCotacao('peso argentino', valor)
  adicionarDados(graficoParaPeso, tempo, valor)
})

