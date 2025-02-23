// Seleção de elementos
const form = document.getElementById("form")
const textArea = document.getElementById("textAlunos")
const clearButton = document.getElementById("clearButton")
const pullButton = document.getElementById("pullButton")
const progressBar = document.getElementById("progressBar")
const Search = document.getElementById("inputSearch").value
let alunos = [] // Array para armazenar os alunos

alunos = [
  {
    nome: "Guilherme",
    idade: 25,
    materia: "JavaScript",
    tempo: "2 anos",
  },
  {
    nome: "Pamela",
    idade: 22,
    materia: "HTML e CSS",
    tempo: "1 ano e meio",
  },
  {
    nome: "Leandro",
    idade: 28,
    materia: "React",
    tempo: "3 anos",
  },
  {
    nome: "Douglas",
    idade: 30,
    materia: "TypeScript",
    tempo: "2 anos e meio",
  },
]

// Evento de envio do formulário
form.addEventListener("submit", function (ev) {
  ev.preventDefault()

  // Captura dos valores dos inputs
  const aluno = {
    nome: document.getElementById("inputName").value,
    idade: document.getElementById("inputAge").value,
    materia: document.getElementById("inputMatter").value,
    tempo: document.getElementById("inputStudyTime").value,
  }

  alunos.push(aluno) // Adiciona o aluno ao array

  // Limpa os campos do formulário e foca no primeiro input
  form.reset()
  document.getElementById("inputName").focus()
})

// Evento do botão "Puxar"
pullButton.addEventListener("click", function () {
  let texto = alunos
    .map(
      (aluno) =>
        `Nome: ${aluno.nome},\nIdade: ${aluno.idade},\nMatéria: ${aluno.materia},\nTempo de estudos: ${aluno.tempo}\n\n`
    )
    .join("")
  startLoading() // Inicia a animação da barra de progresso

  setTimeout(() => {
    textArea.value = ""
    textArea.value += texto
    clearButton.style.display = "inline-block" // Exibe o botão "Apagar"
  }, 2000)
})

// Função de animação da barra de progresso
function startLoading() {
  progressBar.style.background = "#007bff"
  progressBar.style.width = "0%"

  // Anima a barra de progresso
  setTimeout(() => {
    progressBar.style.width = "100%"
  }, 10)

  setTimeout(() => {
    progressBar.style.background = "#00ff00" // Muda para verde ao concluir

    setTimeout(() => {
      progressBar.style.width = "0%"
    }, 500)

    setTimeout(() => {
      progressBar.style.background = "none"
    }, 1000)
  }, 2030)
}

// Evento do botão "Apagar"
clearButton.addEventListener("click", function () {
  if (textArea.value.trim() === "") {
    clearButton.style.display = "none"
    return
  }

  textArea.value = "" // Limpa a textArea
  clearButton.style.display = "none" // Oculta o botão "Apagar"

  setTimeout(() => {
    document.getElementById("inputName").focus()
  }, 1000)
})

// Oculta o botão "Apagar" ao carregar a página
clearButton.style.display = "none"
