import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Cliente from '../../modelo/cliente';

type Props = {
    tema: string;
    seletorView: Function;
    cliente: Cliente;
    atualizarCliente: (cpfCliente: string, novoNome: string, novoNomeSocial: string) => void;
    atualizarDados: Function;
};

type State = {
    nome: string;
    nomeSocial: string;
};

export default class FormularioAtualizacaoCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: props.cliente ? props.cliente.nome : '',
            nomeSocial: props.cliente ? props.cliente.nomeSocial : '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.cliente !== this.props.cliente && this.props.cliente) {
            this.setState({
                nome: this.props.cliente.nome,
                nomeSocial: this.props.cliente.nomeSocial,
            });
        }
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!this.props.cliente) {
            alert("Nenhum cliente selecionado para atualização.");
            return;
        }

        const { nome, nomeSocial } = this.state;
        const cpfCliente = this.props.cliente.getCpf.getValor;

        this.props.atualizarCliente(cpfCliente, nome, nomeSocial);
        this.props.atualizarDados();

        this.props.seletorView('Clientes', event); 
    }

    render() {
        const { tema, seletorView, cliente } = this.props;
        const { nome, nomeSocial } = this.state;

        if (!cliente) {
            return (
                <div className="container-fluid">
                    <h2>Atualizar Cliente</h2>
                    <p className="alert alert-warning">Nenhum cliente selecionado para atualização. Por favor, volte para a lista de clientes e selecione um.</p>
                    <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Clientes', e)}>Voltar</button>
                </div>
            );
        }

        return (
            <div className="container-fluid">
                <h2>Atualizar Cliente: {cliente.nome}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nome"
                            name="nome"
                            value={nome}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nomeSocial" className="form-label">Nome Social</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nomeSocial"
                            name="nomeSocial"
                            value={nomeSocial}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpf" className="form-label">CPF (Não Editável)</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cpf"
                            name="cpf"
                            value={cliente.getCpf.getValor}
                            readOnly
                            disabled
                        />
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Atualizar</button>
                    <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Clientes', e)}>Cancelar</button>
                </form>
            </div>
        );
    }
}