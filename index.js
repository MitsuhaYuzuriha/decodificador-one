const textarea = document.querySelector(".textarea");
const mensagem = document.getElementById("textInput2");

function btnCriptografar(){
    const textoCriptografado = criptografar(textarea.value);
    mensagem.value = textoCriptografado;
    textarea.value = "";
}

function criptografar(stringCriptografada){
    let Mcodigo = [["e" , "enter"] , ["i" , "imes"] , ["a" , "ai"] , ["o" , "ober"] , ["u" , "ufat"]];
    stringCriptografada = stringCriptografada.toLowerCase();

    for(let i = 0; i < Mcodigo.length; i++) {
        if(stringCriptografada.includes(Mcodigo[i][0])) {
            stringCriptografada = stringCriptografada.replaceAll(Mcodigo[i][0], Mcodigo[i][1]);
        }
    }

    return stringCriptografada;
}



function btndDescriptografar(){
    const textoDescriptografado = descriptografar(textarea.value);
    mensagem.value = textoDescriptografado;
    textarea.value = "";
}

function descriptografar(stringDescriptografada){
    let Mcodigo = [["e" , "enter"] , ["i" , "imes"] , ["a" , "ai"] , ["o" , "ober"] , ["u" , "ufat"]];
    stringDescriptografada = stringDescriptografada.toLowerCase();

    for(let i = 0; i < Mcodigo.length; i++) {
        if(stringDescriptografada.includes(Mcodigo[i][1])) {
            stringDescriptografada = stringDescriptografada.replaceAll(Mcodigo[i][1], Mcodigo[i][0]);
        }
    }

    return stringDescriptografada;
}


function copiarTexto() {
    const textoCopiar = mensagem.value.trim(); 

    if (textoCopiar !== '') {
    
        navigator.clipboard.writeText(textoCopiar);
        document.querySelector('.msgCopiar').innerText = 'Frase copiada!';
    } else {
    
        document.querySelector('.msgCopiar').innerText = 'Não tem nenhuma frase para copiar :(';
    }

    
    setTimeout(() => {
        document.querySelector('.msgCopiar').innerText = '';
    }, 2000); 
}




function fecharMenu(palavra) {
    console.log(`Clicou em ${palavra}`);
    const menuOverlay = document.getElementById('menuOverlay');
    menuOverlay.style.display = 'none';
}

function toggleMenu() {
    var menuOverlay = document.getElementById("menuOverlay");
    var menuWords = document.getElementById("menuWords");
    if (menuOverlay.style.display === "none" || menuOverlay.style.display === "") {
        menuOverlay.style.display = "flex";
        menuWords.style.display = "flex";
    } else {
        menuOverlay.style.display = "none";
        menuWords.style.display = "none";
    }
}

document.querySelector('.paintbrushButton').addEventListener('click', function(event) {
    event.stopPropagation();
    
    var menuWords = document.getElementById('menuWords');
    menuWords.classList.toggle('show');
});

document.addEventListener('click', function(event) {
    var menuWords = document.getElementById('menuWords');
    if (!event.target.closest('.paintbrushButton') && !event.target.closest('.menuWords')) {
        menuWords.classList.remove('show');
    }
});

document.querySelectorAll('.menuButton').forEach(function(button) {
    button.addEventListener('click', function() {
        var menuWords = document.getElementById('menuWords');
        menuWords.classList.remove('show');
    });
});



let modoEscuro = false;
let modoMar = false;
let modoTerra = false;

const fontFamilies = {
    claro: { family: 'claro', size: '3rem' },
    escuro: { family: 'escuro', size: '2.5rem' },
    mar: { family: 'mar', size: '3rem' },
    terra: { family: 'terra', size: '3rem' },
};

const coresH1 = {
    claro: '#484747',
    escuro: '#ffffff',
    mar: '#387292',
    terra: '#80BC7F',
};

function ajustarEstilo(fontFamily, cor, posicaoDireita) {
    const titulo = document.querySelector('h1');
    titulo.style.fontFamily = fontFamily.family;
    titulo.style.color = cor;
    titulo.style.fontSize = fontFamily.size;

    if (posicaoDireita) {
        titulo.classList.add('posicao-direita');
    } else {
        titulo.classList.remove('posicao-direita');
    }

    if (modoTerra) {
        titulo.innerHTML = '<span class="terra-font">WY</span> Decodificador ONE <span class="terra-font">MK</span>';
    } else {
        titulo.textContent = 'Decodificador ONE';
    }
}

function fecharMenu(palavra) {
    console.log(`Clicou em ${palavra}`);
    const body = document.body;

    if (palavra === 'Escuro') {
        body.classList.add('escuro');
        body.classList.remove('mar', 'terra', 'claro');
        modoEscuro = true;
        modoMar = false;
        modoTerra = false;
        ajustarEstilo(fontFamilies.escuro, coresH1.escuro, true);
    } else if (palavra === 'Mar') {
        body.classList.add('mar');
        body.classList.remove('escuro', 'terra', 'claro');
        modoMar = true;
        modoEscuro = false;
        modoTerra = false;
        ajustarEstilo(fontFamilies.mar, coresH1.mar, false);
    } else if (palavra === 'Terra') {
        body.classList.add('terra');
        body.classList.remove('escuro', 'mar', 'claro');
        modoTerra = true;
        modoEscuro = false;
        modoMar = false;
        ajustarEstilo(fontFamilies.terra, coresH1.terra, false);
    } else if (palavra === 'Claro') {
        body.classList.add('claro');
        body.classList.remove('escuro', 'mar', 'terra');
        modoEscuro = false;
        modoMar = false;
        modoTerra = false;
        ajustarEstilo(fontFamilies.claro, coresH1.claro, false);
    }

    
    localStorage.setItem('modoAtual', palavra);
}

const modoSalvo = localStorage.getItem('modoAtual');
if (modoSalvo) {
    fecharMenu(modoSalvo);
}
