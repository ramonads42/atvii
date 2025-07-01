import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Produto from '../../modelo/produto'; 

type Props = {
    tema: string;
    seletorView: Function;
    produto: Produto; 
    excluirProduto: (nomeProduto: string) => void; 
    atualizarDados: Function; 
};

export default class ConfirmacaoExclusaoProduto extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleExcluir = this.handleExcluir.bind(this);
    }

    handleExcluir(event: React.MouseEvent) {
        event.preventDefault();
        if (!this.props.produto) {
            alert("Nenhum produto selecionado para exclusão.");
            return;
        }

        const nomeProduto = this.props.produto.getNome;

        this.props.excluirProduto(nomeProduto);

        this.props.atualizarDados();

        alert(`Produto "${nomeProduto}" excluído com sucesso!`);
        this.props.seletorView('Produtos', event); 
    }

    render() {
        const { tema, seletorView, produto } = this.props;

        if (!produto) {
            return (
                <div className="container-fluid">
                    <h2>Excluir Produto</h2>
                    <p className="alert alert-warning">Nenhum produto selecionado para exclusão. Por favor, volte para a lista de produtos e selecione um.</p>
                    <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Produtos', e)}>Voltar</button>
                </div>
            );
        }

        return (
            <div className="container-fluid">
                <h2>Confirmar Exclusão de Produto</h2>
                <div className="alert alert-warning" role="alert">
                    Você tem certeza que deseja excluir o produto: <strong>{produto.getNome}</strong> (Valor: R$ {produto.getValor.toFixed(2)}, Descrição: {produto.getDescricao})?
                </div>
                <button
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={this.handleExcluir}
                >
                    Sim, Excluir
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={(e) => seletorView('Produtos', e)}
                >
                    Cancelar
                </button>
            </div>
        );
    }
}