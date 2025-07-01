import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Servico from '../../modelo/servico';

type Props = {
    tema: string;
    seletorView: Function;
    servico: Servico;
    atualizarServico: (nomeServicoOriginal: string, novoNome: string, novoValor: number, novaDescricao: string) => void;
    atualizarDados: Function;
};

type State = {
    nome: string;
    valor: string; 
    descricao: string;
};

export default class FormularioAtualizacaoServico extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: props.servico ? props.servico.getNome : '',
            valor: props.servico ? props.servico.getValor.toFixed(2) : '', 
            descricao: props.servico ? props.servico.getDescricao : '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.servico !== this.props.servico && this.props.servico) {
            this.setState({
                nome: this.props.servico.getNome,
                valor: this.props.servico.getValor.toFixed(2),
                descricao: this.props.servico.getDescricao,
            });
        }
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!this.props.servico) {
            alert("Nenhum serviço selecionado para atualização.");
            return;
        }

        const { nome, valor, descricao } = this.state;
        const valorNumerico = parseFloat(valor);
        const nomeServicoOriginal = this.props.servico.getNome;

        if (!nome || isNaN(valorNumerico) || valorNumerico < 0) {
            alert("Por favor, preencha o nome e um valor numérico válido para o serviço.");
            return;
        }

        this.props.atualizarServico(nomeServicoOriginal, nome, valorNumerico, descricao);
        this.props.atualizarDados();

        this.props.seletorView('Serviços', event); 
    }

    render() {
        const { tema, seletorView, servico } = this.props;
        const { nome, valor, descricao } = this.state;

        if (!servico) {
            return (
                <div className="container-fluid">
                    <h2>Atualizar Serviço</h2>
                    <p className="alert alert-warning">Nenhum serviço selecionado para atualização. Por favor, volte para a lista de serviços e selecione um.</p>
                    <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Serviços', e)}>Voltar</button>
                </div>
            );
        }

        return (
            <div className="container-fluid">
                <h2>Atualizar Serviço: {servico.getNome}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">Nome do Serviço</label>
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
                    <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Serviços', e)}>Cancelar</button>
                </form>
            </div>
        );
    }
}