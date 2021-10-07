
function adivinhar() {
    valorSecreto = Math.floor(Math.random() * 11);
    valorInformado = document.getElementById("valorInformado").value;
        if (valorInformado > 0 && valorInformado <= 10){
            if(valorInformado == valorSecreto){
                renderizaPopUp("acertou","green");
            }
            else{
                renderizaPopUp("errou","orange");
            }
        }
        else{
            renderizaPopUp("Só são aceitos números de 0 a 10","red");
        }
}

async function renderizaPopUp(textoPopUp,cor){
    window.popupActive = true;
    
    var popupObj = document.createElement("div");
    var popupMontado = `<div class="popUpUnico" style="background-color:${cor}"><p class="spanText">${textoPopUp}</p></div>`
    popupObj.innerHTML = popupMontado;
    var divPopUp = document.getElementById('renderizadorPopUp');
    divPopUp.appendChild(popupObj);
    await sleep(4000);
    popupObj.innerHTML = "";
    window.popupActive = false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }