const readline = require('readline-sync');

class Veiculo {
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
    console.log(`Cor: ${this.cores}`);
    console.log(`Preço: ${this.preco.toLocaleString('pt-br', { minimumFractionDigits: 2 })} `);
    console.log("------------------------");
  }
}

const veiculo1 = new Veiculo("Carro", "Citroen c4", 2020, "Prata", 35000);
const veiculo2 = new Veiculo("Carro", "Fusca", 1989, "Preto", 85000);
const veiculo3 = new Veiculo("Carro", "Ferrari", 2023, "Vermelho", 35000000);
const veiculo4 = new Veiculo("Moto", "Yamaha Fluo", 2022, "Branco", 25000);
const veiculo5 = new Veiculo("Moto", "Pcx", 2021, "Preta", 45000);
const veiculo6 = new Veiculo("Moto", "Fazer", 2019, "Azul", 23000);

const veiculos = [veiculo1, veiculo2, veiculo3, veiculo4, veiculo5, veiculo6];
let loop = true;

function listarVeiculos(tipoModificado) {
  console.log("Listando todos os veículos");
  console.log("---------------------------");

  if (tipoModificado !== "") {
    console.log(`Listando veículos do tipo "${tipoModificado}"`);
    console.log("---------------------------");

    const veiculosDoTipo = veiculos.filter(veiculo => veiculo.tipo.toLowerCase() === tipoModificado);

    if (veiculosDoTipo.length > 0) {
      for (const veiculo of veiculosDoTipo) {
        veiculo.exibir();
      }
    } else {
      console.log(`Nenhum veículo do tipo "${tipoModificado}" encontrado.`);
    }
  } else {
    for (const veiculo of veiculos) {
      veiculo.exibir();
    }
  }
}

function cadastrarNovoVeiculo(tipo) {
  console.log(`Cadastrar um novo veículo do tipo "${tipo}"`);
  console.log("--------------------------");

  let modelo = readline.question("Modelo do veículo: ");
  let ano = readline.questionInt("Ano do veículo: ");
  let cores = readline.question("Cores disponíveis: ");
  let preco = parseFloat(readline.question("Preço do veículo: "));

  const novoVeiculo = new Veiculo(tipo, modelo, ano, cores.split(",").map(c => c.trim()), preco);
  veiculos.push(novoVeiculo);

  console.log(`Veículo "${modelo}" cadastrado com sucesso!`);
}

function buscarVeiculoPorTipoModeloAno() {
  console.log("Buscar veículo por tipo, modelo e ano");
  console.log("------------------------");

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
  readline.keyInPause();
}

function alterarVeiculo() {
  console.log("Alterar um veículo");
  console.log("------------------------");

  let tipoAltera = readline.question("Qual tipo do veículo deseja alterar: ");
  let veiculosEncontrados = veiculos.filter(veiculo => veiculo.tipo.toLowerCase() === tipoAltera.toLowerCase());

  if (veiculosEncontrados.length > 0) {
    console.log("Veículos encontrados:");
    for (let i = 0; i < veiculosEncontrados.length; i++) {
      console.log(`${i + 1} - ${veiculosEncontrados[i].modelo}`);
    }

    let veiculoIndex = readline.questionInt("Escolha o veículo que deseja alterar (pelo número): ");
    if (veiculoIndex >= 1 && veiculoIndex <= veiculosEncontrados.length) {
      let veiculoSelecionado = veiculosEncontrados[veiculoIndex - 1];

      console.log(`Veículo selecionado: ${veiculoSelecionado.modelo}`);
      console.log("Opções de modificação:");
      console.log("1 - Alterar Modelo");
      console.log("2 - Alterar Ano");
      console.log("3 - Alterar Cores");
      console.log("4 - Alterar Preço");

      let opcaoModificacao = readline.questionInt("Escolha a opção de modificação: ");
      console.log("---------------------------");

      switch (opcaoModificacao) {
        case 1:
          veiculoSelecionado.modelo = readline.question("Informe o novo Modelo do veículo: ");
          break;
        case 2:
          veiculoSelecionado.ano = readline.questionInt("Informe o novo Ano do veículo: ");
          break;
        case 3:
          veiculoSelecionado.cores = readline.question("Informe a nova Cor do veículo: ");
          break;
        case 4:
          veiculoSelecionado.preco = parseFloat(readline.question("Novo Preço do veículo: "));
          break;
        default:
          console.log("** Opção inválida! ***  Por favor escolha uma opção Válida ");
          break;
      }

      console.log(`O veículo "${veiculoSelecionado.modelo}" foi alterado com sucesso!`);
    } else {
      console.log("Número de veículo selecionado é inválido.");
    }
  } else {
    console.log(`*** O Veículo ${tipoAltera} não foi encontrado.***`);
  }
  readline.keyInPause();
}

function removerVeiculo() {
  console.log("Remover veículos por tipo");
  console.log("------------------------");

  console.log("Tipos de veículos disponíveis:");
  const tiposDeVeiculos = [...new Set(veiculos.map(veiculo => veiculo.tipo))];
  for (let i = 0; i < tiposDeVeiculos.length; i++) {
    console.log(`${i + 1} - ${tiposDeVeiculos[i]}`);
  }

  let tipoRemoverIndex = readline.questionInt("Escolha o tipo do veículo que deseja remover (pelo número): ");
  if (tipoRemoverIndex >= 1 && tipoRemoverIndex <= tiposDeVeiculos.length) {
    let tipoRemover = tiposDeVeiculos[tipoRemoverIndex - 1];
    let veiculosParaRemover = veiculos.filter(veiculo => veiculo.tipo.toLowerCase() === tipoRemover.toLowerCase());

    if (veiculosParaRemover.length === 0) {
      console.log(`Nenhum veículo do tipo "${tipoRemover}" encontrado.`);
      let adicionarVeiculo = readline.keyInYN("Deseja adicionar um veículo desse tipo? (Sim/Não): ");
      if (adicionarVeiculo) {
        cadastrarNovoVeiculo(tipoRemover);
      } else {
        let voltarMenuPrincipal = readline.keyInYN("Deseja voltar para o menu principal? (Sim/Não): ");
        if (!voltarMenuPrincipal) {
          console.log("Obrigado por acessar nosso sistema! Atendimento encerrado...");
          loop = false;
        }
      }
      return;
    }
    
    console.clear();
    console.log("Removendo veículos do tipo: " + tipoRemover);
    console.log("------------------------");

    for (let i = veiculos.length - 1; i >= 0; i--) {
      if (veiculos[i].tipo.toLowerCase() === tipoRemover.toLowerCase()) {
        veiculos.splice(i, 1);
      }
    }
    console.log(`Todos os veículos do tipo "${tipoRemover}" foram removidos.`);
  } else {
    console.log("Número de tipo de veículo selecionado é inválido.");
  }
  readline.keyInPause();
}

while (loop) {
  console.clear();
  console.log("============ CADASTRO DE VEÍCULOS ===========");
  console.log("==================== MENU ===================");

  console.log("1 - Lista de todos os veículos");
  console.log("2 - Cadastrar um novo veículo");
  console.log("3 - Buscar veículo por tipo, modelo e ano");
  console.log("4 - Alterar um veículo");
  console.log("5 - Remover um veículo");

  console.log("================ MENU ADICIONAL ==============");
  console.log("6 - Listar veículos por tipo modificado");
  console.log("0 - Sair do Sistema");
  console.log("==============================================");
  let opcao = readline.questionInt("Escolha uma opção: ");

  switch (opcao) {
    case 1:
      listarVeiculos("");
      break;
    case 2:
      let tipoCadastro = readline.question("Qual o tipo do veículo que deseja cadastrar: ");
      cadastrarNovoVeiculo(tipoCadastro);
      break;
    case 3:
      buscarVeiculoPorTipoModeloAno();
      break;
    case 4:
      alterarVeiculo();
      break;
    case 5:
      removerVeiculo();
      break;
    case 6:
      listarVeiculos("");
      break;
    case 0:
      console.log("Obrigado por acessar nosso sistema! Atendimento encerrado...");
      loop = false;
      break;
    default:
      console.log("*** Opção inválida! ***");
      break;
  }
}
