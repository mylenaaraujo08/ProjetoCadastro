const readline = require('readline-sync');

class Veiculo {
  constructor(tipo, modelo, ano, cores, preco) {
    this.tipo = tipo;
    this.modelo = modelo;
    this.ano = ano;
    this.cores = cores;
    this.preco = preco;
  }
  
  get tipo() {
    return this._tipo;
  }
  set tipo(novoTipo) {
    this._tipo = novoTipo;
  }
  get modelo() {
    return this._modelo;
  }
  set modelo(novoModelo) {
    this._modelo = novoModelo;
  }
  get ano() {
    return this._ano;
  }
  set ano(novoAno) {
    this._ano = novoAno;
  }
  get cores() {
    return this._cores;
  }
  set cores(novasCores) {
    this._cores = novasCores;
  }
  get preco() {
    return this._preco;
  }
  set preco(novoPreco) {
    this._preco = novoPreco;
  }
  
  exibir() {
    console.log("------------------------");
    console.log(`Tipo: ${this.tipo}`);
    console.log(`Modelo: ${this.modelo}`);
    console.log(`Ano: ${this.ano}`);
    console.log(`Cores: ${this.cores.join(", ")}`);
    console.log(`Preço: R$ ${this.preco.toLocaleString('pt-br', { minimumFractionDigits: 2 })} `);
    console.log("------------------------");
  }
}

const veiculo1 = new Veiculo("Carro", "citroen c4", 2020, ["Prata", "Vermelho", "Preto"], 35000);
const veiculo2 = new Veiculo("Moto", "Yamaha Fluo", 2022, ["Branco", "Vermelho", "Azul Escuro"], 25000);

const veiculos = [veiculo1, veiculo2];
let loop = true;

function listarVeiculos() {
  console.log("Listando todos os veículos");
  console.log("------------------------");
  for (const veiculo of veiculos) {
    veiculo.exibir();
  }
}

function buscarVeiculoPorTipoModeloAno() {
  let tipoBusca = readline.question("Qual o tipo do veículo que deseja buscar: ");
  let modeloBusca = readline.question("Qual o modelo do veículo que deseja buscar: ");
  let anoBusca = readline.questionInt("Qual o ano do veículo que deseja buscar: ");

  let encontrados = veiculos.filter(veiculo => 
    veiculo.tipo.toLowerCase() === tipoBusca.toLowerCase() && 
    veiculo.modelo.toLowerCase() === modeloBusca.toLowerCase() &&
    veiculo.ano === anoBusca
  );
  
  if (encontrados.length > 0) {
    console.log("Resultado da busca");
    console.log("------------------------");
    for (const veiculo of encontrados) {
      veiculo.exibir();
    }
  } else {
    console.log(`Nenhum veículo encontrado com o tipo "${tipoBusca}", modelo "${modeloBusca}" e ano "${anoBusca}"`);
  }
}

function cadastrarNovoVeiculo() {
  console.log("Cadastrar um novo veículo");
  console.log("------------------------");

  let tipo = readline.question("Tipo do veículo: ");
  let modelo = readline.question("Modelo do veículo: ");
  let ano = readline.questionInt("Ano do veículo: ");
  let cores = readline.question("Cores disponíveis: ");
  let preco = parseFloat(readline.question("Preço do veículo: "));
 
  const novoVeiculo = new Veiculo(tipo, modelo, ano, cores.split(",").map(c => c.trim()), preco);
  veiculos.push(novoVeiculo);

  console.log(`Veículo "${modelo}" cadastrado com sucesso!`);
}

while (loop) {
  console.clear(); // Limpa o console
  console.log("=== CADASTRO DE VEÍCULOS ===");
  console.log("========== MENU ==========");
  console.log("0 - Sair do sistema");
  console.log("1 - Lista de todos os veículos");
  console.log("2 - Cadastrar um novo veículo");
  console.log("3 - Buscar veículo por tipo, modelo e ano");
  console.log("4 - Alterar um veículo");
  console.log("5 - Remover um veículo");
  console.log("==========================");
  let opcao = readline.questionInt("Escolha uma opção: ");

  switch (opcao) {
    case 1:
      listarVeiculos();
      readline.keyInPause();
      break;
    case 2:
      cadastrarNovoVeiculo();
      readline.keyInPause();
      break;
    case 3:
      buscarVeiculoPorTipoModeloAno();
      readline.keyInPause();
      break;
    case 0:
      console.log("Saindo do sistema...");
      loop = false;
      break;
    default:
      console.log("Opção inválida!");
      break;
  }
}

