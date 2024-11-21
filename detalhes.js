const params = new URLSearchParams(window.location.search)
const id = params.get("id")

const pega_json = async (caminho) => {

    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;

}

const detalhe = document.getElementById("detalhe");

const montapagina = (dados) => {
    const body = document.body;
    detalhe.innerHTML = "";

    const nome = document.createElement('h1')
    nome.innerHTML = dados.nome
    detalhe.appendChild(nome)
    const imagem = document.createElement('img')
    imagem.src = dados.imagem
    detalhe.appendChild(imagem)
    const posi = document.createElement("p");
    posi.innerHTML = `Posição: ${dados.posicao}`
    detalhe.appendChild(posi);
    const n_jogos = document.createElement("p");
    n_jogos.innerHTML = `Número de jogos: ${dados.n_jogos}`
    detalhe.appendChild(n_jogos);
    const nascimento = document.createElement("p");
    nascimento.innerHTML = `Data de nascimento: ${dados.nascimento}`
    detalhe.appendChild(nascimento);
    const altura = document.createElement("p");
    altura.innerHTML = `Altura: ${dados.altura}`
    detalhe.appendChild(altura);
    const naturalidade = document.createElement("p");
    naturalidade.innerHTML = `Naturalidade: ${dados.naturalidade}`
    detalhe.appendChild(naturalidade);
    const descri = document.createElement("p");
    descri.innerHTML = dados.detalhes
    detalhe.appendChild(descri);


}

pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then( (r) => montapagina(r));


const achaCookie = ( chave ) =>{

    const lista = document.cookie.split("; ");
    const par = lista.find(
        ( e ) => e.startsWith(`${chave}=`)
    )

    return par.split("=")[1]
}