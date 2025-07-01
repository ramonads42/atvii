import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cliente from '../../modelo/cliente'; 

type Props = {
    tema: string;
    seletorView: Function;
    cadastrarCliente: (nome: string, nomeSocial: string, cpfValor: string, dataEmissaoString: string) => void;
    atualizarDados: Function;
};

type State = {
    nome: string;
    nomeSocial: string;
    cpf: string;
    dataEmissaoCpf: string; 
};

export default class FormularioCadastroCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: '',
            nomeSocial: '',
            cpf: '',
            dataEmissaoCpf: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const { nome, nomeSocial, cpf, dataEmissaoCpf } = this.state;

        if (!nome || !cpf || !dataEmissaoCpf) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        this.props.cadastrarCliente(nome, nomeSocial, cpf, dataEmissaoCpf);
        this.props.atualizarDados();

        this.props.seletorView('Clientes', event); 
    }

    render() {
        const { tema, seletorView } = this.props;
        const { nome, nomeSocial, cpf, dataEmissaoCpf } = this.state;

        return (
            <div className="container-fluid">
                <h2>Cadastro de Cliente</h2>
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
                        <label htmlFor="cpf" className="form-label">CPF</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cpf"
                            name="cpf"
                            value={cpf}
                            onChange={this.handleChange}
                            placeholder="Ex: 123.456.789-00"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dataEmissaoCpf" className="form-label">Data de Emissão do CPF (dd/mm/yyyy)</label>
                        <input
                            type="text"
                            className="form-control"
                            id="dataEmissaoCpf"
                            name="dataEmissaoCpf"
                            value={dataEmissaoCpf}
                            onChange={this.handleChange}
                            placeholder="Ex: 01/01/2020"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success me-2">Cadastrar</button>
                    <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Clientes', e)}>Voltar</button>
                </form>
            </div>
        );
    }
}