"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class ConfirmacaoExclusaoCliente extends react_1.Component {
    constructor(props) {
        super(props);
        this.handleExcluir = this.handleExcluir.bind(this);
    }
    handleExcluir(event) {
        event.preventDefault();
        if (!this.props.cliente) {
            alert("Nenhum cliente selecionado para exclusão.");
            return;
        }
        const cpfCliente = this.props.cliente.getCpf.getValor;
        const nomeCliente = this.props.cliente.nome;
        this.props.excluirCliente(cpfCliente);
        this.props.atualizarDados();
        alert(`Cliente "${nomeCliente}" (CPF: ${cpfCliente}) excluído com sucesso!`);
        this.props.seletorView('Clientes', event);
    }
    render() {
        const { tema, seletorView, cliente } = this.props;
        if (!cliente) {
            return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Excluir Cliente" }), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "alert alert-warning" }, { children: "Nenhum cliente selecionado para exclus\u00E3o. Por favor, volte para a lista de clientes e selecione um." })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Clientes', e) }, { children: "Voltar" }))] })));
        }
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Confirmar Exclus\u00E3o de Cliente" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "alert alert-warning", role: "alert" }, { children: ["Voc\u00EA tem certeza que deseja excluir o cliente: ", (0, jsx_runtime_1.jsx)("strong", { children: cliente.nome }), " (CPF: ", cliente.getCpf.getValor, ")?"] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-danger me-2", onClick: this.handleExcluir }, { children: "Sim, Excluir" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Clientes', e) }, { children: "Cancelar" }))] })));
    }
}
exports.default = ConfirmacaoExclusaoCliente;
