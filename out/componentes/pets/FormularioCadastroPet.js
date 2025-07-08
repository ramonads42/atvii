"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class FormularioCadastroPet extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            tipo: '',
            raca: '',
            genero: '',
            cpfCliente: '',
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
        const { nome, tipo, raca, genero, cpfCliente } = this.state;
        if (!nome || !tipo || !raca || !genero || !cpfCliente) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        const clienteExiste = this.props.clientes.some(c => c.getCpf.getValor === cpfCliente);
        if (!clienteExiste) {
            alert(`Cliente com CPF ${cpfCliente} não encontrado. Cadastre o cliente primeiro.`);
            return;
        }
        this.props.cadastrarPet(cpfCliente, nome, tipo, raca, genero);
        this.props.atualizarDados();
        this.props.seletorView('Pets', event);
    }
    render() {
        const { tema, seletorView, clientes } = this.props;
        const { nome, tipo, raca, genero, cpfCliente } = this.state;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Cadastro de Pet" }), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: this.handleSubmit }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "nome", className: "form-label" }, { children: "Nome do Pet" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "nome", name: "nome", value: nome, onChange: this.handleChange, required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "tipo", className: "form-label" }, { children: "Tipo (Ex: Cachorro, Gato)" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "tipo", name: "tipo", value: tipo, onChange: this.handleChange, required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "raca", className: "form-label" }, { children: "Ra\u00E7a" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "raca", name: "raca", value: raca, onChange: this.handleChange, required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "genero", className: "form-label" }, { children: "G\u00EAnero" })), (0, jsx_runtime_1.jsxs)("select", Object.assign({ className: "form-select", id: "genero", name: "genero", value: genero, onChange: this.handleChange, required: true }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "" }, { children: "Selecione..." })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "Macho" }, { children: "Macho" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "F\u00EAmea" }, { children: "F\u00EAmea" }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "cpfCliente", className: "form-label" }, { children: "CPF do Cliente Dono" })), (0, jsx_runtime_1.jsxs)("select", Object.assign({ className: "form-select", id: "cpfCliente", name: "cpfCliente", value: cpfCliente, onChange: this.handleChange, required: true }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "" }, { children: "Selecione o dono..." })), clientes.map(cliente => ((0, jsx_runtime_1.jsxs)("option", Object.assign({ value: cliente.getCpf.getValor }, { children: [cliente.nome, " (", cliente.getCpf.getValor, ")"] }), cliente.getCpf.getValor)))] }))] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", className: "btn btn-success me-2" }, { children: "Cadastrar" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Pets', e) }, { children: "Voltar" }))] }))] })));
    }
}
exports.default = FormularioCadastroPet;
