const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || []

console.log(form)

itens.forEach(elemento => {
    criaElemento(elemento);
});

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    
    const nome = e.target.elements['nome']
    const quantidade = e.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome == nome.value)

    const itemAtual = {
        "nome":nome.value,
        "quantidade":quantidade.value
    }

    if(existe){
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
        itens[itens.findIndex(e => e.id ==existe.id)]=itemAtual;//atualizando na localstorage

    }else{
        itemAtual.id = itens[length-1] ? (itens[length-1]).id + 1 : 0
        criaElemento(itemAtual)
        itens.push(itemAtual)
    }
 
    
    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
    
})

function criaElemento(item){
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const numeroItem = document.createElement("strong");
    numeroItem.dataset.id= item.id;
    numeroItem.innerHTML = item.quantidade;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML+=item.nome;

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)

  
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function deletaElemento(tag, id){
    tag.remove()

    //achar o elemento por id na lista
    itens.splice(itens.findIndex(e => e.id == id))

    //adicionar na localstorage
    localStorage.setItem("itens", JSON.stringify(itens))
}

function botaoDeleta(id){
    const botao = document.createElement("button")
    botao.innerText = "X"

    
    botao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })

    return botao;
}