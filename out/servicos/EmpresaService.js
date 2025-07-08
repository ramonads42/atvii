"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importar todas as classes necessárias do seu backend
const empresa_1 = __importDefault(require("../modelo/empresa"));
const cliente_1 = __importDefault(require("../modelo/cliente"));
const produto_1 = __importDefault(require("../modelo/produto"));
const servico_1 = __importDefault(require("../modelo/servico"));
const pet_1 = __importDefault(require("../modelo/pet"));
const cpf_1 = __importDefault(require("../modelo/cpf")); // Necessário para criar Cliente
/**
 * Esta classe atua como uma ponte entre os componentes React e a lógica de negócio (backend).
 * Ela mantém uma única instância da classe Empresa e expõe métodos para interagir com ela.
 */
class EmpresaService {
    constructor() {
        this.empresa = new empresa_1.default();
        // Amarrar o contexto 'this' de todos os métodos que serão passados como props.
        // Isso evita a necessidade de usar .bind() em cada prop no Roteador.
        this.cadastrarClienteComDados = this.cadastrarClienteComDados.bind(this);
        this.atualizarCliente = this.atualizarCliente.bind(this);
        this.excluirCliente = this.excluirCliente.bind(this);
        this.cadastrarPet = this.cadastrarPet.bind(this);
        this.atualizarPet = this.atualizarPet.bind(this);
        this.excluirPet = this.excluirPet.bind(this);
        this.cadastrarProduto = this.cadastrarProduto.bind(this);
        this.atualizarProduto = this.atualizarProduto.bind(this);
        this.excluirProduto = this.excluirProduto.bind(this);
        this.cadastrarServico = this.cadastrarServico.bind(this);
        this.atualizarServico = this.atualizarServico.bind(this);
        this.excluirServico = this.excluirServico.bind(this);
        this.registrarConsumo = this.registrarConsumo.bind(this);
        this.getRelatorioTop10ClientesPorQuantidade = this.getRelatorioTop10ClientesPorQuantidade.bind(this);
        this.getRelatorioTop5ClientesPorValor = this.getRelatorioTop5ClientesPorValor.bind(this);
        this.getRelatorioProdutosServicosMaisConsumidos = this.getRelatorioProdutosServicosMaisConsumidos.bind(this);
        this.getRelatorioConsumoPorTipoRaca = this.getRelatorioConsumoPorTipoRaca.bind(this);
        this.getRelatorioConsumoPorTipo = this.getRelatorioConsumoPorTipo.bind(this);
        this.popularDadosIniciais();
    }
    // --- Métodos de Leitura (Getters) ---
    getClientes() {
        return this.empresa.getClientes;
    }
    getProdutos() {
        return this.empresa.getProdutos;
    }
    getServicos() {
        return this.empresa.getServicos;
    }
    // --- Métodos de Operação (para serem chamados pelos componentes) ---
    // Clientes
    cadastrarClienteComDados(nome, nomeSocial, cpfValor, dataEmissaoString) {
        const partesData = dataEmissaoString.split('/');
        const ano = new Number(partesData[2]).valueOf();
        const mes = new Number(partesData[1]).valueOf() - 1;
        const dia = new Number(partesData[0]).valueOf();
        const dataEmissao = new Date(ano, mes, dia);
        const cpf = new cpf_1.default(cpfValor, dataEmissao);
        const cliente = new cliente_1.default(nome, nomeSocial, cpf);
        this.empresa.getClientes.push(cliente);
        console.log(`Cliente ${nome} cadastrado com sucesso!`);
    }
    atualizarCliente(cpfCliente, novoNome, novoNomeSocial) {
        const clienteParaAtualizar = this.empresa.getClientes.find(c => c.getCpf.getValor === cpfCliente);
        if (clienteParaAtualizar) {
            if (novoNome)
                clienteParaAtualizar.nome = novoNome;
            if (novoNomeSocial)
                clienteParaAtualizar.nomeSocial = novoNomeSocial;
            console.log("Cliente atualizado via GUI:", clienteParaAtualizar);
        }
        else {
            console.warn("Cliente não encontrado para atualização:", cpfCliente);
        }
    }
    excluirCliente(cpfCliente) {
        const index = this.empresa.getClientes.findIndex(c => c.getCpf.getValor === cpfCliente);
        if (index !== -1) {
            this.empresa.getClientes.splice(index, 1);
            console.log("Cliente excluído via GUI:", cpfCliente);
        }
        else {
            console.warn("Cliente não encontrado para exclusão:", cpfCliente);
        }
    }
    // Pets
    cadastrarPet(cpfCliente, nome, tipo, raca, genero) {
        const cliente = this.empresa.getClientes.find(c => c.getCpf.getValor === cpfCliente);
        if (cliente) {
            const pet = new pet_1.default(nome, raca, genero, tipo);
            cliente.getPets.push(pet);
            console.log(`Pet ${nome} cadastrado para o cliente ${cliente.nome}`);
        }
        else {
            console.warn(`Cliente com CPF ${cpfCliente} não encontrado para cadastrar pet.`);
        }
    }
    atualizarPet(cpfClienteOriginal, nomePetOriginal, novoNome, novoTipo, novaRaca, novoGenero) {
        const cliente = this.empresa.getClientes.find(c => c.getCpf.getValor === cpfClienteOriginal);
        if (cliente) {
            const pet = cliente.getPets.find(p => p.getNome === nomePetOriginal);
            if (pet) {
                if (novoNome)
                    pet.setNome(novoNome);
                if (novoTipo)
                    pet.setTipo(novoTipo);
                if (novaRaca)
                    pet.setRaca(novaRaca);
                if (novoGenero)
                    pet.setGenero(novoGenero);
                console.log(`Pet ${nomePetOriginal} do cliente ${cliente.nome} atualizado.`);
            }
            else {
                console.warn(`Pet ${nomePetOriginal} não encontrado para o cliente ${cliente.nome}.`);
            }
        }
        else {
            console.warn(`Cliente com CPF ${cpfClienteOriginal} não encontrado para atualizar pet.`);
        }
    }
    excluirPet(cpfCliente, nomePet) {
        const cliente = this.empresa.getClientes.find(c => c.getCpf.getValor === cpfCliente);
        if (cliente) {
            const index = cliente.getPets.findIndex(p => p.getNome === nomePet);
            if (index !== -1) {
                cliente.getPets.splice(index, 1);
                console.log(`Pet ${nomePet} do cliente ${cliente.nome} excluído.`);
            }
            else {
                console.warn(`Pet ${nomePet} não encontrado para o cliente ${cliente.nome}.`);
            }
        }
        else {
            console.warn(`Cliente com CPF ${cpfCliente} não encontrado para excluir pet.`);
        }
    }
    // Produtos
    cadastrarProduto(nome, valor, descricao) {
        const produto = new produto_1.default(nome, valor, descricao);
        this.empresa.getProdutos.push(produto);
        console.log(`Produto ${nome} cadastrado.`);
    }
    atualizarProduto(nomeProdutoOriginal, novoNome, novoValor, novaDescricao) {
        const produto = this.empresa.getProdutos.find(p => p.getNome === nomeProdutoOriginal);
        if (produto) {
            if (novoNome)
                produto.setNome(novoNome);
            if (novoValor !== undefined && novoValor !== null)
                produto.setValor(novoValor);
            if (novaDescricao)
                produto.setDescricao(novaDescricao);
            console.log(`Produto ${nomeProdutoOriginal} atualizado.`);
        }
        else {
            console.warn(`Produto ${nomeProdutoOriginal} não encontrado para atualização.`);
        }
    }
    excluirProduto(nomeProduto) {
        const index = this.empresa.getProdutos.findIndex(p => p.getNome === nomeProduto);
        if (index !== -1) {
            this.empresa.getProdutos.splice(index, 1);
            console.log(`Produto ${nomeProduto} excluído.`);
        }
        else {
            console.warn(`Produto ${nomeProduto} não encontrado para exclusão.`);
        }
    }
    // Serviços
    cadastrarServico(nome, valor, descricao) {
        const servico = new servico_1.default(nome, valor, descricao);
        this.empresa.getServicos.push(servico);
        console.log(`Serviço ${nome} cadastrado.`);
    }
    atualizarServico(nomeServicoOriginal, novoNome, novoValor, novaDescricao) {
        const servico = this.empresa.getServicos.find(s => s.getNome === nomeServicoOriginal);
        if (servico) {
            if (novoNome)
                servico.setNome(novoNome);
            if (novoValor !== undefined && novoValor !== null)
                servico.setValor(novoValor);
            if (novaDescricao)
                servico.setDescricao(novaDescricao);
            console.log(`Serviço ${nomeServicoOriginal} atualizado.`);
        }
        else {
            console.warn(`Serviço ${nomeServicoOriginal} não encontrado para atualização.`);
        }
    }
    excluirServico(nomeServico) {
        const index = this.empresa.getServicos.findIndex(s => s.getNome === nomeServico);
        if (index !== -1) {
            this.empresa.getServicos.splice(index, 1);
            console.log(`Serviço ${nomeServico} excluído.`);
        }
        else {
            console.warn(`Serviço ${nomeServico} não encontrado para exclusão.`);
        }
    }
    // Registro de Consumo
    registrarConsumo(cpfCliente, nomeItem, tipoItem) {
        const cliente = this.empresa.getClientes.find(c => c.getCpf.getValor === cpfCliente);
        if (cliente) {
            if (tipoItem === 'produto') {
                const produto = this.empresa.getProdutos.find(p => p.getNome === nomeItem);
                if (produto) {
                    cliente.getProdutosConsumidos.push(produto);
                    console.log(`Produto ${nomeItem} registrado para ${cliente.nome}`);
                }
                else {
                    console.warn(`Produto ${nomeItem} não encontrado.`);
                }
            }
            else if (tipoItem === 'servico') {
                const servico = this.empresa.getServicos.find(s => s.getNome === nomeItem);
                if (servico) {
                    cliente.getServicosConsumidos.push(servico);
                    console.log(`Serviço ${nomeItem} registrado para ${cliente.nome}`);
                }
                else {
                    console.warn(`Serviço ${nomeItem} não encontrado.`);
                }
            }
        }
        else {
            console.warn(`Cliente com CPF ${cpfCliente} não encontrado.`);
        }
    }
    // Relatórios (adaptados para retornar dados, não imprimir no console)
    getRelatorioTop10ClientesPorQuantidade() {
        const listaClientes = [];
        this.empresa.getClientes.forEach(cliente => {
            const produtos = cliente.getProdutosConsumidos.length;
            const servicos = cliente.getServicosConsumidos.length;
            const total = produtos + servicos;
            listaClientes.push({ cliente, quantidade: total });
        });
        const top10 = listaClientes
            .sort((a, b) => b.quantidade - a.quantidade)
            .slice(0, 10)
            .map((item, index) => ({
            posicao: index + 1,
            cliente: item.cliente.nome,
            quantidadeProdutos: item.cliente.getProdutosConsumidos.length,
            quantidadeServicos: item.cliente.getServicosConsumidos.length,
            total: item.quantidade
        }));
        return top10.filter(item => item.total > 0);
    }
    getRelatorioTop5ClientesPorValor() {
        const listaClientes = [];
        this.empresa.getClientes.forEach(cliente => {
            let valorTotal = 0;
            cliente.getProdutosConsumidos.forEach(produto => {
                valorTotal += produto.getValor;
            });
            cliente.getServicosConsumidos.forEach(servico => {
                valorTotal += servico.getValor;
            });
            listaClientes.push({ cliente, valor: valorTotal });
        });
        const top5 = listaClientes
            .sort((a, b) => b.valor - a.valor)
            .slice(0, 5)
            .map((item, index) => ({
            posicao: index + 1,
            cliente: item.cliente.nome,
            valorTotal: item.valor
        }));
        return top5.filter(item => item.valorTotal > 0);
    }
    getRelatorioProdutosServicosMaisConsumidos() {
        const contagem = {};
        this.empresa.getProdutos.forEach(p => {
            contagem[`Produto-${p.getNome}`] = { nome: p.getNome, tipo: 'Produto', quantidade: 0 };
        });
        this.empresa.getServicos.forEach(s => {
            contagem[`Serviço-${s.getNome}`] = { nome: s.getNome, tipo: 'Serviço', quantidade: 0 };
        });
        this.empresa.getClientes.forEach(cliente => {
            cliente.getProdutosConsumidos.forEach(produto => {
                const key = `Produto-${produto.getNome}`;
                if (contagem[key]) {
                    contagem[key].quantidade++;
                }
            });
            cliente.getServicosConsumidos.forEach(servico => {
                const key = `Serviço-${servico.getNome}`;
                if (contagem[key]) {
                    contagem[key].quantidade++;
                }
            });
        });
        const ranking = Object.values(contagem)
            .filter(item => item.quantidade > 0)
            .sort((a, b) => b.quantidade - a.quantidade);
        return ranking;
    }
    getRelatorioConsumoPorTipoRaca() {
        const resultados = [];
        console.log("[Relatório Tipo/Raça] Iniciando geração do relatório...");
        this.empresa.getClientes.forEach(cliente => {
            console.log(`[Relatório Tipo/Raça] Processando cliente: ${cliente.nome} (${cliente.getCpf.getValor})`);
            cliente.getPets.forEach(pet => {
                const tipo = pet.getTipo;
                const raca = pet.getRaca;
                console.log(`  [Relatório Tipo/Raça] Pet: ${pet.getNome}, Tipo: '${tipo}', Raça: '${raca}'`);
                if (!tipo || !raca || tipo.trim() === '' || raca.trim() === '') {
                    console.warn(`[Relatório Tipo/Raça] Pulando Pet com tipo/raça indefinidos/vazios para cliente ${cliente.nome}: ${pet.getNome}`);
                    return; // Pula este pet para evitar UNDEFINED
                }
                const tipoRaca = `${tipo} - ${raca}`;
                cliente.getProdutosConsumidos.forEach(produto => {
                    let encontrado = resultados.find(r => r.tipoRaca === tipoRaca && r.nome === produto.getNome && r.tipo === 'Produto');
                    if (encontrado) {
                        encontrado.quantidade++;
                    }
                    else {
                        resultados.push({ tipoRaca, nome: produto.getNome, tipo: 'Produto', quantidade: 1 });
                    }
                    console.log(`    [Relatório Tipo/Raça] Consumo de Produto: ${produto.getNome} para ${tipoRaca}`);
                });
                cliente.getServicosConsumidos.forEach(servico => {
                    let encontrado = resultados.find(r => r.tipoRaca === tipoRaca && r.nome === servico.getNome && r.tipo === 'Serviço');
                    if (encontrado) {
                        encontrado.quantidade++;
                    }
                    else {
                        resultados.push({ tipoRaca, nome: servico.getNome, tipo: 'Serviço', quantidade: 1 });
                    }
                    console.log(`    [Relatório Tipo/Raça] Consumo de Serviço: ${servico.getNome} para ${tipoRaca}`);
                });
            });
        });
        console.log("[Relatório Tipo/Raça] Resultados brutos:", resultados);
        const grupos = {};
        resultados.forEach(item => {
            if (!grupos[item.tipoRaca])
                grupos[item.tipoRaca] = [];
            grupos[item.tipoRaca].push(item);
        });
        console.log("[Relatório Tipo/Raça] Grupos formados:", grupos);
        const relatorioFinal = [];
        Object.keys(grupos).sort().forEach(tipoRaca => {
            grupos[tipoRaca].sort((a, b) => b.quantidade - a.quantidade).forEach(item => {
                relatorioFinal.push(item);
            });
        });
        console.log("[Relatório Tipo/Raça] Relatório final (ordenado):", relatorioFinal);
        return relatorioFinal;
    }
    getRelatorioConsumoPorTipo() {
        const resultados = [];
        console.log("[Relatório Tipo] Iniciando geração do relatório...");
        this.empresa.getClientes.forEach(cliente => {
            console.log(`[Relatório Tipo] Processando cliente: ${cliente.nome} (${cliente.getCpf.getValor})`);
            cliente.getPets.forEach(pet => {
                const tipoPet = pet.getTipo;
                console.log(`  [Relatório Tipo] Pet: ${pet.getNome}, Tipo: '${tipoPet}'`);
                if (!tipoPet || tipoPet.trim() === '') {
                    console.warn(`[Relatório Tipo] Pulando Pet com tipo indefinido/vazio para cliente ${cliente.nome}: ${pet.getNome}`);
                    return; // Pula este pet
                }
                cliente.getProdutosConsumidos.forEach(produto => {
                    let encontrado = resultados.find(r => r.tipoPet === tipoPet && r.nomeItem === produto.getNome && r.tipoItem === 'Produto');
                    if (encontrado) {
                        encontrado.quantidade++;
                    }
                    else {
                        resultados.push({ tipoPet, nomeItem: produto.getNome, tipoItem: 'Produto', quantidade: 1 });
                    }
                    console.log(`    [Relatório Tipo] Consumo de Produto: ${produto.getNome} para ${tipoPet}`);
                });
                cliente.getServicosConsumidos.forEach(servico => {
                    let encontrado = resultados.find(r => r.tipoPet === tipoPet && r.nomeItem === servico.getNome && r.tipoItem === 'Serviço');
                    if (encontrado) {
                        encontrado.quantidade++;
                    }
                    else {
                        resultados.push({ tipoPet, nomeItem: servico.getNome, tipoItem: 'Serviço', quantidade: 1 });
                    }
                    console.log(`    [Relatório Tipo] Consumo de Serviço: ${servico.getNome} para ${tipoPet}`);
                });
            });
        });
        console.log("[Relatório Tipo] Resultados brutos:", resultados);
        const grupos = {};
        resultados.forEach(item => {
            if (!grupos[item.tipoPet])
                grupos[item.tipoPet] = [];
            grupos[item.tipoPet].push(item);
        });
        console.log("[Relatório Tipo] Grupos formados:", grupos);
        const relatorioFinal = [];
        Object.keys(grupos).sort().forEach(tipoPet => {
            grupos[tipoPet].sort((a, b) => b.quantidade - a.quantidade).forEach(item => {
                relatorioFinal.push(item);
            });
        });
        console.log("[Relatório Tipo] Relatório final (ordenado):", relatorioFinal);
        return relatorioFinal;
    }
    // --- Dados Iniciais para Teste (Opcional) ---
    popularDadosIniciais() {
        // Criar alguns CPFs e clientes
        const cpf1 = new cpf_1.default("123.456.789-00", new Date(2020, 0, 1));
        const cliente1 = new cliente_1.default("João da Silva", "João", cpf1);
        this.empresa.getClientes.push(cliente1);
        const cpf2 = new cpf_1.default("987.654.321-00", new Date(2021, 5, 15));
        const cliente2 = new cliente_1.default("Maria Souza", "Maria", cpf2);
        this.empresa.getClientes.push(cliente2);
        // Criar alguns Pets - VERIFIQUE SE TODOS TÊM TIPO E RAÇA DEFINIDOS
        const pet1 = new pet_1.default("Rex", "Labrador", "Macho", "Cachorro");
        cliente1.getPets.push(pet1);
        const pet2 = new pet_1.default("Mia", "Persa", "Fêmea", "Gato");
        cliente2.getPets.push(pet2);
        const pet3 = new pet_1.default("Buddy", "Poodle", "Macho", "Cachorro");
        cliente1.getPets.push(pet3);
        // Criar alguns Produtos
        const prod1 = new produto_1.default("Ração Premium", 75.50, "Ração de alta qualidade para cães");
        this.empresa.getProdutos.push(prod1);
        const prod2 = new produto_1.default("Brinquedo Mordedor", 25.00, "Brinquedo para cachorros");
        this.empresa.getProdutos.push(prod2);
        const prod3 = new produto_1.default("Coleira Anti-pulgas", 50.00, "Coleira para prevenir pulgas");
        this.empresa.getProdutos.push(prod3);
        // Criar alguns Serviços
        const serv1 = new servico_1.default("Banho e Tosa", 80.00, "Serviço completo de higiene");
        this.empresa.getServicos.push(serv1);
        const serv2 = new servico_1.default("Consulta Veterinária", 120.00, "Atendimento médico para pets");
        this.empresa.getServicos.push(serv2);
        const serv3 = new servico_1.default("Vacinação", 90.00, "Aplicação de vacinas");
        this.empresa.getServicos.push(serv3);
        // Registrar alguns consumos
        // Consumos para João da Silva (dono de Rex e Buddy)
        cliente1.getProdutosConsumidos.push(prod1); // Ração para Rex
        cliente1.getProdutosConsumidos.push(prod2); // Brinquedo para Buddy
        cliente1.getServicosConsumidos.push(serv1); // Banho e Tosa para Rex
        cliente1.getServicosConsumidos.push(serv3); // Vacinação para Buddy
        // Consumos para Maria Souza (dona de Mia)
        cliente2.getProdutosConsumidos.push(prod1); // Ração para Mia
        cliente2.getServicosConsumidos.push(serv2); // Consulta para Mia
        cliente2.getServicosConsumidos.push(serv2); // Outra consulta para Mia
        console.log("Dados iniciais populados.");
    }
}
// Exporta uma única instância da classe para ser usada em todo o aplicativo
const empresaService = new EmpresaService();
exports.default = empresaService;
