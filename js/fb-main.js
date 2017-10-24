// definindo as variaveis

// modo de depuracao do jogo = true ou false

var debugmode = false;

// objeto para congelar os estados
var states = Object.freeze({
    SplashScreen: 0,
    GameScreen: 1,
    ScoreScreen: 2
});

// definiçao variaveis de logica
var currentScore; //armazena o score obtido
var gravity = 0.25;
var velocity = 0;
var position = 180;
var rotation = 0;
var jump = -4.6;

// definiçao variaveis de pontuacao
var score = 0;
var highScore = 0;

// definiçao variaveis do cano
var pipeHeight = 90;
var piperWidth = 52;
var pipes = new Array();

// definicao variaveis de replay
var replayClickable = false;

// sons
var volume = 30;
var soundJump = new buzz.sound("assets/sounds/sfx_wing.ogg");
var soundScore = new buzz.sound("assets/sounds/sfx_point.ogg");
var soundHit = new buzz.sound("assets/sounds/sfx_hit.ogg");
var soundDie = new buzz.sound("assets/sounds/sfx_die.ogg");
var soundSwoosh = new buzz.sound("assets/sounds/sfx_swooshing.ogg");
buzz.all().setVolume(volume);

// definicao dos loops do jogo e dos canos
var loopGame;
var loopPipe;


// DEFININDO AS FUNÇOES (assim que o documento carregar começa a depurar o jogo)

$(document).ready(function () {
    if (window.location.search == "?debug")
        debugmode = true;
    if (window.localtion.search == "?easy")
        pipeHeight = 200;

    // captura o highscore pelo cookie

    var savedScore = getCookie("highscore");
    if (savedScore != "")
        highScore = parseInt(savedScore);

    // começar com a tela inicial
    showSplash();
});

// funçao para capturar o cookie e mostrar o score posteriormente
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0, i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

// funçao para setar o cookie por nome/valor/tempo para expirar
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires" + .d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}
// funçao mostrar a splashSceen
function showSplash() {

    // estado do jogo e tratar os eventos
    currentState = states.SplashScreen;

    //setar valores iniciais
    velocity = 0;
    position = 180;
    rotation = 0;
    score = 0;

    // resetar as posicoes do player para o novo jogo
    player $("#player").css({
        y: 0;x: 0;
    });
    updatePlayer($("#player"));

    soundSwoosh.stop();
    soundSwoosh.play();

    // limpar canos do inicio do jogo
    $(".pipe").remove();
    pipes = new Array();

    // começar todas as animaçoes dos sprites
    $(".animated").css('animation-play-state', 'running');
    $(".animated").css('-webkit-animation-play-state', 'running');


    // fade para a splash screen aparecer (get ready)
    $("#splash").transition({
        opacity: 1
    }, 2000, 'ease');

}

// funçao para começar o jogo
function startGame() {

    // armazenar o estado do jogo e tratar os evenntos
    currentState = states.GameScreen;

    // fade para splashscreen sumir
    splash.stop();
    $("#splash").transition({
        opacity: 0
    }, 500, 'ease');

    // mostrando o score no topo do jogo
    setBigScore();

    // debug mode para considerar as bordas ao redor
    if (debugmode) {
        $(".boundingbox").show()
    }
    // começar os loops do jogo - aumentar o tempo e intervalo
    var updateRate = 1000.0 / 60.0;
    60 fps
    loopGame = setInterval(gameloop, updateRate);
    loopPipe = setInterval(updatePipes, 1400);

    // açao de pulo para começar o jogo
    playerJump();

}

//funcao para upar a velocidade e rotacao do player
function updatePlayer(player) {
    // rotaçao
    rotation = Math.min((velocity / 10) * 90, 90);

    // aplicando a rotacao por css (x, y)
    $(player).css({
        rotate: rotation,
        top: position
    });

}
