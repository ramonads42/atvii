import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Cliente from '../../modelo/cliente'; // Importar o modelo Cliente

type Props = {
    tema: string;
    seletorView: Function;
    cliente: Cliente; // O cliente a ser excluído será passado via props
    excluirCliente: (cpfCliente: string) => void; // Função de exclusão do service
    atualizarDados: Function; // Para notificar o Roteador sobre a mudança
};

export default class ConfirmacaoExclusaoCliente extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleExcluir = this.handleExcluir.bind(this);
    }

    handleExcluir(event: React.MouseEvent) {
        event.preventDefault();
        if (!this.props.cliente) {
            alert("Nenhum cliente selecionado para exclusão.");
            return;
        }

        const cpfCliente = this.props.cliente.getCpf.getValor;
        const nomeCliente = this.props.cliente.nome;

        // Chamada ao método do EmpresaService
        this.props.excluirCliente(cpfCliente);

        // Notificar o Roteador para atualizar os dados globais
        this.props.atualizarDados();

        alert(`Cliente "${nomeCliente}" (CPF: ${cpfCliente}) excluído com sucesso!`);
        this.props.seletorView('Clientes', event); // Voltar para a lista de clientes
    }

    render() {
        const { tema, seletorView, cliente } = this.props;

        if (!cliente) {
            return (
                <div className="container-fluid">
                    <h2>Excluir Cliente</h2>
                    <p className="alert alert-warning">Nenhum cliente selecionado para exclusão. Por favor, volte para a lista de clientes e selecione um.</p>
                    <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Clientes', e)}>Voltar</button>
                </div>
            );
        }

        return (
            <div className="container-fluid">
                <h2>Confirmar Exclusão de Cliente</h2>
                <div className="alert alert-warning" role="alert">
                    Você tem certeza que deseja excluir o cliente: <strong>{cliente.nome}</strong> (CPF: {cliente.getCpf.getValor})?
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
                    onClick={(e) => seletorView('Clientes', e)}
                >
                    Cancelar
                </button>
            </div>
        );
    }
}