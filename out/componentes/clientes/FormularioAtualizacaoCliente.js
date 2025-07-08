"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class FormularioAtualizacaoCliente extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: props.cliente ? props.cliente.nome : '',
            nomeSocial: props.cliente ? props.cliente.nomeSocial : '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.cliente !== this.props.cliente && this.props.cliente) {
            this.setState({
                nome: this.props.cliente.nome,
                nomeSocial: this.props.cliente.nomeSocial,
            });
        }
    }
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        event.preventDefault();
        if (!this.props.cliente) {
            alert("Nenhum cliente selecionado para atualização.");
            return;
        }
        const { nome, nomeSocial } = this.state;
        const cpfCliente = this.props.cliente.getCpf.getValor;
        this.props.atualizarCliente(cpfCliente, nome, nomeSocial);
        this.props.atualizarDados();
        this.props.seletorView('Clientes', event);
    }
    render() {
        const { tema, seletorView, cliente } = this.props;
        const { nome, nomeSocial } = this.state;
        if (!cliente) {
            return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Atualizar Cliente" }), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "alert alert-warning" }, { children: "Nenhum cliente selecionado para atualiza\u00E7\u00E3o. Por favor, volte para a lista de clientes e selecione um." })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Clientes', e) }, { children: "Voltar" }))] })));
        }
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsxs)("h2", { children: ["Atualizar Cliente: ", cliente.nome] }), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: this.handleSubmit }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "nome", className: "form-label" }, { children: "Nome" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "nome", name: "nome", value: nome, onChange: this.handleChange, required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "nomeSocial", className: "form-label" }, { children: "Nome Social" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "nomeSocial", name: "nomeSocial", value: nomeSocial, onChange: this.handleChange })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "cpf", className: "form-label" }, { children: "CPF (N\u00E3o Edit\u00E1vel)" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "cpf", name: "cpf", value: cliente.getCpf.getValor, readOnly: true, disabled: true })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", className: "btn btn-primary me-2" }, { children: "Atualizar" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Clientes', e) }, { children: "Cancelar" }))] }))] })));
    }
}
exports.default = FormularioAtualizacaoCliente;
