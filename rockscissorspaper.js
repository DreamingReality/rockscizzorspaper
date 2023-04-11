var buttonRock;
var buttonScissors;
var buttonPaper;

var buttonComputerRock;
var buttonComputerScissors;
var buttonComputerPaper;

var buttonRestart;

var roundElement;
var gameResultElement;
var roundResultElement;
var userWinsElement;
var computerWinsElement;

var userSelection;
var computerSelection;

var waitComputerAnimation = false;

var waitRestart = false;

var roundNumber = 1;
var userWins = 0;
var computerWins = 0;

const Choice = {
    Rock: 1,
    Scissors: 2,
    Paper: 3,
};

function initialize() {
    buttonRock = document.getElementById('btnRock');
    buttonScissors = document.getElementById('btnScissors');
    buttonPaper = document.getElementById('btnPaper');

    buttonComputerRock = document.getElementById('btnComputerRock');
    buttonComputerScissors = document.getElementById('btnComputerScissors');
    buttonComputerPaper = document.getElementById('btnComputerPaper');

    buttonRestart = document.getElementById('btnRestart');

    roundNumberElement = document.getElementById('roundNumber');
    roundResultElement = document.getElementById('roundResult');
    gameResultElement = document.getElementById('gameResult');

    userWinsElement = document.getElementById('userWins');
    computerWinsElement = document.getElementById('computerWins');

    buttonRock.addEventListener('click', function () {
        setUserSelection(Choice.Rock);
    });
    buttonScissors.addEventListener('click', function () {
        setUserSelection(Choice.Scissors);
    });
    buttonPaper.addEventListener('click', function () {
        setUserSelection(Choice.Paper);
    });

    btnRestart.addEventListener('click', function () {
        restartGame();
    });

    showRound(1);
}

function getRandomChoice() {
    let rand = Math.random();
    let selection;
    if (rand < 0.34) {
        selection = Choice.Rock;
    } else if (rand < 0.67) {
        selection = Choice.Scissors;
    } else {
        selection = Choice.Paper;
    }
    return selection;
}

function selectRandomComputerButton(timeout) {
    let selection = getRandomChoice();
    highlightComputerButton(selection);
    if (timeout < 100) {
        highlightComputerButton(computerSelection);
        showResults();
        waitComputerAnimation = false;
        setTimeout(() => {
            highlightUserButton(null);
        }, 250);
    } else {
        animateComputerSelection(timeout - 80);
    }
}

function getRoundResult() {
    let result;
    if (userSelection === computerSelection) {
        result = 0;
    } else if (
        (userSelection === Choice.Paper && computerSelection === Choice.Rock) ||
        (userSelection === Choice.Rock && computerSelection === Choice.Scissors) ||
        (userSelection === Choice.Scissors && computerSelection === Choice.Paper)
    ) {
        result = 1;
    } else if (
        (userSelection === Choice.Rock && computerSelection === Choice.Paper) ||
        (userSelection === Choice.Scissors && computerSelection === Choice.Rock) ||
        (userSelection === Choice.Paper && computerSelection === Choice.Scissors)
    ) {
        result = -1;
    }
    return result;
}

function getResultMessage(roundResult) {
    let message;
    switch (roundResult) {
        case 0:
            message = 'Tie';
            break;
        case 1:
            message = 'User wins';
            break;
        case -1:
            message = 'Computer wins';
            break;
    }
    return message;
}

function showResults() {
    let roundResult = getRoundResult();
    let message = getResultMessage(roundResult);
    let winClass = '';
    showRoundResult(message);
    roundNumber++;
    showRound(roundNumber);
    if (roundResult === 1) {
        winClass = 'user';
        userWins++;
        showUserWins(userWins);
    } else if (roundResult === -1) {
        winClass = 'computer';
        computerWins++;
        showComputerWins(computerWins);
    }

    if (winClass) {
        roundResultElement.classList.add(winClass);
    } else {
        roundResultElement.classList.remove('user');
        roundResultElement.classList.remove('computer');
    }

    if (userWins >= 2 || computerWins >= 2) {
        gameResultElement.classList.add(winClass);
        showGameResult(message);
        waitRestart = true;
        btnRestart.style.display = '';
    }
}

function showRoundResult(message) {
    roundResultElement.innerText = message;
}

function showGameResult(message) {
    gameResultElement.innerText = message;
}

function showUserWins(message) {
    userWinsElement.innerText = message;
}

function showComputerWins(message) {
    computerWinsElement.innerText = message;
}

function showRound(text) {
    roundNumberElement.innerText = text;
}

function resetState() {
    waitComputerAnimation = false;
    roundNumber = 1;
    userWins = 0;
    computerWins = 0;
    waitRestart = false;
}

function animateComputerSelection(timeout) {
    setTimeout(function () {
        selectRandomComputerButton(timeout);
    }, timeout);
}

function setUserSelection(selection) {
    if (waitComputerAnimation || waitRestart) {
        return;
    }
    waitComputerAnimation = true;
    userSelection = selection;
    highlightUserButton(selection);
    computerSelection = getRandomChoice();

    animateComputerSelection(500);
}

function highlightUserButton(selection) {
    buttonRock.classList.remove('selected');
    buttonScissors.classList.remove('selected');
    buttonPaper.classList.remove('selected');

    switch (selection) {
        case Choice.Rock:
            buttonRock.classList.add('selected');
            break;
        case Choice.Scissors:
            buttonScissors.classList.add('selected');
            break;
        case Choice.Paper:
            buttonPaper.classList.add('selected');
            break;
    }
}

function highlightComputerButton(selection) {
    buttonComputerRock.classList.remove('selected');
    buttonComputerScissors.classList.remove('selected');
    buttonComputerPaper.classList.remove('selected');

    switch (selection) {
        case Choice.Rock:
            buttonComputerRock.classList.add('selected');
            break;
        case Choice.Scissors:
            buttonComputerScissors.classList.add('selected');
            break;
        case Choice.Paper:
            buttonComputerPaper.classList.add('selected');
            break;
    }
}

function restartGame() {
    resetState();

    btnRestart.style.display = 'none';
    showGameResult('');
    showRoundResult('');
    showUserWins('');
    showComputerWins('');
    showRound(roundNumber);
}

initialize();
