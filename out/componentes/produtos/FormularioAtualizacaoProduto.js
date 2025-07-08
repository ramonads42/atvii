"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class FormularioAtualizacaoProduto extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: props.produto ? props.produto.getNome : '',
            valor: props.produto ? props.produto.getValor.toFixed(2) : '',
            descricao: props.produto ? props.produto.getDescricao : '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.produto !== this.props.produto && this.props.produto) {
            this.setState({
                nome: this.props.produto.getNome,
                valor: this.props.produto.getValor.toFixed(2),
                descricao: this.props.produto.getDescricao,
            });
        }
    }
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        event.preventDefault();
        if (!this.props.produto) {
            alert("Nenhum produto selecionado para atualização.");
            return;
        }
        const { nome, valor, descricao } = this.state;
        const valorNumerico = parseFloat(valor);
        const nomeProdutoOriginal = this.props.produto.getNome;
        if (!nome || isNaN(valorNumerico) || valorNumerico < 0) {
            alert("Por favor, preencha o nome e um valor numérico válido para o produto.");
            return;
        }
        this.props.atualizarProduto(nomeProdutoOriginal, nome, valorNumerico, descricao);
        this.props.atualizarDados();
        this.props.seletorView('Produtos', event);
    }
    render() {
        const { tema, seletorView, produto } = this.props;
        const { nome, valor, descricao } = this.state;
        if (!produto) {
            return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Atualizar Produto" }), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "alert alert-warning" }, { children: "Nenhum produto selecionado para atualiza\u00E7\u00E3o. Por favor, volte para a lista de produtos e selecione um." })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Produtos', e) }, { children: "Voltar" }))] })));
        }
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsxs)("h2", { children: ["Atualizar Produto: ", produto.getNome] }), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: this.handleSubmit }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "nome", className: "form-label" }, { children: "Nome do Produto" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "nome", name: "nome", value: nome, onChange: this.handleChange, required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "valor", className: "form-label" }, { children: "Valor (R$)" })), (0, jsx_runtime_1.jsx)("input", { type: "number", step: "0.01", className: "form-control", id: "valor", name: "valor", value: valor, onChange: this.handleChange, required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "descricao", className: "form-label" }, { children: "Descri\u00E7\u00E3o" })), (0, jsx_runtime_1.jsx)("textarea", { className: "form-control", id: "descricao", name: "descricao", value: descricao, onChange: this.handleChange, rows: 3 })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", className: "btn btn-primary me-2" }, { children: "Atualizar" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Produtos', e) }, { children: "Cancelar" }))] }))] })));
    }
}
exports.default = FormularioAtualizacaoProduto;
