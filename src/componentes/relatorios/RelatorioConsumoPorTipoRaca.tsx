import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
    tema: string;
    seletorView: Function;
    getRelatorio: () => { tipoRaca: string, nome: string, tipo: 'Produto' | 'Serviço', quantidade: number }[];
};

type RelatorioItem = {
    tipoRaca: string;
    nome: string;
    tipo: 'Produto' | 'Serviço';
    quantidade: number;
};

type State = {
    relatorio: RelatorioItem[];
};

export default class RelatorioConsumoPorTipoRaca extends Component<Props, State> {
    constructor(props: Props) {
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

        // Agrupar por tipoRaca para exibição
        const groupedReports: { [key: string]: RelatorioItem[] } = {};
        relatorio.forEach(item => {
            // Garante que o tipoRaca é uma string válida antes de usar como chave de grupo
            const groupKey = item.tipoRaca && item.tipoRaca.trim() !== '' ? item.tipoRaca : "NÃO ESPECIFICADO";
            if (!groupedReports[groupKey]) {
                groupedReports[groupKey] = [];
            }
            groupedReports[groupKey].push(item);
        });

        const sortedKeys = Object.keys(groupedReports).sort();

        return (
            <div className="container-fluid">
                <h2>Serviços e Produtos Mais Consumidos por Raça</h2>
                {Object.keys(groupedReports).length > 0 ? (
                    sortedKeys.map(tipoRacaKey => (
                        <div key={tipoRacaKey} className="mb-4">
                            {/* Garante que o título do grupo não seja 'UNDEFINED' */}
                            <h3>--- {tipoRacaKey.toUpperCase()} ---</h3>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Tipo Item</th>
                                        <th>Nome Item</th>
                                        <th>Quantidade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedReports[tipoRacaKey].map((item, index) => (
                                        <tr key={index}>
                                            {/* Acessa as propriedades corretas dos itens */}
                                            <td>{item.tipo}</td>
                                            <td>{item.nome}</td>
                                            <td>{item.quantidade}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))
                ) : (
                    <p className="alert alert-info">Nenhum consumo registrado por tipo e raça de pets.</p>
                )}
                <button type="button" className="btn btn-secondary mt-3" onClick={(e) => seletorView('Relatórios', e)}>
                    Voltar aos Relatórios
                </button>
            </div>
        );
    }
}