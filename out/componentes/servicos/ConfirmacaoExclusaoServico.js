"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class ConfirmacaoExclusaoServico extends react_1.Component {
    constructor(props) {
        super(props);
        this.handleExcluir = this.handleExcluir.bind(this);
    }
    handleExcluir(event) {
        event.preventDefault();
        if (!this.props.servico) {
            alert("Nenhum serviço selecionado para exclusão.");
            return;
        }
        const nomeServico = this.props.servico.getNome;
        this.props.excluirServico(nomeServico);
        this.props.atualizarDados();
        alert(`Serviço "${nomeServico}" excluído com sucesso!`);
        this.props.seletorView('Serviços', event);
    }
    render() {
        const { tema, seletorView, servico } = this.props;
        if (!servico) {
            return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Excluir Servi\u00E7o" }), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "alert alert-warning" }, { children: "Nenhum servi\u00E7o selecionado para exclus\u00E3o. Por favor, volte para a lista de servi\u00E7os e selecione um." })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Serviços', e) }, { children: "Voltar" }))] })));
        }
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Confirmar Exclus\u00E3o de Servi\u00E7o" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "alert alert-warning", role: "alert" }, { children: ["Voc\u00EA tem certeza que deseja excluir o servi\u00E7o: ", (0, jsx_runtime_1.jsx)("strong", { children: servico.getNome }), " (Valor: R$ ", servico.getValor.toFixed(2), ", Descri\u00E7\u00E3o: ", servico.getDescricao, ")?"] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-danger me-2", onClick: this.handleExcluir }, { children: "Sim, Excluir" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Serviços', e) }, { children: "Cancelar" }))] })));
    }
}
exports.default = ConfirmacaoExclusaoServico;
