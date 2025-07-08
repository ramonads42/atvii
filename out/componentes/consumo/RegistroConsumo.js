"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class RegistroConsumo extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            clienteSelecionadoCpf: '',
            itemTipo: '',
            itemId: null,
            feedback: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectCliente = this.handleSelectCliente.bind(this);
        this.handleSelectTipoItem = this.handleSelectTipoItem.bind(this);
        this.handleSelectItem = this.handleSelectItem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleSelectCliente(event) {
        this.setState({ clienteSelecionadoCpf: event.target.value, feedback: '' });
    }
    handleSelectTipoItem(event) {
        this.setState({ itemTipo: event.target.value, itemId: null, feedback: '' });
    }
    handleSelectItem(event) {
        this.setState({ itemId: event.target.value, feedback: '' });
    }
    handleSubmit(event) {
        event.preventDefault();
        const { clienteSelecionadoCpf, itemTipo, itemId } = this.state;
        const { clientes, produtos, servicos } = this.props;
        if (!clienteSelecionadoCpf || !itemTipo || !itemId) {
            this.setState({ feedback: 'Por favor, preencha todos os campos.' });
            return;
        }
        const cliente = clientes.find(c => c.getCpf.getValor === clienteSelecionadoCpf);
        let itemConsumido;
        if (itemTipo === 'produto') {
            itemConsumido = produtos.find(p => p.getNome === itemId);
        }
        else if (itemTipo === 'servico') {
            itemConsumido = servicos.find(s => s.getNome === itemId);
        }
        if (!cliente || !itemConsumido) {
            this.setState({ feedback: 'Cliente ou item selecionado inválido.' });
            return;
        }
        this.props.registrarConsumo(cliente.getCpf.getValor, itemConsumido.getNome, itemTipo);
        this.props.atualizarDados();
        this.setState({
            feedback: `Consumo de ${itemConsumido.getNome} registrado para ${cliente.nome}!`,
            clienteSelecionadoCpf: '',
            itemTipo: '',
            itemId: null,
        });
    }
    render() {
        const { tema, seletorView, clientes, produtos, servicos } = this.props;
        const { clienteSelecionadoCpf, itemTipo, itemId, feedback } = this.state;
        const itensDisponiveis = itemTipo === 'produto' ? produtos : itemTipo === 'servico' ? servicos : [];
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Registrar Consumo" }), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: this.handleSubmit }, { children: [feedback && ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `alert ${feedback.includes('registrado') ? 'alert-success' : 'alert-danger'}`, role: "alert" }, { children: feedback }))), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "clienteSelecionadoCpf", className: "form-label" }, { children: "Selecionar Cliente" })), (0, jsx_runtime_1.jsxs)("select", Object.assign({ className: "form-select", id: "clienteSelecionadoCpf", name: "clienteSelecionadoCpf", value: clienteSelecionadoCpf, onChange: this.handleSelectCliente, required: true }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "" }, { children: "Selecione um cliente..." })), clientes.map(cliente => ((0, jsx_runtime_1.jsxs)("option", Object.assign({ value: cliente.getCpf.getValor }, { children: [cliente.nome, " (", cliente.getCpf.getValor, ")"] }), cliente.getCpf.getValor)))] }))] })), clienteSelecionadoCpf && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "itemTipo", className: "form-label" }, { children: "Tipo de Consumo" })), (0, jsx_runtime_1.jsxs)("select", Object.assign({ className: "form-select", id: "itemTipo", name: "itemTipo", value: itemTipo, onChange: this.handleSelectTipoItem, required: true }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "" }, { children: "Selecione o que foi consumido..." })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "produto" }, { children: "Produto" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "servico" }, { children: "Servi\u00E7o" }))] }))] })), itemTipo && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "itemId", className: "form-label" }, { children: "Item" })), (0, jsx_runtime_1.jsxs)("select", Object.assign({ className: "form-select", id: "itemId", name: "itemId", value: itemId || '', onChange: this.handleSelectItem, required: true }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "" }, { children: "Selecione o item..." })), itensDisponiveis.map(item => ((0, jsx_runtime_1.jsxs)("option", Object.assign({ value: item.getNome }, { children: [item.getNome, " (R$ ", item.getValor.toFixed(2), ")"] }), item.getNome)))] }))] })))] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", className: "btn btn-success me-2", disabled: !clienteSelecionadoCpf || !itemTipo || !itemId }, { children: "Registrar Consumo" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Clientes', e) }, { children: "Voltar ao Menu" }))] }))] })));
    }
}
exports.default = RegistroConsumo;
