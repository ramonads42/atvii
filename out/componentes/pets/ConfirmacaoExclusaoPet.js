"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class ConfirmacaoExclusaoPet extends react_1.Component {
    constructor(props) {
        super(props);
        this.handleExcluir = this.handleExcluir.bind(this);
    }
    handleExcluir(event) {
        event.preventDefault();
        if (!this.props.pet) {
            alert("Nenhum pet selecionado para exclusão.");
            return;
        }
        const { pet } = this.props;
        this.props.excluirPet(pet.cpfCliente, pet.nome);
        this.props.atualizarDados();
        alert(`Pet "${pet.nome}" do cliente ${pet.cpfCliente} excluído com sucesso!`);
        this.props.seletorView('Pets', event);
    }
    render() {
        const { tema, seletorView, pet } = this.props;
        if (!pet) {
            return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Excluir Pet" }), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "alert alert-warning" }, { children: "Nenhum pet selecionado para exclus\u00E3o. Por favor, volte para a lista de pets e selecione um." })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Pets', e) }, { children: "Voltar" }))] })));
        }
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Confirmar Exclus\u00E3o de Pet" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "alert alert-warning", role: "alert" }, { children: ["Voc\u00EA tem certeza que deseja excluir o pet: ", (0, jsx_runtime_1.jsx)("strong", { children: pet.nome }), " (Tipo: ", pet.tipo, ", Ra\u00E7a: ", pet.raca, ") do cliente com CPF: ", pet.cpfCliente, "?"] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-danger me-2", onClick: this.handleExcluir }, { children: "Sim, Excluir" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: (e) => seletorView('Pets', e) }, { children: "Cancelar" }))] })));
    }
}
exports.default = ConfirmacaoExclusaoPet;
