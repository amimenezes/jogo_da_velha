//DEIXA A DIV GAME ESCONDIDA
window.onload = function () {
    document.getElementById('game').style.visibility = 'hidden',
        document.getElementById('jogador1').focus()
};

//function mudarParaMaiuscula() {
//    var start = e.target.selectionStart;
//    var end = e.target.selectionEnd;
//    e.target.value = e.target.value.toUpperCase();
//    e.target.setSelectionRange(start, end);
//}

//document.getElementById("jogador1").addEventListener("keyup", forceInputUppercase, false);
//document.getElementById("jogador2").addEventListener("keyup", forceInputUppercase, false);

function Jogador(nome, forma) {
    this.nome = nome;
    this.forma = forma;
}

//var vencedor = false;
var jogador1, jogador2;

//0 - Regex
//1 – (?=.*[0-9]) Verifica se existe um número; ou...
//2 – (?=.*\d) Verifica se existe um número;
//3 – (?=.*[a-z]) Verifica se existe uma letra minúscula;
//4 – (?=.*[A-Z]) Verifica se existe uma letra maiúscula;
//5 – ([a-zA-Z0-9]{8,}) Verifica se existe pelo menos 8 caracteres entre os digitados.

var regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
var regexLetras = /[a-zA-Z]/;
var regexNums = /[0-9]/;

function validarNomeJogador() {
    var pegarNomeGame1 = document.getElementById("jogador1");
    var pegarNomeGame2 = document.getElementById("jogador2");

    /* Verifica 1º input de nome do Jogador 1 */
    if (pegarNomeGame1.value != "") {
        // Validação - Confere se o nome contém mais que 3 caracteres
        if (pegarNomeGame1.value.length < 3) {
            bootbox.alert("Erro: Nome deve conter no mínimo 3 caracteres.");
            pegarNomeGame1.focus();

            return false;
        }

        // Validação - regexNums - Regular Expressão que valida se o nome contém um números
        if (regexNums.test(pegarNomeGame1.value)) {
            bootbox.alert("Erro: Seu nome não deve conter números (0-9)!");
            pegarNomeGame1.focus();

            return false;
        }

        // Validação - regexLetras - Regular Expressão que valida se o nome contém somente letras Maíuscula ou Minúscula
        if (!regexLetras.test(pegarNomeGame1.value)) {
            bootbox.alert("Erro: Seu nome deve conter somente letras (A-Z) ou (a-z)!");
            pegarNomeGame1.focus();

            return false;
        }

        //if (pegarNomeGame2.value == "") {
        //    bootbox.alert("Erro: O nome do Jogador 2 não deve estar em branco!");
        //    pegarNomeGame2.focus();

        //    return false;
        //}

        //else {

        //    return true;
        //}
    }

    else if (pegarNomeGame1.value == "") {
        //alert("teste de terro elsif");
        return false;
    }

    /* Verifica 2º input de nome do Jogador 2 */
    if (pegarNomeGame2.value != "") {
        // Validação - Confere se o nome contém mais que 3 caracteres
        if (pegarNomeGame2.value.length < 3) {
            bootbox.alert("Erro: Nome deve conter no mínimo 3 caracteres.");
            pegarNomeGame2.focus();

            return false;
        }

        // Validação - regexNums - Regular Expressão que valida se o nome contém um números
        if (regexNums.test(pegarNomeGame2.value)) {
            bootbox.alert("Erro: Seu nome não deve conter números (0-9)!");
            pegarNomeGame2.focus();

            return false;
        }

        // Validação - regexLetras - Regular Expressão que valida se o nome contém somente letras Maíuscula ou Minúscula
        if (!regexLetras.test(pegarNomeGame2.value)) {
            bootbox.alert("Erro: Seu nome deve conter somente letras (A-Z) ou (a-z)!");
            pegarNomeGame2.focus();

            return false;
        }

        /* Verifica se os nomes são iguais */
        if (pegarNomeGame1.value == pegarNomeGame2.value) {
            bootbox.alert("Erro: Os nomes devem ser diferentes!");
            pegarNomeGame1.focus();

            return false;
        }

        if (pegarNomeGame1.value == "") {
            bootbox.alert("Erro: O nome do Jogador 1 não deve estar em branco!");
            pegarNomeGame1.focus();

            return false;
        }

        else {
            //     bootbox.alert("Bem-vindo(a) ao jogo. Divirta-se!");

            return true;
        }
    }
    else if (pegarNomeGame2.value == "") {
        //alert("teste de terro elsif");
        return false;
    }
}
//Jogador da rodada
var jogadorAtual;
var formas = ['X', 'O'];
var index = null;

/*
    0 1 2
    3 4 5
    6 7 8
*/
var tabuleiro = new Array(9);

initGame = function () {

    var nomeJogador1 = document.getElementById('jogador1').value;
    var nomeJogador2 = document.getElementById('jogador2').value;

    if (validarNomeJogador() == true) {

        bootbox.alert("Bem-vindo(a) ao jogo. Divirta-se!");

        //var nomeJogador1 = document.getElementById('jogador1').value;
        //var nomeJogador2 = document.getElementById('jogador2').value;
        jogador1 = new Jogador(nomeJogador1, 0); //X
        jogador2 = new Jogador(nomeJogador2, 1); //O

        jogadorAtual = jogador1;
        setLabelJogadorAtual();

        //APOS DEFINIÇÃO DE JOGADORES
        //EXIBE A DIV E INICIA JOGO
        document.getElementById('game').style.visibility = 'visible';
        //Esconde os inputs 'jogador1' e 'jogador2'
        document.getElementById('jogador1').style.visibility = 'hidden';
        document.getElementById('jogador2').style.visibility = 'hidden';
        //Modifica o nome do botão 'Iniciar'
        document.getElementById('botao').innerHTML = "Reiniciar";

    }
    else {
        if (nomeJogador1 == "") {
            bootbox.alert("Jogador 1: Você deve inserir um nome válido para começar a jogar.");
            return false;
        }
        if (nomeJogador2 == "") {
            bootbox.alert("Jogador 2: Você deve inserir um nome válido para começar a jogar.");
            return false;
        }
        return false;
    }
}
/*Reinicia a partida*/
reset = function () { window.location.reload(); }

/*Seta o nome do jogador da rodada na página HTML*/
setLabelJogadorAtual = function () {
    document.getElementById('jogadorAtual').innerHTML = 'Jogador atual:  \n' + jogadorAtual.nome;
}

/*Verifica se o tabuleiro está completamente preenchido, se estiver, significa que ninguém venceu a rodada*/
tabuleiroIsFilled = function () {
    var preenchidos = 0;
    for (var i = 0; i < tabuleiro.length; i++)
        if (tabuleiro[i] != undefined)
            preenchidos++;
    return preenchidos == tabuleiro.length;
}

var vencedor = false;

// Consertar bug do bootbox
//https://stackoverflow.com/questions/26160800/stop-execution-of-js-on-bootbox-alert-opening

/*Verifica a existência de ocorrências de um mesmo elemento(X ou O) nas linhas do tabuleiro, procurando um vencedor*/
allElementsInSomeLine = function () {
    for (var i = 0; i < 7; i += 3) {
        if (tabuleiro[i] == 'X' && tabuleiro[i + 1] == 'X' && tabuleiro[i + 2] == 'X') {
            //vencedor = true;
            bootbox.alert(jogador1.nome + ' Venceu!', function () {
                reset();
                //window.location.reload();
            });
            //setOnCeil();
            //alert(jogador1.nome + ' Venceu!');
            //reset();
            return true;
        }
        if (tabuleiro[i] == 'O' && tabuleiro[i + 1] == 'O' && tabuleiro[i + 2] == 'O') {
            //vencedor = true;
            bootbox.alert(jogador2.nome + ' Venceu!', function () {
                reset();
                //window.location.reload();
            });
            //setOnCeil();
            //alert(jogador2.nome + ' Venceu!');
            //reset();
            return true;
        }
    }
}

/*Verifica a existência de ocorrências de um mesmo elemento(X ou O) nas colunas do tabuleiro, procurando um vencedor*/
allElementsInSomeColumn = function () {
    for (var i = 0; i < 3; i++) {
        if (tabuleiro[i] == 'X' && tabuleiro[i + 3] == 'X' && tabuleiro[i + 6] == 'X') {
            //vencedor = true;
            bootbox.alert(jogador1.nome + ' Venceu!', function () {
                reset();
                //window.location.reload();
            });
            //setOnCeil();
            //alert(jogador1.nome + ' Venceu!');
            //reset();
            return true;
        }
        if (tabuleiro[i] == 'O' && tabuleiro[i + 3] == 'O' && tabuleiro[i + 6] == 'O') {
            //vencedor = true;
            bootbox.alert(jogador2.nome + ' Venceu!', function () {
                reset();
                //window.location.reload();
            });
            //setOnCeil();
            //alert(jogador2.nome + ' Venceu!');
            //reset();
            return true;
        }
    }
}

/*Verifica a existência de ocorrências de um mesmo elemento(X ou O) nas diagonais do tabuleiro, procurando um vencedor*/
allElementsInSomeDiagonal = function () {
    if ((tabuleiro[0] == 'X' && tabuleiro[4] == 'X' && tabuleiro[8] == 'X') ||
          (tabuleiro[2] == 'X' && tabuleiro[4] == 'X' && tabuleiro[6] == 'X')) {
        //vencedor = true;
        bootbox.alert(jogador1.nome + ' Venceu!', function () {
            reset();
            //window.location.reload();
        });
        //setOnCeil();
        //alert(jogador1.nome + ' Venceu!');
        //reset();
        return true;
    } else if ((tabuleiro[0] == 'O' && tabuleiro[4] == 'O' && tabuleiro[8] == 'O') ||
                (tabuleiro[2] == 'O' && tabuleiro[4] == 'O' && tabuleiro[6] == 'O')) {
        //vencedor = true;
        bootbox.alert(jogador2.nome + ' Venceu!', function () {
            reset();
            //window.location.reload();
        });
        //setOnCeil();
        //alert(jogador2.nome + ' Venceu!');
        //reset();
        return true;
    }
}

/*Preenche a célula da tabela HTML escolhida pelo usuário ao clicar, além de cuidar do jogador atual da rodada e chamar as funções
  de verificação de algum ganhador */
setOnCeil = function (cel, pos) {

    if (tabuleiro[pos] == undefined) {
        cel.innerHTML = formas[jogadorAtual.forma];
        tabuleiro[pos] = formas[jogadorAtual.forma];
        //define o jogador da rodada
        (jogadorAtual.forma == 0) ? jogadorAtual = jogador2 : jogadorAtual = jogador1;
        setLabelJogadorAtual();
    } else bootbox.alert('Ops! Esse campo já foi escolhido =/');

    allElementsInSomeLine();
    allElementsInSomeColumn();
    allElementsInSomeDiagonal();

    //if ((allElementsInSomeLine() == true) ||
    //    (allElementsInSomeColumn() == true) ||
    //    (allElementsInSomeDiagonal() == true)) {
    //    reset();
    //}

    //if (tabuleiro[pos] == undefined) {
    //    cel.innerHTML = formas[jogadorAtual.forma];
    //    tabuleiro[pos] = formas[jogadorAtual.forma];

    //    if ((allElementsInSomeLine() == true) ||
    //    (allElementsInSomeColumn() == true) ||
    //    (allElementsInSomeDiagonal() == true)) {
    //        reset();
    //    }
    //    else {
    //        //define o jogador da rodada
    //        (jogadorAtual.forma == 0) ? jogadorAtual = jogador2 : jogadorAtual = jogador1;
    //        setLabelJogadorAtual();
    //    }

    //} else bootbox.alert('Ops! Esse campo já foi escolhido =/');



    //if ((allElementsInSomeLine() == true) ||
    //    (allElementsInSomeColumn() == true) ||
    //    (allElementsInSomeDiagonal() == true)) {
    //    reset();
    //}

    //if (allElementsInSomeColumn()) {
    //    reset();
    //}

    //if (allElementsInSomeDiagonal()) {
    //    reset();
    //}

    if (tabuleiroIsFilled()) {
        bootbox.alert('Não houve vencedor. Tente novamente!', function () {
            //reset();
            window.location.reload();
        });
        //alert('Não houve vencedor. Tente novamente!');
        //reset();
    }
}