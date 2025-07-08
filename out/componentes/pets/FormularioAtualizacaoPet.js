"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class FormularioAtualizacaoPet extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: props.pet ? props.pet.nome : '',
            tipo: props.pet ? props.pet.tipo : '',
            raca: props.pet ? props.pet.raca : '',
            genero: props.pet ? props.pet.genero : '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.pet !== this.props.pet && this.props.pet) {
            this.setState({
                nome: this.props.pet.nome,
                tipo: this.props.pet.tipo,
                raca: this.props.pet.raca,
                genero: this.props.pet.genero,
            });
        }
    }
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        event.preventDefault();
        if (!this.props.pet) {
            alert("Nenhum pet selecionado para atualização.");
            return;
        }
        const { nome, tipo, raca, genero } = this.state;
        const { pet } = this.props;
        this.props.atualizarPet(pet.cpfCliente, pet.nome, nome, tipo, raca, genero);
        this.props.atualizarDados();
        this.props.seletorView('Pets', event);
    }
    render() {
        const { tema, seletorView, pet } = this.props;
        const { nome, tipo, raca, genero } = this.state;
        if (!pet) {
            return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Atualizar Pet" }), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "alert alert-warning" }, { children: "Nenhum pet selecionado para atualiza\u00E7\u00E3o. Por favor, volte para a lista de pets e selecione um." })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Pets', e) }, { children: "Voltar" }))] })));
        }
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsxs)("h2", { children: ["Atualizar Pet: ", pet.nome] }), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: this.handleSubmit }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "nome", className: "form-label" }, { children: "Nome do Pet" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "nome", name: "nome", value: nome, onChange: this.handleChange, required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "tipo", className: "form-label" }, { children: "Tipo (Ex: Cachorro, Gato)" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "tipo", name: "tipo", value: tipo, onChange: this.handleChange, required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "raca", className: "form-label" }, { children: "Ra\u00E7a" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "raca", name: "raca", value: raca, onChange: this.handleChange, required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "genero", className: "form-label" }, { children: "G\u00EAnero" })), (0, jsx_runtime_1.jsxs)("select", Object.assign({ className: "form-select", id: "genero", name: "genero", value: genero, onChange: this.handleChange, required: true }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "" }, { children: "Selecione..." })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "Macho" }, { children: "Macho" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "F\u00EAmea" }, { children: "F\u00EAmea" }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "cpfCliente", className: "form-label" }, { children: "CPF do Cliente Dono (N\u00E3o Edit\u00E1vel)" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "cpfCliente", name: "cpfCliente", value: pet.cpfCliente, readOnly: true, disabled: true })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", className: "btn btn-primary me-2" }, { children: "Atualizar" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Pets', e) }, { children: "Cancelar" }))] }))] })));
    }
}
exports.default = FormularioAtualizacaoPet;
