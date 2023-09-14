const readline = require('readline-sync');

class veiculo {
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
    console.log(`Cores: ${this.cores}`);
    console.log(`Preço: R$ ${this.preco.toLocaleString('pt-br', { minimumFractionDigits: 2 })} `);
    console.log("------------------------");
  }
}

const veiculo1 = new veiculo("Carro", "citroen c4", 2020, "Prata", 35000);
const veiculo2 = new veiculo("Carro", "fusca", 1889, "Preto", 85000);
const veiculo3 = new veiculo("Carro", "ferrari", 2023, "Vermelho", 35000000);

const veiculo4 = new veiculo("Moto", "Yamaha Fluo", 2022, "Branco", 25000);
const veiculo5 = new veiculo("Moto", "Pcx", 2021, "Preta", 45000);
const veiculo6 = new veiculo("Moto", "Fazer", 2019, "Azul", 23000);


const veiculos = [veiculo1, veiculo2, veiculo3, veiculo4, veiculo5, veiculo6];
let loop = true;

function listarveiculos() {
  console.log("Listando todos os veículos");
  console.log("------------------------");
  for (const veiculo of veiculos) {
    veiculo.exibir();
  }
}

function buscarveiculoPorTipoModeloAno() {
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

function cadastrarNovoveiculo() {
  console.log("Cadastrar um novo veículo");
  console.log("------------------------");

  let tipo = readline.question("Tipo do veículo: ");
  let modelo = readline.question("Modelo do veículo: ");
  let ano = readline.questionInt("Ano do veículo: ");
  let cores = readline.question("Cores disponíveis: ");
  let preco = parseFloat(readline.question("Preço do veículo: "));
 
  const novoveiculo = new veiculo(tipo, modelo, ano, cores.split(",").map(c => c.trim()), preco);
  veiculos.push(novoveiculo);

  console.log(`Veículo "${modelo}" cadastrado com sucesso!`);
}

function alteraveiculo() {
  console.log("Alterar um novo veículo");
  console.log("------------------------");

  let modeloAltera = readline.question("Qual tipo do veículo deseja alterar: ");
  let veiculoEncontrado = veiculos.filter(veiculo => veiculo.tipo.toLowerCase() === modeloAltera.toLowerCase());

  if(veiculoEncontrado.length > 0){
    console.log("veículo encontrado.");
     veiculoEncontrado[0].modelo = readline.question("Novo Modelo do veículo: ");
    veiculoEncontrado[0].ano = readline.questionInt("Novo Ano do veículo: ");
    veiculoEncontrado[0].cores = readline.question("Novas Cores disponíveis: ");
    veiculoEncontrado[0].preco = parseFloat(readline.question("Novo Preço do veículo: ")); 
    console.log(`veículo ${modeloAltera} alterado com sucesso!`);

     listarveiculos();
  } else {
    console.log(`Veículo ${modeloAltera} não encontrado.`);
  }
}

function removerveiculo() {
  console.log("Remover um veículo");
  console.log("------------------------");

 let modeloRemove = readline.question("Qual tipo do veículo deseja remover: ");
  let indexRemover = veiculos.findIndex(veiculo => veiculo.tipo.toLowerCase() === modeloRemove.toLowerCase());

  if(indexRemover!==-1){
    const modeloRemovido =
      veiculos[indexRemover].modelo;
    veiculos.splice(indexRemover,1);
    console.log(`veiculo ${modeloRemovido} removido com sucesso!.`);
    listarveiculos();
  } else{
    console.log(`nenhum veículo encontrado "${modeloRemovido}"`);
   }
  }

  
while (loop) {
  console.clear();
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
      listarveiculos();
      readline.keyInPause();
      break;
    case 2:
      cadastrarNovoveiculo();
      readline.keyInPause();
      break;
    case 3:
      buscarveiculoPorTipoModeloAno();
      readline.keyInPause();
      break;
    case 4:
      alteraveiculo();
      readline.keyInPause();
      break;
    case 5:
      removerveiculo();
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
