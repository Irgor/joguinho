//tamanho de tuo
var quad = 30;

//mundo
var grav = 0.03;
var vel = 0;

//obstaculo
var mov = 600;
var dif = -0.5;
var velb = dif;
var espaco = quad * 2;
var fimb = Math.floor(Math.random() * 510);

//pontuacao e dif
var ptd = 0;
var pts = 0;

//alutra do chao
var chao = 18 * quad;

//variaveis personagen
var px = 2;
var py = fimb + 2;
var vida = 3;

window.onload = (function () {
    document.addEventListener("keydown", function (tecla, ) {
        switch (tecla.keyCode) {
            case 38:
                vel += -vel - 2;
                break;
        }
    })
    setInterval(game, 2);
})




function game() {
    //gravidade
    vel += grav;
    py += vel;

    //alert basico
    //alert("ye");

    // define o canvas e o contexto
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");


    //define o P
    var p = document.getElementById("p");

    //pinta o fundo
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.height, canvas.width);

    //pínta a borda
    ctx.fillStyle = "black"
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, canvas.height, canvas.width);

    //desenha o chao
    ctx.fillStyle = "black";
    ctx.fillRect(0, chao, canvas.width, quad * 2);

    //desenha o personagen
    ctx.fillStyle = "blue";
    ctx.fillRect(px * quad, py, quad, quad);

    //borda personagem
    ctx.fillStyle = " black";
    ctx.lineWidth = 3;
    ctx.strokeRect(px * quad, py, quad, quad);

    //parar o personagem no chao
    if (py > chao - quad) {
        py = chao - quad;
        vel = 0;
    }

    //limite teto
    if (py < 0) {
        py = 0;
    }

    ctx.fillStyle = "green";
    //desenha a barra de cima
    ctx.fillRect(mov, 0, quad + (quad / 2), fimb);

    //desenha a bara de baixo
    ctx.fillRect(mov, fimb + quad * 4, quad + (quad / 2), 510 - fimb);

    //desenha a bora das barras
    ctx.fillStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeRect(mov, 0, quad + (quad / 2), fimb)
    ctx.strokeRect(mov, fimb + quad * 4, quad + (quad / 2), 510 - fimb)

    //atribui velocidade para barra
    mov += dif;

    //constroe outra barra quando a atual some
    if (mov < -(quad + (quad / 2))) {
        mov = 600;
        fimb = Math.floor(Math.random() * 510);
        ptd++;
        pts++;
    }

    //aumenta a dificuldade a cada 10 pontos
    if (ptd == 10) {
        if (dif > -1.6) {
            dif += -0.2;
            ptd = 0;
        }
    }

    //morre pra barra de cima
    if (py < fimb && px == mov / quad) {
        px += -1;
        py = chao - quad;
        vida--;
        mov = -quad - (quad / 2);
        pts--;
    }

    //morre pra barra de baixo
    if (py > fimb + (2 * quad) && px == mov / quad) {
        px += -1;
        py = chao - quad;
        vida--;
        mov = -quad - (quad / 2);
        pts--;
    }

    // desaparece o personagem quando morre;
    if (vida <= 0) {
        px = -15;
        py = -15;
        vida--;
    }

    //atualiza pontuacao
    p.innerHTML = "Voce fez " + pts + " pontos e tem " + (vida) + " vidas";

    if (vida <= 0) {
        p.innerHTML = "Voce Perdeu!! F5" + "<p>Com " + pts + " pontos</p>";
    }

}
