// Seleção de elementos
const form = document.getElementById("form")
const textArea = document.getElementById("textAlunos")
const clearButton = document.getElementById("clearButton")
const pullButton = document.getElementById("pullButton")
const progressBar = document.getElementById("progressBar")
const Search = document.getElementById("inputSearch").value
let alunos = [] // Array para armazenar os alunos
let fullID = gerarIDUnico()

// Gerador de ID
function gerarIDUnico() {
  const timestamp = new Date().getTime().toString(36)
  const random = Math.random().toString(36).substring(2, 15)
  return timestamp + random
}

// modifica a primeira letra para maiuscula
function capitalizeFirstLetter(text) {
  if (typeof text !== "string") {
    return ""
  }
  return text
    .toLowerCase()
    .split(" ")
    .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(" ")
}

// Exemplo:
// alunos = [
//   {
//     nome: "Guilherme",
//     idade: 25,
//     materia: "JavaScript",
//     tempo: "2 anos",
//   },
//   {
//     nome: "Pamela",
//     idade: 22,
//     materia: "HTML e CSS",
//     tempo: "1 ano e meio",
//   },
//   {
//     nome: "Leandro",
//     idade: 28,
//     materia: "React",
//     tempo: "3 anos",
//   },
//   {
//     nome: "Douglas",
//     idade: 30,
//     materia: "TypeScript",
//     tempo: "2 anos e meio",
//   },
// ]

// Evento de envio do formulário
form.addEventListener("submit", function (ev) {
  ev.preventDefault()

  // Captura e formata o valor do input "nome"
  let nomeInput = document.getElementById("inputName").value.trim()
  let capitalizedName = capitalizeFirstLetter(nomeInput)

  // Captura dos valores dos inputs
  const aluno = {
    nome: capitalizedName,
    id: gerarIDUnico(),
    idade: document.getElementById("inputAge").value.trim(),
    materia: document.getElementById("inputMatter").value.trim(),
    tempo: document.getElementById("inputStudyTime").value.trim(),
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
        `Nome: ${aluno.nome}\nId: ${aluno.id}\nIdade: ${aluno.idade}\nMatéria: ${aluno.materia}\nTempo de estudos: ${aluno.tempo}\n\n`
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
      progressBar.style.background = "none"
      setTimeout(() => {
        progressBar.style.width = "0%"
      }, 500)
    }, 1000)
  }, 2000)
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

// Busca de aluno
document.getElementById("buttonSearch").addEventListener("click", function () {
  const nomeBuscado = document
    .getElementById("inputSearch")
    .value.trim()
    .toLowerCase()

  if (!nomeBuscado) {
    alert("Digite um nome para buscar!")
    return
  }

  startLoading() // Inicia animação da barra de progresso

  setTimeout(() => {
    const alunoEncontrado = alunos.find(
      (aluno) => aluno.nome.toLowerCase() === nomeBuscado
    )

    textArea.value = "" // Limpa a área de texto

    if (alunoEncontrado) {
      document.getElementById("inputSearch").value = ""
      textArea.value = `Nome: ${alunoEncontrado.nome}\nId: ${aluno.id}\nIdade: ${alunoEncontrado.idade}\nMatéria: ${alunoEncontrado.materia}\nTempo de estudo: ${alunoEncontrado.tempo}\n\n`
    } else {
      textArea.value = "Aluno não encontrado!"
    }

    clearButton.style.display = "inline-block" // Exibe o botão "Apagar"
  }, 2000)
})
