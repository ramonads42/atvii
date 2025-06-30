import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
    tema: string;
    seletorView: Function;
    cadastrarServico: (nome: string, valor: number, descricao: string) => void;
    atualizarDados: Function;
};

type State = {
    nome: string;
    valor: string; // Manter como string para input, converter para number ao salvar
    descricao: string;
};

export default class FormularioCadastroServico extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: '',
            valor: '',
            descricao: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const { nome, valor, descricao } = this.state;
        const valorNumerico = parseFloat(valor);

        if (!nome || isNaN(valorNumerico) || valorNumerico < 0) {
            alert("Por favor, preencha o nome e um valor numérico válido para o serviço.");
            return;
        }

        this.props.cadastrarServico(nome, valorNumerico, descricao);
        this.props.atualizarDados();

        // REMOVIDO: alert(`Serviço "${nome}" cadastrado com sucesso!`);
        this.props.seletorView('Serviços', event); // Voltar para a lista de serviços
    }

    render() {
        const { tema, seletorView } = this.props;
        const { nome, valor, descricao } = this.state;

        return (
            <div className="container-fluid">
                <h2>Cadastro de Serviço</h2>
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
                    <button type="submit" className="btn btn-success me-2">Cadastrar</button>
                    <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Serviços', e)}>Voltar</button>
                </form>
            </div>
        );
    }
}