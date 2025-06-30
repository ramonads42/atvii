import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
    tema: string;
    seletorView: Function;
    getRelatorio: () => { posicao: number, cliente: string, valorTotal: number }[]; // Função para obter o relatório do service
};

type RelatorioItem = {
    posicao: number;
    cliente: string;
    valorTotal: number;
};

type State = {
    relatorio: RelatorioItem[];
};

export default class RelatorioClientesMaisGastaram extends Component<Props, State> {
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
        // Chama a função do EmpresaService para obter os dados reais do relatório
        const dadosRelatorio = this.props.getRelatorio();
        this.setState({ relatorio: dadosRelatorio });
    }

    render() {
        const { tema, seletorView } = this.props;
        const { relatorio } = this.state;

        return (
            <div className="container-fluid">
                <h2>Top 5 Clientes que Mais Gastaram (Valor)</h2>
                {relatorio.length > 0 && relatorio.some(item => item.valorTotal > 0) ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Posição</th>
                                <th>Cliente</th>
                                <th>Valor Total Gasto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {relatorio.filter(item => item.valorTotal > 0).map((item) => (
                                <tr key={item.posicao}>
                                    <td>{item.posicao}</td>
                                    <td>{item.cliente}</td>
                                    <td>R$ {item.valorTotal.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="alert alert-info">Nenhum consumo registrado ou clientes com gasto zero.</p>
                )}
                <button type="button" className="btn btn-secondary mt-3" onClick={(e) => seletorView('Relatórios', e)}>
                    Voltar aos Relatórios
                </button>
            </div>
        );
    }
}