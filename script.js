async function preencherPais() {
  const urlPais = `https://servicodados.ibge.gov.br/api/v1/localidades/paises?orderBy=nome`;
  const inputPais = document.getElementById(`pais`);
  try {
    const resposta = await fetch(urlPais);
    if (!resposta.ok) {
      throw new Error("Erro na Requisição de Estado");
    }
    const paises = await resposta.json();
    paises.forEach((pais) => {
      const opcao = document.createElement("option");
      opcao.textContent = pais.nome;
      inputPais.appendChild(opcao);
    });
  } catch (error) {
    console.error(error);
  }
}

async function consultaCep() {
  const cep = document.getElementById("inputCep").value;
  const urlCep = `https://viacep.com.br/ws/${cep}/json/`;
  try {
    const response = await fetch(urlCep);
    if (!response.ok) {
      throw new Error("Erro na consulta do CEP");
    }
    const dados = await response.json();
    const inputLogradouro = document.getElementById("inputLogradouro");
    const inputBairro = document.getElementById("inputBairro");
    const inputComplemento = document.getElementById("inputComplemento");
    const estadoSelecionado = dados.uf;
    const cidadeSelecionada = dados.localidade;
    const paisSelecionado = "Brasil";
    inputLogradouro.value = dados.logradouro;
    inputBairro.value = dados.bairro;
    inputComplemento.value = dados.complemento;
    if (estadoSelecionado) {
      await preencherEstado();
      document.getElementById("estado").value = estadoSelecionado;
    }
    if (cidadeSelecionada) {
      await preencherMunicipio(estadoSelecionado);
      document.getElementById("cidade").value = cidadeSelecionada;
    }
    if (paisSelecionado) {
      document.getElementById("pais").value = paisSelecionado;
    }
  } catch (error) {
    console.error(error);
  }
}

async function preencherEstado() {
  const urlEstado = `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`;
  const uf = document.getElementById("estado");
  try {
    const resposta = await fetch(urlEstado);
    if (!resposta.ok) {
      throw new Error("Erro na Requisição de Estado");
    }
    const estados = await resposta.json();
    estados.forEach((estado) => {
      const opcao = document.createElement("option");
      opcao.value = estado.sigla;
      opcao.textContent = estado.nome;
      uf.appendChild(opcao);
    });
    uf.addEventListener("change", () => {
      const estadoSelecionado = uf.value;
      if (estadoSelecionado) {
        preencherMunicipio(estadoSelecionado);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

async function preencherMunicipio(estadoSelecionado) {
  const urlCidade = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios?orderBy=nome`;
  const municipio = document.getElementById("cidade");
  municipio.innerHTML = "";
  try {
    const resposta = await fetch(urlCidade);
    if (!resposta.ok) {
      throw new Error("Erro na Requisição de Cidade");
    }
    const cidades = await resposta.json();
    cidades.forEach((cidade) => {
      const opcao = document.createElement("option");
      opcao.value = cidade.nome;
      opcao.textContent = cidade.nome;
      municipio.appendChild(opcao);
    });
  } catch (error) {
    console.error(error);
  }
}

preencherEstado();
preencherPais();

let consultaCnpj = async () => {
  const cnpj = document.getElementById("inputCnpj").value;
  const inputNasc = document.getElementById("inputNasc");
  const inputNomeRazaoSocial = document.getElementById("inputNomeRazaoSocial");
  const inputNomeFantasia = document.getElementById("inputNomeFantasia");
  const urlCnpj = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;
  try {
    const response = await fetch(urlCnpj);
    if (!response.ok) {
      throw new Error("Erro na consulta do CNPJ");
    }
    const dados = await response.json();
    teste = cidade.value = dados.municipio;
    inputNasc.value = dados.data_inicio_atividade;
    inputNomeRazaoSocial.value = dados.razao_social;
    inputNomeFantasia.value = dados.nome_fantasia;
  } catch (error) {
    console.error(error);
  }
};

const form = document.querySelector("form");
let codigoCliente = 1;
let inputCodigo = document.getElementById("inputCodigo");
inputCodigo.value = codigoCliente;
form.addEventListener("submit", (event) => {
  // event.preventDefault();
  inputCodigo.value = codigoCliente;
  codigoCliente++;
  const cnpj = document.getElementById("inputCnpj");
  const inputNasc = document.getElementById("inputNasc");
  const inputNomeRazaoSocial = document.getElementById("inputNomeRazaoSocial");
  const inputNomeFantasia = document.getElementById("inputNomeFantasia");
  const inputLogradouro = document.getElementById("inputLogradouro");
  const inputBairro = document.getElementById("inputBairro");
  const inputComplemento = document.getElementById("inputComplemento");
  const estadoSelecionado = document.getElementById("estado");
  const cidadeSelecionada = document.getElementById("cidade");
  const paisSelecionado = document.getElementById("pais");
  const cep = document.getElementById("inputCep");
  fornecedor = {
    codigo: inputCodigo.value,
    cnpj: cnpj.value,
    dataNasc: inputNasc.value,
    nomeRazaoSocial: inputNomeRazaoSocial.value,
    nomeFantasia: inputNomeFantasia.value,
    cep: cep.value,
    logradouro: inputLogradouro.value,
    bairro: inputBairro.value,
    complemento: inputComplemento.value,
    estado: estadoSelecionado.value,
    cidade: cidadeSelecionada.value,
    pais: paisSelecionado.value,
    celular: inputCelular.value,
    telefone: inputCelular.value,
    fax: inputFax.value,
    email1: inputEmail1.value,
    email2: inputEmail2.value,
  };
  console.table(fornecedor);
});