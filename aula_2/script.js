function converterMoeda() {
    
    var elementoValorInformado = document.getElementById("valorInformado");
    var valorInformado = parseFloat(elementoValorInformado.value);
    moedas = {
        "real":1,
        "dolar":5,
        "euro":6,
        "bitcoin":200000
    }

    moedaOrigem = document.getElementById("moedaOrigem").value;
    console.log(moedaOrigem);
    moedaDestino = document.getElementById("moedaDestino").value;
    console.log(moedaDestino);
    var valorConvertido = (valorInformado / moedas[moedaDestino])*moedas[moedaOrigem];



    var resultado = ""
    if (isNaN(valorConvertido)) {
        resultado = "Dados inválidos";
    }
    else {
        resultado = valorConvertido;
    }

    elementoResultado = document.getElementById("resultado");
    elementoResultado.innerHTML = resultado;
}

