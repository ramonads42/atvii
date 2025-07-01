import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
    tema: string;
    seletorView: Function;
    getRelatorio: () => { nome: string, tipo: 'Produto' | 'Serviço', quantidade: number }[]; 
};

type RelatorioItem = {
    nome: string;
    tipo: 'Produto' | 'Serviço';
    quantidade: number;
};

type State = {
    relatorio: RelatorioItem[];
};

export default class RelatorioProdutosServicosMaisConsumidos extends Component<Props, State> {
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

        return (
            <div className="container-fluid">
                <h2>Produtos e Serviços Mais Consumidos (Geral)</h2>
                {relatorio.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Nome</th>
                                <th>Quantidade Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {relatorio.map((item, index) => (
                                <tr key={index}> 
                                    <td>{item.tipo}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.quantidade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="alert alert-info">Nenhum produto ou serviço consumido.</p>
                )}
                <button type="button" className="btn btn-secondary mt-3" onClick={(e) => seletorView('Relatórios', e)}>
                    Voltar aos Relatórios
                </button>
            </div>
        );
    }
}