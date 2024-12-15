/* IMPORTANDO OS AUDIOS */
// const shapeFreezeAudio = new Audio("./assets/audios/audios_tetraminoFreeze.wav")
// const completedLineAudio = new Audio("./assets/audios/audios_completedLine.wav")
// const gameOverAudio = new Audio("GEOMETRICPUZZLE/assets/audios/audios_gameOver.wav")


/* CORES */
const colors = ["blue", "yellow", "red", "orange", "pink", "green", "purple"]
let currentColor = Math.floor(Math.random() * colors.length)
let nextColor = Math.floor(Math.random() * colors.length)


// Shapes
const gridWidth = 10


const lShape = [
  [1, 2, gridWidth + 1, gridWidth*2 + 1], //primeira rotação
  [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth*2 + 2], //segunda rotação
  [1, gridWidth + 1, gridWidth*2, gridWidth*2 + 1], //terceira rotação
  [gridWidth, gridWidth*2, gridWidth*2 + 1, gridWidth*2 + 2] //quarta rotação
]


const zShape = [
  [gridWidth + 1, gridWidth + 2, gridWidth*2, gridWidth*2 + 1],
  [0, gridWidth, gridWidth + 1, gridWidth*2 + 1],
  [gridWidth + 1, gridWidth + 2, gridWidth*2, gridWidth*2 + 1],
  [0, gridWidth, gridWidth + 1, gridWidth*2 + 1]
]


const tShape = [
  [1, gridWidth, gridWidth + 1, gridWidth + 2],
  [1, gridWidth + 1, gridWidth + 2, gridWidth*2 + 1],
  [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth*2 + 1],
  [1, gridWidth, gridWidth + 1, gridWidth*2 + 1]
]


const oShape = [
  [0, 1, gridWidth, gridWidth + 1],
  [0, 1, gridWidth, gridWidth + 1],
  [0, 1, gridWidth, gridWidth + 1],
  [0, 1, gridWidth, gridWidth + 1]
]


const iShape = [
  [1, gridWidth + 1, gridWidth*2 + 1, gridWidth*3 + 1],
  [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3],
  [1, gridWidth + 1, gridWidth*2 + 1, gridWidth*3 + 1],
  [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3]
]


const allShapes = [lShape, zShape, tShape, oShape, iShape] //todos as peças


let currentPosition = 3 // onde os quadradinhos se iniciam, três divs para a direita
let currentRotation = 0 // rotação inicial (primeira rotação)
let randomShape = Math.floor(Math.random() * allShapes.length) // escolhe um número aleatório de acordo o numero de elementos na lista allshapes
let currentShape = allShapes[randomShape][currentRotation] // peça escolhida aleatoriamente pelo random na rotação inicial definada acima, 0
let $gridSquares = Array.from(document.querySelectorAll(".grid div")) // $ -> elemento do html já criado
  // transformamos em uma Array para podermos utilizar a função splice na verificação de linha completada


function draw() {
  currentShape.forEach(squareIndex => { //pega cada quadradinho e
    $gridSquares[squareIndex + currentPosition].classList.add("shapePainted", `${colors[currentColor]}`) //adiciona uma classe de "shapePainted", alterandoo assim para o definido no css
  })
}
draw()


function undraw() {
  currentShape.forEach(squareIndex => {
    $gridSquares[squareIndex + currentPosition].classList.remove("shapePainted", `${colors[currentColor]}`) // mesma coisa do draw(), porém ao invés de add a class "shapePainted", a remove
  })
}


/* PRÓXIMA PEÇA */
const $miniGridSquares = document.querySelectorAll(".mini-grid div")
let miniGridWidth = 7
let nextPosition = 2
const possibleNextShapes = [
  [1, 2, miniGridWidth + 1, miniGridWidth*2 + 1],
  [miniGridWidth + 1, miniGridWidth + 2, miniGridWidth*2, miniGridWidth*2 + 1],
  [1, miniGridWidth, miniGridWidth + 1, miniGridWidth + 2],
  [0, 1, miniGridWidth, miniGridWidth + 1],
  [1, miniGridWidth + 1, miniGridWidth*2 + 1, miniGridWidth*3 + 1]
]


let nextRandomShape = Math.floor(Math.random() * possibleNextShapes.length)


function displayNextShape() {
  $miniGridSquares.forEach(square => square.classList.remove("shapePainted", `${colors[nextColor]}`))
  nextRandomShape = Math.floor(Math.random() * possibleNextShapes.length)
  nextColor = Math.floor(Math.random() * colors.length)


  const nextShape = possibleNextShapes[nextRandomShape]
  nextShape.forEach(squareIndex =>
    $miniGridSquares[squareIndex + nextPosition + (2*miniGridWidth)].classList.add("shapePainted", `${colors[nextColor]}`)
  )
}
displayNextShape()






// setInterval(moveDown, 700)
let timeMoveDown = 700; // velocidade que ele desce
let timerId = null;
const $startButton = document.getElementById("start-button");
const $pauseButton = document.getElementById("pause-button");
const $popup = document.getElementById("popup");
const $resumeButton = document.getElementById("resume-button");
const $restartPopupButton = document.getElementById("restart-popup-button");
const $homeButton = document.getElementById("home-button");
const overlay = document.querySelector(".overlay");


$startButton.addEventListener("click", () => {
  if (!timerId) {
    timerId = setInterval(moveDown, timeMoveDown); //
    $startButton.disabled = true;
    $pauseButton.disabled = false;
  }
});


$pauseButton.addEventListener("click", () => {
  overlay.style.display = "block";
  clearInterval(timerId); // para de executar o timerId..
  timerId = null; //tornando o timerId nulo
  $popup.classList.remove("hidden");
  $grid.classList.add("paused");
});


$resumeButton.addEventListener("click", () => {
  overlay.style.display = "none";
  timerId = setInterval(moveDown, timeMoveDown);
  $popup.classList.add("hidden");
  $grid.classList.remove("paused");
});


$restartPopupButton.addEventListener("click", () => {
  window.location.reload(); // atualiza a página
});


$homeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});


/* MOVIMENTAÇÃO - PEÇA DESCENDO*/
function moveDown() {
  freeze() // verificando se precisa parar ou não


  undraw() // desdesenha
  currentPosition += 10 // vai para a div de baixo (na matrix)
  draw() // desenha novamente a peça
}


/* PONTOS - SCORE */
const $score = document.querySelector(".score")
let score = 0

const $level = document.querySelector(".nivel")
let level = 1


function updateScore(updateValue) {
  score += updateValue
  $score.textContent = score // alterando no html o score
  

  clearInterval(timerId)
  if (score <= 450) {
    timeMoveDown = 500
  }
  else if (450 < score && score <= 1000) {
    timeMoveDown = 400
    level = 2
  } else if (1000 < score && score <= 1700) {
    timeMoveDown = 300
    level = 3
  } else if (1700 < score && score <= 2700) {
    timeMoveDown = 200
    level = 4

  } else if (2700 < score && score <= 3850) {
    timeMoveDown = 150
    level = 5

  } else {
    timeMoveDown = 110
    level = 6

  }
  $level.textContent = level

  timerId = setInterval(moveDown, timeMoveDown)
}




/* VERIFICAÇÃO DE LINHA COMPLETADA */


const $line = document.querySelector(".linhaQuebrada")
let line = 0


function updateLine(updateValue){
  line+=updateValue;
  $line.textContent = line


}


let $grid = document.querySelector(".grid")


function checkIfRowIsFilled() { // verificação linha a linha


  for (var row = 0; row < $gridSquares.length; row += gridWidth) {
    let currentRow = []


    for (var square = row; square < row + gridWidth; square++) {
      currentRow.push(square)
    }


    const isRowPainted = currentRow.every(square =>
      $gridSquares[square].classList.contains("shapePainted")


    )


    if (isRowPainted) {
      const squaresRemoved = $gridSquares.splice(row, gridWidth)
     
      // Remova todas as classes de cor e 'shapePainted'
      squaresRemoved.forEach(square => {
        square.classList.remove("filled")
        square.classList.remove("shapePainted")
        colors.forEach(color => square.classList.remove(color)) // Removendo qualquer cor restante
      })


      // Atualize o grid com as linhas removidas reposicionadas no topo
      $gridSquares = squaresRemoved.concat($gridSquares)
      $gridSquares.forEach(square => $grid.appendChild(square))


      // Atualiza o score e linha
      updateLine(1)
      updateScore(100)
     
      completedLineAudio.play() // tocando o áudio de linha completada
    }
  }


}


// Função para garantir que todos os quadrados sem "shapePainted" também não tenham a classe "filled"
function removeEmptyFilledClasses() {
  for (var square = 0; square < $gridSquares.length; square++) {
    // Ignorar as divs nas posições de 201 a 210
    if (square >= 200 && square <= 210) {
      continue; // pula a iteração se o quadrado estiver entre 201 e 210
    }


    // Se o quadrado não tiver "shapePainted", remover a classe "filled"
    if (!$gridSquares[square].classList.contains("shapePainted")) {
      $gridSquares[square].classList.remove("filled");
    }
  }
}


/* GAME OVER */
const $gameover = document.querySelector(".gameover");
const $Btngameover = document.querySelector("#gameoverBotoes");

function gameOver() {
  if (currentShape.some(squareIndex =>
    $gridSquares[squareIndex + currentPosition].classList.contains("filled")
  )) {
    $gameover.style.display = 'block';
    $Btngameover.style.display = 'block';
    overlay.style.display = "block";

    updateScore(-10)
    clearInterval(timerId)
    timerId = null
    $startStopButton.disabled = true
    // gameOverAudio.play()
    $score.innerHTML += "<br />" + "GAME OVER"
  }
}


/* FAZ O QUADRADO PARAR AO FINAL DA TELA */


function freeze() {
  if (currentShape.some(squareIndex => // se algum quadrinho
    $gridSquares[squareIndex + currentPosition + gridWidth].classList.contains("filled") // se + gridWidth -> quadradinho abaixo, tem essa class "filled"
  )) {
   
    checkIfRowIsFilled()


    // se encostar em alguma div com class "filled", então, se torna um "filled", também
    currentShape.forEach(squareIndex => $gridSquares[squareIndex + currentPosition].classList.add("filled"))


    // Criar um novo shape e colocando na posição inicial
    currentPosition = 3
    currentRotation = 0
    randomShape = nextRandomShape
    currentShape = allShapes[randomShape][currentRotation]
    currentColor = nextColor
    draw()
   
    checkIfRowIsFilled()
    removeEmptyFilledClasses()
    
   
    updateScore(10) // quando uma peça para, ganha 10 pts
    // shapeFreezeAudio.play() //tocando o audio
    displayNextShape()


    gameOver()
  }
}


/* FUNÇÕES MOVIMENTAÇÃO */
function moveLeft() {
  // verificação de limite de borda
  const isEdgeLimit = currentShape.some(squareIndex => (squareIndex + currentPosition) % gridWidth === 0) // se o resta divisão de cada número do quadradinho por 10 (gridWidth) = 0
  if (isEdgeLimit) return // se estiver na borda esquerda, impedi o movimento




  const isFilled = currentShape.some(squareIndex =>
    $gridSquares[squareIndex + currentPosition - 1].classList.contains("filled")  // se encostar em algum com a classe "filled"...
  )
  if (isFilled) return // impede o movimento


  undraw() // deaparece
  currentPosition -= 1 // diminui uma div, indo para a esquerda
  draw() // desenha novamante
}


function moveRight() {
  const isEdgeLimit = currentShape.some(squareIndex => (squareIndex + currentPosition) % gridWidth === gridWidth - 1) // se o resto da divisão de cada número do quadradinho por 10 (gridWidth) = 9
  if (isEdgeLimit) return // se estiver na borda direita, impedi o movimento


  const isFilled = currentShape.some(squareIndex =>
    $gridSquares[squareIndex + currentPosition + 1].classList.contains("filled")
  )
  if (isFilled) return


  undraw()
  currentPosition += 1 // aumenta uma div, indo para a direita
  draw()
}


function previousRotation() { //verificação para rotação
  if (currentRotation ===  0) {
    currentRotation = currentShape.length - 1
  } else {
    currentRotation --
  }
  currentShape = allShapes[randomShape][currentRotation]
}


function rotate() {
  undraw()


  if (currentRotation === currentShape.length - 1) {
    currentRotation = 0 // se estiver na ultima rotação, volta para a primeira rotação
  } else {
    currentRotation += 1 // se não estiver na última rotação, vai para a próxima
  }


  currentShape = allShapes[randomShape][currentRotation] //atualiza a peça na nova rotação


  const isLeftEdgeLimit = currentShape.some(squareIndex => (squareIndex + currentPosition) % gridWidth === 0) //se está no limite direito
  const isRightEdgeLimit = currentShape.some(squareIndex => (squareIndex + currentPosition) % gridWidth === 9) //se está no limite esquerdo
  if (isLeftEdgeLimit && isRightEdgeLimit) { // se estiver quebrando...
    previousRotation() // "não deixa a rotação acontecer"
  }


  const isFilled = currentShape.some(squareIndex =>
    $gridSquares[squareIndex + currentPosition].classList.contains("filled")
  )
  if (isFilled) { // se for bater em outra peça
    previousRotation() // não deixa rotacionar
  }


  draw()
}


/* MOVIMENTAÇÃO - TECLADO */
document.addEventListener("keydown", controlKeyboard)
function controlKeyboard(event) {
  if (timerId) { // só movimenta, de não estiver pausado


    if (event.key === "ArrowLeft") {
      moveLeft()
    } else if (event.key === "ArrowRight") {
      moveRight()
    } else if (event.key === "ArrowDown") {
      moveDown()
    } else if (event.key === "ArrowUp") {
      rotate()
    }


  }
}


/* MOVIMENTAÇÃO - BOTÕES NA TELA */
const mobileButtons = document.querySelectorAll(".mobile-buttons-container button")
const telaButtons = document.querySelectorAll(".tela-buttons-container button")


  mobileButtons.forEach(button => button.addEventListener("click", () => {
    if (timerId) {
      if (button.classList[0] === "left-button") {
        moveLeft()
      } else if (button.classList[0] === "right-button") {
        moveRight()
      } else if (button.classList[0] === "down-button") {
        moveDown()
      } else if (button.classList[0] === "rotate-button") {
        rotate()
      }
    }
  }))


  telaButtons.forEach(button => button.addEventListener("click", () => {
    if (timerId) {
      if (button.classList[0] === "left-button") {
        moveLeft()
      } else if (button.classList[0] === "right-button") {
        moveRight()
      } else if (button.classList[0] === "down-button") {
        moveDown()
      } else if (button.classList[0] === "rotate-button") {
        rotate()
      }
    }
  }))


  let btnGameoverHome = document.querySelector("#homeGameover");
  let btnGameoverRestart = document.querySelector("#restartGameover");
  
  
  btnGameoverHome.addEventListener("click", 
    function(){
      window.location.href = "index.html";
    }
  );
  
  btnGameoverRestart.addEventListener("click", 
    function(){
      window.location.reload();
    }
  );
  
