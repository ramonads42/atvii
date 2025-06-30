import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Produto from '../../modelo/produto';

type Props = {
    tema: string;
    seletorView: Function;
    produto: Produto;
    atualizarProduto: (nomeProdutoOriginal: string, novoNome: string, novoValor: number, novaDescricao: string) => void;
    atualizarDados: Function;
};

type State = {
    nome: string;
    valor: string; // Manter como string para input, converter para number ao salvar
    descricao: string;
};

export default class FormularioAtualizacaoProduto extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: props.produto ? props.produto.getNome : '',
            valor: props.produto ? props.produto.getValor.toFixed(2) : '', // Formata para 2 casas decimais
            descricao: props.produto ? props.produto.getDescricao : '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.produto !== this.props.produto && this.props.produto) {
            this.setState({
                nome: this.props.produto.getNome,
                valor: this.props.produto.getValor.toFixed(2),
                descricao: this.props.produto.getDescricao,
            });
        }
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!this.props.produto) {
            alert("Nenhum produto selecionado para atualização.");
            return;
        }

        const { nome, valor, descricao } = this.state;
        const valorNumerico = parseFloat(valor);
        const nomeProdutoOriginal = this.props.produto.getNome;

        if (!nome || isNaN(valorNumerico) || valorNumerico < 0) {
            alert("Por favor, preencha o nome e um valor numérico válido para o produto.");
            return;
        }

        this.props.atualizarProduto(nomeProdutoOriginal, nome, valorNumerico, descricao);
        this.props.atualizarDados();

        // REMOVIDO: alert(`Produto "${nomeProdutoOriginal}" atualizado para "${nome}" com sucesso!`);
        this.props.seletorView('Produtos', event); // Voltar para a lista de produtos
    }

    render() {
        const { tema, seletorView, produto } = this.props;
        const { nome, valor, descricao } = this.state;

        if (!produto) {
            return (
                <div className="container-fluid">
                    <h2>Atualizar Produto</h2>
                    <p className="alert alert-warning">Nenhum produto selecionado para atualização. Por favor, volte para a lista de produtos e selecione um.</p>
                    <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Produtos', e)}>Voltar</button>
                </div>
            );
        }

        return (
            <div className="container-fluid">
                <h2>Atualizar Produto: {produto.getNome}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">Nome do Produto</label>
                        <input type="text" className="form-control" id="nome" name="nome" value={nome} onChange={this.handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="valor" className="form-label">Valor (R$)</label>
                        <input type="number" step="0.01" className="form-control" id="valor" name="valor" value={valor} onChange={this.handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descricao" className="form-label">Descrição</label>
                        <textarea className="form-control" id="descricao" name="descricao" value={descricao} onChange={this.handleChange} rows={3}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Atualizar</button>
                    <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Produtos', e)}>Cancelar</button>
                </form>
            </div>
        );
    }
}