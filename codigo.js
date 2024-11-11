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
    window.location = url;
}

const limpacontainer = () => {container.innerHTML = ""}

let copia_all1 = pega_json(`${url}all`);
let copia_feminino1 = pega_json(`${url}feminino`);
let copia_masculino1 = pega_json(`${url}masculino`);


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

    cartao.onclick = manipulaClick;
    cartao.dataset.id = atleta.id;
    cartao.dataset.njogos = atleta.n_jogos;
    cartao.dataset.altura = atleta.altura;

    return cartao
};


const campo_pesquisa = document.querySelector('.campo_pesquisa')


campo_pesquisa.addEventListener('input', (campo) =>{
    const campo_valor = campo.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    if(sessionStorage.getItem('genero') === 'qualquer'){
        limpacontainer();
        copia_all1.then( (r) => r.forEach(
            (ele) =>{ if(ele.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(campo_valor)) {
                container.appendChild(montacard(ele))
         }}))}
    if(sessionStorage.getItem('genero') === 'masculino'){
        limpacontainer();
        copia_masculino1.then( (r) => r.forEach(
            (ele) =>{ if(ele.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(campo_valor)) {
                container.appendChild(montacard(ele))
         }}))}
    if(sessionStorage.getItem('genero') === 'feminino'){
        limpacontainer();
        copia_feminino1.then( (r) => r.forEach(
            (ele) =>{ if(ele.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(campo_valor)) {
                container.appendChild(montacard(ele))
         }}))}
        })

if (sessionStorage.getItem('logado')){
    sumidor1.innerHTML = ''
    sumidor2.innerHTML = 'document.getElementById("cabeçalho").style.visibility = "hidden"'
    document.getElementById('masculino').onclick = () =>{
        limpacontainer();
        sessionStorage.setItem('genero', 'masculino')
        copia_masculino1.then( (r) => r.forEach(
        (ele) => container.appendChild(montacard(ele))))};

    document.getElementById('feminino').onclick = () => {
        limpacontainer();
        sessionStorage.setItem('genero', 'feminino')
        copia_feminino1.then( (r) => r.forEach(
        (ele) => container.appendChild(montacard(ele))))};

    document.getElementById('all').onclick = () => {
        limpacontainer();
        sessionStorage.setItem('genero', 'qualquer')
        copia_all1.then( (r) => r.forEach(
        (ele) => container.appendChild(montacard(ele))))};

    }else{    sumidor1.innerHTML = 'document.getElementById("jogadores").style.visibility = "hidden"'
              sumidor2.innerHTML = ''}


const manipulaBotao = () => {
    const texto = document.getElementById('senha').value;
    if (hex_sha256(texto) === 'ee9a289648199d7f8327e2f519f0d8f12471054935c259559a0cf0091fb79da8'){
        sessionStorage.setItem('logado', 'sim')
        location.reload()
    }else{
        alert('vc errou a senha bobão!')
    }
}

document.getElementById('login').onclick = manipulaBotao;



if (sessionStorage.getItem('logado')){

document.getElementById('sair').onclick = () => {
    sessionStorage.removeItem('logado');
    location.reload();

}}