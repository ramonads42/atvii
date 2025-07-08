"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class FormularioCadastroServico extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            valor: '',
            descricao: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const { nome, valor, descricao } = this.state;
        const valorNumerico = parseFloat(valor);
        if (!nome || isNaN(valorNumerico) || valorNumerico < 0) {
            alert("Por favor, preencha o nome e um valor numérico válido para o serviço.");
            return;
        }
        this.props.cadastrarServico(nome, valorNumerico, descricao);
        this.props.atualizarDados();
        this.props.seletorView('Serviços', event);
    }
    render() {
        const { tema, seletorView } = this.props;
        const { nome, valor, descricao } = this.state;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Cadastro de Servi\u00E7o" }), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: this.handleSubmit }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "nome", className: "form-label" }, { children: "Nome do Servi\u00E7o" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "nome", name: "nome", value: nome, onChange: this.handleChange, required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "valor", className: "form-label" }, { children: "Valor (R$)" })), (0, jsx_runtime_1.jsx)("input", { type: "number", step: "0.01", className: "form-control", id: "valor", name: "valor", value: valor, onChange: this.handleChange, required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "descricao", className: "form-label" }, { children: "Descri\u00E7\u00E3o" })), (0, jsx_runtime_1.jsx)("textarea", { className: "form-control", id: "descricao", name: "descricao", value: descricao, onChange: this.handleChange, rows: 3 })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", className: "btn btn-success me-2" }, { children: "Cadastrar" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Serviços', e) }, { children: "Voltar" }))] }))] })));
    }
}
exports.default = FormularioCadastroServico;
