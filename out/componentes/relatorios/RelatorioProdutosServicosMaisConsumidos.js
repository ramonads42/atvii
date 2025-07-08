"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class RelatorioProdutosServicosMaisConsumidos extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            relatorio: [],
        };
        this.carregarRelatorio = this.carregarRelatorio.bind(this);
    }
    componentDidMount() {
        this.carregarRelatorio();
    }
    carregarRelatorio() {
        const dadosRelatorio = this.props.getRelatorio();
        this.setState({ relatorio: dadosRelatorio });
    }
    render() {
        const { tema, seletorView } = this.props;
        const { relatorio } = this.state;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Produtos e Servi\u00E7os Mais Consumidos (Geral)" }), relatorio.length > 0 ? ((0, jsx_runtime_1.jsxs)("table", Object.assign({ className: "table table-striped" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Tipo" }), (0, jsx_runtime_1.jsx)("th", { children: "Nome" }), (0, jsx_runtime_1.jsx)("th", { children: "Quantidade Total" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: relatorio.map((item, index) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: item.tipo }), (0, jsx_runtime_1.jsx)("td", { children: item.nome }), (0, jsx_runtime_1.jsx)("td", { children: item.quantidade })] }, index))) })] }))) : ((0, jsx_runtime_1.jsx)("p", Object.assign({ className: "alert alert-info" }, { children: "Nenhum produto ou servi\u00E7o consumido." }))), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary mt-3", onClick: (e) => seletorView('Relatórios', e) }, { children: "Voltar aos Relat\u00F3rios" }))] })));
    }
}
exports.default = RelatorioProdutosServicosMaisConsumidos;
