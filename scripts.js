let nomeUsuario="";


perguntarNome();
function perguntarNome(){
    nomeUsuario=prompt("Escreva seu nome!");
    objetoNome={name: nomeUsuario};
    const promessaUsuario = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objetoNome);
    promessaUsuario.then(respostaValida);
    promessaUsuario.catch(respostaInvalida);
}
function respostaValida(respota){
    if (respota.status === 200){
        console.log("carregar html");
        // renderizar();
        setInterval(usuarioPresente, 5000);
    }
}
// function renderizar(){



// }
function respostaInvalida(resposta){
    if (resposta.response.status === 400){
        alert('Já existe um usuário online com esse nome, tente novamente!');
        perguntarNome();
    }
}

function usuarioPresente(){
    const promessaUsuario = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objetoNome);
    console.log("mantido");
}