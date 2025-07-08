"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class FormularioCadastroCliente extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            nomeSocial: '',
            cpf: '',
            dataEmissaoCpf: '',
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
        const { nome, nomeSocial, cpf, dataEmissaoCpf } = this.state;
        if (!nome || !cpf || !dataEmissaoCpf) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        this.props.cadastrarCliente(nome, nomeSocial, cpf, dataEmissaoCpf);
        this.props.atualizarDados();
        this.props.seletorView('Clientes', event);
    }
    render() {
        const { tema, seletorView } = this.props;
        const { nome, nomeSocial, cpf, dataEmissaoCpf } = this.state;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Cadastro de Cliente" }), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: this.handleSubmit }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "nome", className: "form-label" }, { children: "Nome" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "nome", name: "nome", value: nome, onChange: this.handleChange, required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "nomeSocial", className: "form-label" }, { children: "Nome Social" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "nomeSocial", name: "nomeSocial", value: nomeSocial, onChange: this.handleChange })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "cpf", className: "form-label" }, { children: "CPF" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "cpf", name: "cpf", value: cpf, onChange: this.handleChange, placeholder: "Ex: 123.456.789-00", required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "dataEmissaoCpf", className: "form-label" }, { children: "Data de Emiss\u00E3o do CPF (dd/mm/yyyy)" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "dataEmissaoCpf", name: "dataEmissaoCpf", value: dataEmissaoCpf, onChange: this.handleChange, placeholder: "Ex: 01/01/2020", required: true })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", className: "btn btn-success me-2" }, { children: "Cadastrar" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Clientes', e) }, { children: "Voltar" }))] }))] })));
    }
}
exports.default = FormularioCadastroCliente;
