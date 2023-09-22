const readline = require('readline-sync');

class Veiculo {
  constructor(tipo, modelo, ano, cores, preco) {
    this.tipo = tipo;
    this.modelo = modelo;
    this.ano = ano;
    this.cores = cores;
    this.preco = preco;
  }

  exibir() {
    console.log("------------------------");
    console.log(`Tipo: ${this.tipo}`);
    console.log(`Modelo: ${this.modelo}`);
    console.log(`Ano: ${this.ano}`);
    console.log(`Cor: ${this.cores}`);
    console.log(`Preço: ${this.preco.toLocaleString('pt-br', { minimumFractionDigits: 2 })} `);
    console.log("------------------------");
  }
}

let veiculos = [
  //Carro
  new Veiculo("Carro", "Citroen c4", 2020, "Prata", 35000),
  new Veiculo("Carro", "Fusca", 1989, "Preto", 85000),
  new Veiculo("Carro", "Ferrari", 2023, "Vermelho", 35000000),

  //Moto
  new Veiculo("Moto", "Yamaha Fluo", 2022, "Branco", 25000),
  new Veiculo("Moto", "PCX", 2021, "Preta", 45000),
  new Veiculo("Moto", "Fazer", 2019, "Azul", 23000)
];

// Função que listam veículos de um tipo específico
function listarVeiculos(tipoModificado, modificado) {
  console.log(`Listando veículos ${tipoModificado ? `do tipo "${tipoModificado}"` : ''}`);
  console.log("-------------------------------------------------\n");

  const veiculosFiltrados = tipoModificado ? veiculos.filter(v => v.tipo.toLowerCase() === tipoModificado.toLowerCase()) : veiculos;

  if (veiculosFiltrados.length > 0) {
    veiculosFiltrados.forEach(v => v.exibir());
  } else {
    console.log(`\n *** Nenhum veículo ${tipoModificado ? `do tipo "${tipoModificado}" ` : ''} foi encontrado. ***\n`);
  }
}

//Cadastro de Novos Veículos
function cadastrarNovoVeiculo(tipo) {
  console.log(`\nCadastrar um novo veículo do tipo "${tipo}"`);
  console.log("---------------------------------------------");

  let modelo = readline.question("Modelo do veículo: ");
  let ano = readline.questionInt("Ano do veículo: ");
  let cores = readline.question("Cores disponíveis: ");
  let preco = parseFloat(readline.question("Preço do veículo: "));

  const novoVeiculo = new Veiculo();
  novoVeiculo.tipo = tipo;
  novoVeiculo.modelo = modelo;
  novoVeiculo.ano = ano;
  novoVeiculo.cores = cores.split(",").map(c => c.trim());
  novoVeiculo.preco = preco;

  veiculos.push(novoVeiculo);
  console.log("\n==============================================\n");
  console.log(`Veículo "${modelo.toUpperCase()}" cadastrado com sucesso!`);
  console.log("\n==============================================\n");
  console.log("Veículo cadastrado: ");
  novoVeiculo.exibir();
}

//Função para alterar as caracteristicas dos veículos
function alterarVeiculo() {
  console.clear();
  console.log("Alterar um veículo");
  console.log("------------------");

  console.log("Escolha o tipo de veículo:");
  console.log("1 - Carro");
  console.log("2 - Moto");

  const tipoAlterar = readline.questionInt("Qual o tipo de veículo que você deseja alterar: ");
  if (tipoAlterar !== 1 && tipoAlterar !== 2) {
    console.log("\n*** Opção inválida. Por favor, escolha 1 para Carro ou 2 para Moto. ***\n");
    return;
  }

  const tipo = tipoAlterar === 1 ? 'Carro' : 'Moto';

  listarVeiculos(tipo);

  const modeloBusca = readline.question("Digite o modelo do veículo que deseja alterar: ");

  const veiculoParaAlterar = veiculos.find((veiculo) => {
    return veiculo.tipo.toLowerCase() === tipo.toLowerCase() &&
      veiculo.modelo.toLowerCase() === modeloBusca.toLowerCase();
  });

  if (veiculoParaAlterar) {
    console.log("Veículo encontrado:");
    veiculoParaAlterar.exibir();

    let continuarAlterando = true;

    while (continuarAlterando) {
      console.log("\n==============================================\n");
      console.log("Escolha o que deseja alterar:");
      console.log("1 - Modelo");
      console.log("2 - Ano");
      console.log("3 - Cor");
      console.log("4 - Preço");
      console.log("0 - Voltar ao menu inicial");
      console.log("9 - Mostrar veículos para alteração");

      const opcaoAlteracao = readline.questionInt("Escolha uma opção: ");
      console.log("==============================================\n");

      switch (opcaoAlteracao) {
        case 1:
          const novoModelo = readline.question("Digite o novo modelo: ");
          veiculoParaAlterar.modelo = novoModelo;
          console.log("==============================================\n");
          console.log("Modelo do veículo alterado com sucesso!");
          console.log("==============================================\n");
          break;
        case 2:
          const novoAno = readline.questionInt("Digite o novo ano: ");
          veiculoParaAlterar.ano = novoAno;
          console.log("==============================================\n");
          console.log("Ano do veículo alterado com sucesso!");
          console.log("==============================================\n");
          break;
        case 3:
          const novasCores = readline.question("Digite a nova cor: ");
          veiculoParaAlterar.cores = novasCores.split(",").map(c => c.trim());
          console.log("==============================================\n");
          console.log("Cor do veículo alterada com sucesso!");
          console.log("==============================================\n");
          break;
        case 4:
          const novoPreco = parseFloat(readline.question("Digite o novo preço: "));
          veiculoParaAlterar.preco = novoPreco;
          console.log("==============================================\n");
          console.log("Preço do veículo alterado com sucesso!");
          console.log("==============================================\n");
          break;
        case 0:
          continuarAlterando = false;
          break;
        case 9:
          listarVeiculos(tipo);
          break;
        default:
          console.log("==============================================\n");
          console.log("\n*** Opção inválida. ***\n");
          console.log("Digite uma opção válida");
          console.log("==============================================\n");
          break;
      }
    }
  } else {
    console.log("\n*** Nenhum veículo correspondente encontrado. *** \n");
  }
}

//Remove os Veículos
function removerVeiculo(tipoRemover) {
  console.clear();
  console.log(`Remover veículos do tipo "${tipoRemover}"`);
  console.log("-----------------------------------------");

  let veiculosParaRemover = veiculos.filter(veiculo => veiculo.tipo.toLowerCase() === tipoRemover.toLowerCase());

  if (veiculosParaRemover.length === 0) {
    console.log(`\n*** Nenhum veículo do tipo "${tipoRemover}" encontrado. ***\n`);
    let adicionarVeiculo = readline.keyInYN(`Deseja adicionar um veículo do tipo "${tipoRemover.toLowerCase()}"? (Sim/Não): \n`);
    if (adicionarVeiculo) {
      cadastrarNovoVeiculo(tipoRemover);
    }
  } else {
    while (veiculosParaRemover.length > 0) {
      console.clear();
      console.log(`Removendo veículos do tipo: ${tipoRemover}`);
      console.log("------------------------------------------");

      veiculosParaRemover.forEach((veiculo, i) => console.log(`${i + 1} - ${veiculo.modelo}`));

      const veiculoIndex = readline.questionInt("\nEscolha o veículo que deseja remover: ");
      const veiculoSelecionado = veiculosParaRemover[veiculoIndex - 1];

      if (veiculoSelecionado) {
        veiculos = veiculos.filter(veiculo => veiculo !== veiculoSelecionado);
        console.log("\n==============================================\n");
        console.log(`O veículo "${veiculoSelecionado.modelo.toUpperCase()}" foi removido com sucesso!`);
        console.log("\n==============================================\n");

        veiculosParaRemover = veiculosParaRemover.filter(veiculo => veiculo !== veiculoSelecionado);

        if (veiculosParaRemover.length === 0) {
          console.log("\n*** Todos os veículos do tipo foram removidos. ***\n");
          break;
        }

        let continuarRemovendo = readline.keyInYNStrict("Deseja continuar a remover outro veículo? (Sim/Não): \n");
        if (!continuarRemovendo) {
          break;
        }
      } else {
        console.log("\n*** Opção inválida. Por favor, escolha um número de veículo válido. ***\n");
      }
    }
  }
}

// Função para imprimir opções de escolha
function imprimirOpcoesEscolha() {
  console.log("Listando todos os veículos:");
  console.log("---------------------------");
  console.log("Tipos de veículos disponíveis:");
  console.log("1 - Carro");
  console.log("2 - Moto");
}

// Função para perguntar se o usuário deseja continuar
function perguntarSeDesejaContinuar() {
  const resposta = readline.keyInYNStrict("Deseja voltar ao menu inicial? (Sim/Não): ");
  return resposta;
}

let loop = true;

while (loop) {
  console.clear();
  console.log("============ CADASTRO DE VEÍCULOS ===========");
  console.log("==================== MENU ===================");

  console.log("1 - Listar veículos (por tipo)");
  console.log("2 - Cadastrar um novo veículo");
  console.log("3 - Buscar veículo por tipo, modelo e ano");
  console.log("4 - Alterar um veículo");
  console.log("5 - Remover um veículo");
  console.log("0 - Sair do Sistema");
  console.log("==============================================");
  const opcao = readline.questionInt("Escolha uma opção: ");
  console.log("\n");

  switch (opcao) {
    
    case 1:
      console.clear();
      let tipoEscolhido;
      do {
        imprimirOpcoesEscolha();
        tipoEscolhido = readline.questionInt("Escolha o tipo de veículo que deseja listar: ");
        if (tipoEscolhido === 1 || tipoEscolhido === 2) {
          const tipo = tipoEscolhido === 1 ? 'Carro' : 'Moto';
          listarVeiculos(tipo);
        } else {
          console.log("\n*** Opção inválida. Por favor, escolha 1 para Carro ou 2 para Moto. ***\n");
        }
      } while (tipoEscolhido !== 1 && tipoEscolhido !== 2);
      if (perguntarSeDesejaContinuar()) {
        continue;
      } else {
        loop = false;
      }
      break;

    case 2:
      console.clear();
      console.log("Cadastrar um novo veículo");
      console.log("-------------------------");
      console.log("Escolha o tipo de veículo que deseja cadastrar:");
      console.log("1 - Carro");
      console.log("2 - Moto");
      const tipoCadastro = readline.questionInt("Escolha uma opção: ");
      if (tipoCadastro === 1) {
        cadastrarNovoVeiculo("Carro");
      } else if (tipoCadastro === 2) {
        cadastrarNovoVeiculo("Moto");
      } else {
        console.log("\n*** Opção inválida. Por favor, escolha 1 para Carro ou 2 para Moto. ***\n");
      }
      if (perguntarSeDesejaContinuar()) {
        continue;
      } else {
        loop = false;
      }
      break;

  case 3:
  console.clear();
  console.log("Buscar veículo por tipo, modelo e ano");
  console.log("-------------------------------------");
  
  let tipoBusca;
  do {
    imprimirOpcoesEscolha();
    tipoBusca = readline.questionInt("Escolha o tipo de veículo que deseja buscar: ");
    if (tipoBusca === 1 || tipoBusca === 2) {
      const tipo = tipoBusca === 1 ? 'Carro' : 'Moto';
      let modeloBusca = readline.question("Digite o modelo do veículo: ");
      let anoBusca = readline.questionInt("Digite o ano do veículo: ");
      const veiculoEncontrado = veiculos.find(v => v.tipo.toLowerCase() === tipo.toLowerCase() && v.modelo.toLowerCase() === modeloBusca.toLowerCase() && v.ano === anoBusca);
      if (veiculoEncontrado) {
        console.log("\nVeículo encontrado:");
        veiculoEncontrado.exibir();
      } else {
        console.log(`\n*** Nenhum veículo do tipo "${tipo}" com o modelo "${modeloBusca}" e ano "${anoBusca}" encontrado. ***\n`);
      }
    } else {
      console.log("\n*** Opção inválida. Por favor, escolha 1 para Carro ou 2 para Moto. ***\n");
    }
  } while (tipoBusca !== 1 && tipoBusca !== 2);

  if (perguntarSeDesejaContinuar()) {
    continue;
  } else {
    loop = false;
  }
  break;

    case 4:
      alterarVeiculo();
      if (perguntarSeDesejaContinuar()) {
        continue;
      } else {
        loop = false;
      }
      break;

    case 5:
      console.clear();
      console.log("Remover um veículo");
      console.log("------------------");
      console.log("Escolha o tipo de veículo que deseja remover:");
      console.log("1 - Carro");
      console.log("2 - Moto");
      const tipoRemover = readline.questionInt("Escolha uma opção: ");
      if (tipoRemover === 1) {
        removerVeiculo("Carro");
      } else if (tipoRemover === 2) {
        removerVeiculo("Moto");
      } else {
        console.log("\n*** Opção inválida. Por favor, escolha 1 para Carro ou 2 para Moto. ***\n");
      }
      if (perguntarSeDesejaContinuar()) {
        continue;
      } else {
        loop = false;
      }
      break;
      
    case 0:
      loop = false;
      break;
    default:
      console.clear();
      console.log("\n*** Opção inválida. Por favor, escolha uma opção válida. ***\n");
      break;
  }
}


//Para quando sair do Sistema
console.log("\n===========================================================\n");
console.log("Obrigado por acessar nosso sistema! Atendimento encerrado...");
console.log("\n===========================================================\n");
