"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class RelatorioClientesMaisConsumiram extends react_1.Component {
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
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Top 10 Clientes que Mais Consumiram (Quantidade)" }), relatorio.length > 0 && relatorio.some(item => item.total > 0) ? ((0, jsx_runtime_1.jsxs)("table", Object.assign({ className: "table table-striped" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Posi\u00E7\u00E3o" }), (0, jsx_runtime_1.jsx)("th", { children: "Cliente" }), (0, jsx_runtime_1.jsx)("th", { children: "Produtos" }), (0, jsx_runtime_1.jsx)("th", { children: "Servi\u00E7os" }), (0, jsx_runtime_1.jsx)("th", { children: "Total Consumido" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: relatorio.filter(item => item.total > 0).map((item) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: item.posicao }), (0, jsx_runtime_1.jsx)("td", { children: item.cliente }), (0, jsx_runtime_1.jsx)("td", { children: item.quantidadeProdutos }), (0, jsx_runtime_1.jsx)("td", { children: item.quantidadeServicos }), (0, jsx_runtime_1.jsx)("td", { children: item.total })] }, item.posicao))) })] }))) : ((0, jsx_runtime_1.jsx)("p", Object.assign({ className: "alert alert-info" }, { children: "Nenhum consumo registrado ou clientes com consumo zero." }))), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary mt-3", onClick: (e) => seletorView('Relatórios', e) }, { children: "Voltar aos Relat\u00F3rios" }))] })));
    }
}
exports.default = RelatorioClientesMaisConsumiram;
