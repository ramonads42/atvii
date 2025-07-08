"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class ConfirmacaoExclusaoProduto extends react_1.Component {
    constructor(props) {
        super(props);
        this.handleExcluir = this.handleExcluir.bind(this);
    }
    handleExcluir(event) {
        event.preventDefault();
        if (!this.props.produto) {
            alert("Nenhum produto selecionado para exclusão.");
            return;
        }
        const nomeProduto = this.props.produto.getNome;
        this.props.excluirProduto(nomeProduto);
        this.props.atualizarDados();
        alert(`Produto "${nomeProduto}" excluído com sucesso!`);
        this.props.seletorView('Produtos', event);
    }
    render() {
        const { tema, seletorView, produto } = this.props;
        if (!produto) {
            return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Excluir Produto" }), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "alert alert-warning" }, { children: "Nenhum produto selecionado para exclus\u00E3o. Por favor, volte para a lista de produtos e selecione um." })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Produtos', e) }, { children: "Voltar" }))] })));
        }
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Confirmar Exclus\u00E3o de Produto" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "alert alert-warning", role: "alert" }, { children: ["Voc\u00EA tem certeza que deseja excluir o produto: ", (0, jsx_runtime_1.jsx)("strong", { children: produto.getNome }), " (Valor: R$ ", produto.getValor.toFixed(2), ", Descri\u00E7\u00E3o: ", produto.getDescricao, ")?"] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-danger me-2", onClick: this.handleExcluir }, { children: "Sim, Excluir" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Produtos', e) }, { children: "Cancelar" }))] })));
    }
}
exports.default = ConfirmacaoExclusaoProduto;
