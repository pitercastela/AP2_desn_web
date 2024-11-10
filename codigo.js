const url = "https://botafogo-atletas.mange.li/2024-1/";

const pega_json = async (caminho) => {

    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;

}

const container = document.getElementById("container");
const manipulaClick = (e) => {
    const id = e.currentTarget.dataset.id
    const url = `detalhes.html?id=${id}`


    //cookie
    document.cookie = `id=${id}`;
    document.cookie = `altura=${e.currentTarget.dataset.altura}`

    //local storage
    localStorage.setItem('id', id);
    localStorage.setItem('dados', JSON.stringify(e.currentTarget.dataset))

    sessionStorage.setItem('dados', JSON.stringify(e.currentTarget.dataset))

    window.location = url;
}

const limpacontainer = () => {container.innerHTML = ""}

const montacard = (atleta) =>{
    const cartao = document.createElement("article");
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const descri = document.createElement("p");
    const link = document.createElement("a")

    nome.innerHTML = atleta.nome;
    nome.style.fontFamily = 'sans-serif'
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    descri.innerHTML = atleta.detalhes
    cartao.appendChild(descri);

   /* link.innerText = "saiba mais"
    link.href = `detalhes.html?id=${atleta.id}`
    cartao.appendChild(link)*/

    cartao.onclick = manipulaClick;
    cartao.dataset.id = atleta.id;
    cartao.dataset.njogos = atleta.n_jogos;
    cartao.dataset.altura = atleta.altura;

    return cartao
};


if (sessionStorage.getItem('logado')){
    sumidor.innerHTML = 'document.getElementById("cabeçalho").style.visibility = "hidden"'
        pega_json(`${url}all`).then( (r) => r.forEach(
        (ele) => container.appendChild(montacard(ele))))
    document.getElementById('masculino').onclick = () =>{
        limpacontainer();
        pega_json(`${url}masculino`).then( (r) => r.forEach(
        (ele) => container.appendChild(montacard(ele))))};
    document.getElementById('feminino').onclick = () => {
        limpacontainer();
        pega_json(`${url}feminino`).then( (r) => r.forEach(
        (ele) => container.appendChild(montacard(ele))))};
    document.getElementById('all').onclick = () => {
        limpacontainer();
        pega_json(`${url}all`).then( (r) => r.forEach(
        (ele) => container.appendChild(montacard(ele))))};
    }


const manipulaBotao = () => {
    const texto = document.getElementById('senha').value;
    if (hex_sha256(texto) === 'ee9a289648199d7f8327e2f519f0d8f12471054935c259559a0cf0091fb79da8'){
        sessionStorage.setItem('logado', 'sim')
        location.reload()
    }else{
        alert('vc errou a senha bobão!')
    }
}

document.getElementById('botao').onclick = manipulaBotao;

if (sessionStorage.getItem('logado')){
document.getElementById('sair').onclick = () => {
    sessionStorage.removeItem('logado');
    sumidor.innerHTML = ''
    location.reload();
}}