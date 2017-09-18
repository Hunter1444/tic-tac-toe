(function(){
  let currentPlayer = "cross";
  let circleFigure = document.querySelector('.template_circe svg');
  let crossFigure = document.querySelector('.template_cross svg');
  let gameField = document.querySelector('table');
  let gameStep = 1;
  let cellCount = gameField.querySelectorAll('td').length;

  gameField.onclick = gameLogic;

  function gameLogic(e){
    let cell = e.target;
    if(cell.tagName === "TD" && cell.classList.contains('active') === false){
      let cellColumnIndex = cell.getAttribute('data-column');
      let cellRowIndex = cell.getAttribute('data-row');
      cell.classList.add('active');
      cell.classList.add(currentPlayer);

      winCheck(cellRowIndex, cellColumnIndex, currentPlayer);

      currentPlayer === "circle" ? cell.append(circleFigure.cloneNode(true)) : cell.append(crossFigure.cloneNode(true));
      currentPlayer === "cross" ? currentPlayer = "circle" : currentPlayer = "cross";
      gameStep++;
    }
  }

  function winCheck(cellRowIndex, cellColumnIndex, currentPlayer){
    if(rowCheck(cellRowIndex, currentPlayer) || columnCheck(cellColumnIndex, currentPlayer) || inclinedCheck(cellRowIndex, cellColumnIndex, currentPlayer)){
      let playerNameRUS;
      currentPlayer === 'cross' ? playerNameRUS = 'Крестики' : playerNameRUS = 'Нолики'
      setTimeout(function(){
        let newGame = confirm(`${playerNameRUS} победили, начать новую игру?`);
        if(newGame) startNewGame();
      }, 700);
      gameField.onclick = null;
    } else if(gameStep === cellCount){
      setTimeout(function(){
        let newGame = confirm('Ничья, начать новую игру?');
        if(newGame) startNewGame();
      }, 700);
    }
  }

  function rowCheck(cellRowIndex, currentPlayer){
    let cells = document.querySelectorAll(`td[data-row='${cellRowIndex}']`);
    let bool = [].every.call(cells, function(item, index){
      return item.classList.contains(currentPlayer)
    })

    if(bool) drawWinLine(cells)

    return bool;
  };

  function columnCheck(cellColumnIndex, currentPlayer){
    let cells = document.querySelectorAll(`td[data-column='${cellColumnIndex}']`);
    let bool = [].every.call(cells, function(item, index){
      return item.classList.contains(currentPlayer)
    })

    if(bool) drawWinLine(cells)

    return bool;
  };

  function inclinedCheck(cellRowIndex, cellColumnIndex, currentPlayer){
    let bool;
    let cells = [];

    function oneDirection(){
      for(let i = 1; i < 4; i++){
        cells.push(document.querySelector(`td[data-column='${i}'][data-row='${i}']`));
      }

      bool = [].every.call(cells, function(item, index){
        return item.classList.contains(currentPlayer)
      })

      if(bool){
        if(bool) drawWinLine(cells)
        return bool
      } else{

        let b = 4;
        let cells = [];
        for(let i = 1; i < 4; i++){
          b--;
          cells.push(document.querySelector(`td[data-column='${i}'][data-row='${b}']`));
        }

        bool = [].every.call(cells, function(item, index){
          return item.classList.contains(currentPlayer)
        })

        if(bool) drawWinLine(cells)

        return bool
      }
    }

    return oneDirection()
  };



  function drawWinLine(elements){
    [].forEach.call(elements, function(item){
      item.classList.add('line');
    })
  };

  function startNewGame(){
    let elements = gameField.querySelectorAll('td');
    [].forEach.call(elements, function(item){
      item.setAttribute('class', null);
      item.innerHTML = '';
      gameStep = 1;
      gameField.onclick = gameLogic;
    })
  }

})()
