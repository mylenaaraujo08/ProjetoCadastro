const readline = require("readline-sync");
const clear = require("clear");

let gerador_veiculo = 2;

const veiculo1 = {
  Tipo: "Carro",
  Modelo: "citroen c4",
  Cor: ["Prata", "Vermelho", "Preto"],
  preco: 35000,
};

const veiculo2 = {
  Tipo: "Moto",
  Modelo: "Yamaha Fluo",
  Cor: ["Branco", "Vermelho", "Azul Escuro"],
  preco: 25000,
};

const veiculos = [veiculo1, veiculo2];
let loop = true;

function listarVeiculos() {
  console.log("Listando todos os veiculos");
  console.log("------------------------");
  for (const veiculo of veiculos) {
    console.log(`Tipo: ${veiculo.Tipo}`);
    console.log(`Modelo: ${veiculo.Modelo}`);
    console.log(`Cores: ${veiculo.Cor.join(", ")}`);
    console.log(`Preço: R$ ${veiculo.preco.toFixed(2)}`);
    console.log("------------------------");
  }
}

function cadastrarNovoVeiculo() {
  console.log("Cadastrar um novo veiculo");
  console.log("------------------------");

  let tipo = readline.question("Tipo do veiculo: ");
  let modelo = readline.question("Modelo do veiculo: ");
  let cores = readline.question("Cores disponiveis (separadas por virgula): ").split(",");
  let preco = readline.questionFloat("Preco do veiculo: ");

  const novoVeiculo = {
    Tipo: tipo,
    Modelo: modelo,
    Cor: cores,
    preco: preco,
  };

  veiculos.push(novoVeiculo);

  console.log(`Veiculo "${modelo}" cadastrado com sucesso!`);
}

function buscarVeiculoPorModelo() {
  let modeloBusca = readline.question("Qual o modelo do veículo que deseja buscar: ");
  let encontrados = [];

  for (const veiculo of veiculos) {
    if (veiculo.Modelo.toLowerCase() === modeloBusca.toLowerCase()) {
      encontrados.push(veiculo);
    }
  }

  if (encontrados.length > 0) {
    console.log("Resultado da busca");
    console.log("------------------------");
    for (const veiculo of encontrados) {
      exibirVeiculo(veiculo);
    }
  } else {
    console.log(`Nenhum veículo encontrado com o modelo "${modeloBusca}"`);
  }
}

function exibirVeiculo(veiculo) {
  console.log("------------------------");
  console.log(`Tipo: ${veiculo.Tipo}`);
  console.log(`Modelo: ${veiculo.Modelo}`);
  console.log(`Cores: ${veiculo.Cor.join(", ")}`);
  console.log(`Preço: R$ ${veiculo.preco.toFixed(2)}`);
  console.log("------------------------");
}

while (loop) {
  clear();
  console.log("=== CADASTRO DE VEICULOS ===");
  console.log("========== MENU ==========");
  console.log("0 - Sair do sistema");
  console.log("1 - Lista de todos os veiculos");
  console.log("2 - Cadastrar um novo veiculo");
   console.log("3 - Buscar veiculo por modelo");
  console.log("4 - Alterar um veiculo");
  console.log("5 - Remover um veiculo");
  console.log("==========================");
  let opcao = readline.questionInt("Escolha uma opcao: ");

  switch (opcao) {
    case 1:
      listarVeiculos();
      readline.keyInPause();
      break;
    case 2:
      cadastrarNovoVeiculo();
      readline.keyInPause();
      break;
    case 0:
      console.log("Saindo do sistema...");
      loop = false;
      break;
    default:
      console.log("Opção invalida!");
      break;
  }
}
