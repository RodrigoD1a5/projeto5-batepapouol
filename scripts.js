let nomeUsuario="";



perguntarNome();
function perguntarNome(){
    nomeUsuario=prompt("Escreva seu nome!");
    objetoNome={name: nomeUsuario};
    const promessaUsuario = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objetoNome);
    promessaUsuario.then(respostaValida);
    promessaUsuario.catch(respostaInvalida);
}
function respostaValida(sucesso){
    if (sucesso.status === 200){
        pegarMensagens();
        setInterval(usuarioPresente, 5000);
        setInterval(pegarMensagens, 3000);

    }
}
function respostaInvalida(erro){
    if (erro.response.status === 400){
        alert('Já existe um usuário online com esse nome, tente novamente!');
        perguntarNome();
    }
}

function usuarioPresente(){
    const promessaUsuario = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", objetoNome);
}

function pegarMensagens(){
    const promessaChat = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");

    promessaChat.then((res)=>{comparar(res.data)});
}
function carregarMensagens(mensagens){
    limparHtml();
    const listaDeMensagens = mensagens;
    for(let i=0 ; i < listaDeMensagens.length ; i++){
        if ( listaDeMensagens[i].type === "status"){
            document.querySelector(".bate-papo").innerHTML+=`<li class="texto status">
            <p>
                <span class="horário">(${listaDeMensagens[i].time})</span>  
                <span class="nome">${listaDeMensagens[i].from}</span> 
                <span class="status1">${listaDeMensagens[i].text}</span>
            </p>
            </li>`
        }
        else if (listaDeMensagens[i].type === "message"){
            document.querySelector(".bate-papo").innerHTML+=`<li class="texto mensagem">
            <p>
                <span class="horário">(${listaDeMensagens[i].time})</span>  
                <span class="nome">${listaDeMensagens[i].from}</span> para 
                <span class="nome">${listaDeMensagens[i].to}</span>: 
                <span class="mensagem1">${listaDeMensagens[i].text}</span>
            </p>
        </li>`

        }
        else if (listaDeMensagens[i].to === "nomeUsuario"){
            document.querySelector(".bate-papo").innerHTML+=`<li class="texto reservado">
            <p>
                <span class="horário">(${listaDeMensagens[i].time})</span>  
                <span class="nome">${listaDeMensagens[i].from}</span> reservadamente para 
                <span class="nome">${listaDeMensagens[i].to}</span>: 
                <span class="mensagem1">${listaDeMensagens[i].text}</span>
            </p>
            </li>`

            
        }
        mostrarUltimaMensagem();

    }
    
}
function limparHtml(){
    document.querySelector(".bate-papo").innerHTML=""; 
}
function mostrarUltimaMensagem(){
    const ultimaMensagem= document.querySelector(".bate-papo").lastChild;
    ultimaMensagem.scrollIntoView();
}
function enviarMensagem(){
    const input= document.querySelector('input').value;
    const novaMensagem= {
        from: nomeUsuario,
        text: input,
        to: "Todos",
        type: "message",
    }
    axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novaMensagem)
    .catch(reload)
    pegarMensagens();

}
function reload(){
    window.location.reload()
}
function comparar(mensagens){
    if(document.querySelector(".bate-papo").lastElementChild===null){
        carregarMensagens(mensagens);
        return;
    }
    const elementoHorario= document.querySelector(".bate-papo").lastElementChild.firstElementChild.firstElementChild;
    const stringHorario= elementoHorario.innerHTML.slice(1, 9);
    const horarioUltimaMensagem = mensagens[mensagens.length-1].time;
    if(stringHorario !== horarioUltimaMensagem){
        carregarMensagens(mensagens);
    }
    
}
comparar();