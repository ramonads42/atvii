"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const BarraNavegacao_1 = __importDefault(require("./BarraNavegacao"));
const ListaClientes_1 = __importDefault(require("./clientes/ListaClientes"));
const FormularioCadastroCliente_1 = __importDefault(require("./clientes/FormularioCadastroCliente"));
const FormularioAtualizacaoCliente_1 = __importDefault(require("./clientes/FormularioAtualizacaoCliente"));
const ConfirmacaoExclusaoCliente_1 = __importDefault(require("./clientes/ConfirmacaoExclusaoCliente"));
const ListaPets_1 = __importDefault(require("./pets/ListaPets"));
const FormularioCadastroPet_1 = __importDefault(require("./pets/FormularioCadastroPet"));
const FormularioAtualizacaoPet_1 = __importDefault(require("./pets/FormularioAtualizacaoPet"));
const ConfirmacaoExclusaoPet_1 = __importDefault(require("./pets/ConfirmacaoExclusaoPet"));
const ListaProdutos_1 = __importDefault(require("./produtos/ListaProdutos"));
const FormularioCadastroProduto_1 = __importDefault(require("./produtos/FormularioCadastroProduto"));
const FormularioAtualizacaoProduto_1 = __importDefault(require("./produtos/FormularioAtualizacaoProduto"));
const ConfirmacaoExclusaoProduto_1 = __importDefault(require("./produtos/ConfirmacaoExclusaoProduto"));
const ListaServicos_1 = __importDefault(require("./servicos/ListaServicos"));
const FormularioCadastroServico_1 = __importDefault(require("./servicos/FormularioCadastroServico"));
const FormularioAtualizacaoServico_1 = __importDefault(require("./servicos/FormularioAtualizacaoServico"));
const ConfirmacaoExclusaoServico_1 = __importDefault(require("./servicos/ConfirmacaoExclusaoServico"));
const RegistroConsumo_1 = __importDefault(require("./consumo/RegistroConsumo"));
const RelatorioClientesMaisConsumiram_1 = __importDefault(require("./relatorios/RelatorioClientesMaisConsumiram"));
const RelatorioProdutosServicosMaisConsumidos_1 = __importDefault(require("./relatorios/RelatorioProdutosServicosMaisConsumidos"));
const RelatorioConsumoPorTipoRaca_1 = __importDefault(require("./relatorios/RelatorioConsumoPorTipoRaca"));
const RelatorioClientesMaisGastaram_1 = __importDefault(require("./relatorios/RelatorioClientesMaisGastaram"));
const RelatorioConsumoPorTipo_1 = __importDefault(require("./relatorios/RelatorioConsumoPorTipo"));
const EmpresaService_1 = __importDefault(require("../servicos/EmpresaService"));
class Roteador extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            tela: 'Clientes',
            itemSelecionado: undefined,
            clientes: [],
            produtos: [],
            servicos: [],
        };
        this.selecionarView = this.selecionarView.bind(this);
        this.selecionarViewComItem = this.selecionarViewComItem.bind(this);
        this.atualizarDados = this.atualizarDados.bind(this);
    }
    componentDidMount() {
        this.atualizarDados();
    }
    atualizarDados() {
        this.setState({
            clientes: EmpresaService_1.default.getClientes(),
            produtos: EmpresaService_1.default.getProdutos(),
            servicos: EmpresaService_1.default.getServicos(),
        });
    }
    selecionarView(novaTela, evento) {
        if (evento)
            evento.preventDefault();
        console.log(novaTela);
        this.setState({
            tela: novaTela,
            itemSelecionado: undefined
        });
        this.atualizarDados();
    }
    selecionarViewComItem(novaTela, item, evento) {
        if (evento)
            evento.preventDefault();
        console.log(`Navegando para ${novaTela} com item:`, item);
        this.setState({
            tela: novaTela,
            itemSelecionado: item
        });
    }
    render() {
        let barraNavegacao = (0, jsx_runtime_1.jsx)(BarraNavegacao_1.default, { seletorView: this.selecionarView, tema: "#e3f2fd" });
        let conteudo;
        const { clientes, produtos, servicos } = this.state;
        switch (this.state.tela) {
            // Clientes
            case 'Clientes':
                conteudo = (0, jsx_runtime_1.jsx)(ListaClientes_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, selecionarViewComItem: this.selecionarViewComItem, clientes: clientes, atualizarDados: this.atualizarDados });
                break;
            case 'Cadastrar Cliente':
                conteudo = (0, jsx_runtime_1.jsx)(FormularioCadastroCliente_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, cadastrarCliente: EmpresaService_1.default.cadastrarClienteComDados.bind(EmpresaService_1.default), atualizarDados: this.atualizarDados });
                break;
            case 'Atualizar Cliente':
                conteudo = (0, jsx_runtime_1.jsx)(FormularioAtualizacaoCliente_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, cliente: this.state.itemSelecionado, atualizarCliente: EmpresaService_1.default.atualizarCliente.bind(EmpresaService_1.default), atualizarDados: this.atualizarDados });
                break;
            case 'Excluir Cliente':
                conteudo = (0, jsx_runtime_1.jsx)(ConfirmacaoExclusaoCliente_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, cliente: this.state.itemSelecionado, excluirCliente: EmpresaService_1.default.excluirCliente.bind(EmpresaService_1.default), atualizarDados: this.atualizarDados });
                break;
            // Pets
            case 'Pets':
                conteudo = (0, jsx_runtime_1.jsx)(ListaPets_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, selecionarViewComItem: this.selecionarViewComItem, pets: clientes.flatMap(c => c.getPets.map(p => ({
                        nome: p.getNome,
                        tipo: p.getTipo,
                        raca: p.getRaca,
                        genero: p.getGenero,
                        cpfCliente: c.getCpf.getValor
                    }))), atualizarDados: this.atualizarDados });
                break;
            case 'Cadastrar Pet':
                conteudo = (0, jsx_runtime_1.jsx)(FormularioCadastroPet_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, cadastrarPet: EmpresaService_1.default.cadastrarPet.bind(EmpresaService_1.default), clientes: clientes, atualizarDados: this.atualizarDados });
                break;
            case 'Atualizar Pet':
                conteudo = (0, jsx_runtime_1.jsx)(FormularioAtualizacaoPet_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, pet: this.state.itemSelecionado, atualizarPet: EmpresaService_1.default.atualizarPet.bind(EmpresaService_1.default), atualizarDados: this.atualizarDados });
                break;
            case 'Excluir Pet':
                conteudo = (0, jsx_runtime_1.jsx)(ConfirmacaoExclusaoPet_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, pet: this.state.itemSelecionado, excluirPet: EmpresaService_1.default.excluirPet.bind(EmpresaService_1.default), atualizarDados: this.atualizarDados });
                break;
            // Produtos
            case 'Produtos':
                conteudo = (0, jsx_runtime_1.jsx)(ListaProdutos_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, selecionarViewComItem: this.selecionarViewComItem, produtos: produtos, atualizarDados: this.atualizarDados });
                break;
            case 'Cadastrar Produto':
                conteudo = (0, jsx_runtime_1.jsx)(FormularioCadastroProduto_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, cadastrarProduto: EmpresaService_1.default.cadastrarProduto.bind(EmpresaService_1.default), atualizarDados: this.atualizarDados });
                break;
            case 'Atualizar Produto':
                conteudo = (0, jsx_runtime_1.jsx)(FormularioAtualizacaoProduto_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, produto: this.state.itemSelecionado, atualizarProduto: EmpresaService_1.default.atualizarProduto.bind(EmpresaService_1.default), atualizarDados: this.atualizarDados });
                break;
            case 'Excluir Produto':
                conteudo = (0, jsx_runtime_1.jsx)(ConfirmacaoExclusaoProduto_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, produto: this.state.itemSelecionado, excluirProduto: EmpresaService_1.default.excluirProduto.bind(EmpresaService_1.default), atualizarDados: this.atualizarDados });
                break;
            // Serviços
            case 'Serviços':
                conteudo = (0, jsx_runtime_1.jsx)(ListaServicos_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, selecionarViewComItem: this.selecionarViewComItem, servicos: servicos, atualizarDados: this.atualizarDados });
                break;
            case 'Cadastrar Serviço':
                conteudo = (0, jsx_runtime_1.jsx)(FormularioCadastroServico_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, cadastrarServico: EmpresaService_1.default.cadastrarServico.bind(EmpresaService_1.default), atualizarDados: this.atualizarDados });
                break;
            case 'Atualizar Serviço':
                conteudo = (0, jsx_runtime_1.jsx)(FormularioAtualizacaoServico_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, servico: this.state.itemSelecionado, atualizarServico: EmpresaService_1.default.atualizarServico.bind(EmpresaService_1.default), atualizarDados: this.atualizarDados });
                break;
            case 'Excluir Serviço':
                conteudo = (0, jsx_runtime_1.jsx)(ConfirmacaoExclusaoServico_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, servico: this.state.itemSelecionado, excluirServico: EmpresaService_1.default.excluirServico.bind(EmpresaService_1.default), atualizarDados: this.atualizarDados });
                break;
            // Consumo
            case 'Consumo':
                conteudo = ((0, jsx_runtime_1.jsx)(RegistroConsumo_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, clientes: clientes, produtos: produtos, servicos: servicos, registrarConsumo: EmpresaService_1.default.registrarConsumo.bind(EmpresaService_1.default), atualizarDados: this.atualizarDados }));
                break;
            // Relatórios 
            case 'Relatórios':
                conteudo = ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Relat\u00F3rios Dispon\u00EDveis" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "list-group" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "list-group-item list-group-item-action", onClick: (e) => this.selecionarView('Relatório Clientes + Consumo', e) }, { children: "Top 10 Clientes que Mais Consumiram (Quantidade)" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "list-group-item list-group-item-action", onClick: (e) => this.selecionarView('Relatório Clientes + Gastaram', e) }, { children: "Top 5 Clientes que Mais Consumiram (Valor)" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "list-group-item list-group-item-action", onClick: (e) => this.selecionarView('Relatório Prod/Serv + Consumo', e) }, { children: "Produtos e Servi\u00E7os Mais Consumidos (Geral)" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "list-group-item list-group-item-action", onClick: (e) => this.selecionarView('Mais Consumidos por Raça', e) }, { children: "Mais Consumidos por Ra\u00E7a" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "list-group-item list-group-item-action", onClick: (e) => this.selecionarView('Mais Consumidos por Tipo', e) }, { children: "Mais Consumidos por Tipo" }))] }))] })));
                break;
            case 'Relatório Clientes + Consumo':
                conteudo = (0, jsx_runtime_1.jsx)(RelatorioClientesMaisConsumiram_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, getRelatorio: EmpresaService_1.default.getRelatorioTop10ClientesPorQuantidade.bind(EmpresaService_1.default) });
                break;
            case 'Relatório Clientes + Gastaram':
                conteudo = (0, jsx_runtime_1.jsx)(RelatorioClientesMaisGastaram_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, getRelatorio: EmpresaService_1.default.getRelatorioTop5ClientesPorValor.bind(EmpresaService_1.default) });
                break;
            case 'Relatório Prod/Serv + Consumo':
                conteudo = (0, jsx_runtime_1.jsx)(RelatorioProdutosServicosMaisConsumidos_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, getRelatorio: EmpresaService_1.default.getRelatorioProdutosServicosMaisConsumidos.bind(EmpresaService_1.default) });
                break;
            case 'Mais Consumidos por Raça':
                conteudo = (0, jsx_runtime_1.jsx)(RelatorioConsumoPorTipoRaca_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, getRelatorio: EmpresaService_1.default.getRelatorioConsumoPorTipoRaca.bind(EmpresaService_1.default) });
                break;
            case 'Mais Consumidos por Tipo':
                conteudo = (0, jsx_runtime_1.jsx)(RelatorioConsumoPorTipo_1.default, { tema: "#e3f2fd", seletorView: this.selecionarView, getRelatorio: EmpresaService_1.default.getRelatorioConsumoPorTipo.bind(EmpresaService_1.default) });
                break;
            default:
                conteudo = (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Bem-vindo!" }), (0, jsx_runtime_1.jsx)("p", { children: "Selecione uma op\u00E7\u00E3o na barra de navega\u00E7\u00E3o." })] });
        }
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [barraNavegacao, (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "container-fluid" }, { children: conteudo }))] }));
    }
}
exports.default = Roteador;
