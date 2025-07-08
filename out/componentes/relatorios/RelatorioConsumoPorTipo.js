"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class RelatorioConsumoPorTipo extends react_1.Component {
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
        const groupedReports = {};
        relatorio.forEach(item => {
            const groupKey = item.tipoPet && item.tipoPet.trim() !== '' ? item.tipoPet : "NÃO ESPECIFICADO";
            if (!groupedReports[groupKey]) {
                groupedReports[groupKey] = [];
            }
            groupedReports[groupKey].push(item);
        });
        const sortedKeys = Object.keys(groupedReports).sort();
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Servi\u00E7os e Produtos Mais Consumidos por Tipo de Pet" }), Object.keys(groupedReports).length > 0 ? (sortedKeys.map(tipoPetKey => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-4" }, { children: [(0, jsx_runtime_1.jsxs)("h3", { children: ["--- ", tipoPetKey.toUpperCase(), " ---"] }), (0, jsx_runtime_1.jsxs)("table", Object.assign({ className: "table table-striped" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Tipo Item" }), (0, jsx_runtime_1.jsx)("th", { children: "Nome Item" }), (0, jsx_runtime_1.jsx)("th", { children: "Quantidade" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: groupedReports[tipoPetKey].map((item, index) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: item.tipoItem }), (0, jsx_runtime_1.jsx)("td", { children: item.nomeItem }), (0, jsx_runtime_1.jsx)("td", { children: item.quantidade })] }, index))) })] }))] }), tipoPetKey)))) : ((0, jsx_runtime_1.jsx)("p", Object.assign({ className: "alert alert-info" }, { children: "Nenhum consumo registrado por tipo de pet." }))), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary mt-3", onClick: (e) => seletorView('Relatórios', e) }, { children: "Voltar aos Relat\u00F3rios" }))] })));
    }
}
exports.default = RelatorioConsumoPorTipo;
