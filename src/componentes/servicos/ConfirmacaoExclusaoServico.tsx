import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Servico from '../../modelo/servico'; 

type Props = {
    tema: string;
    seletorView: Function;
    servico: Servico; 
    excluirServico: (nomeServico: string) => void; 
    atualizarDados: Function; 
};

export default class ConfirmacaoExclusaoServico extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleExcluir = this.handleExcluir.bind(this);
    }

    handleExcluir(event: React.MouseEvent) {
        event.preventDefault();
        if (!this.props.servico) {
            alert("Nenhum serviço selecionado para exclusão.");
            return;
        }

        const nomeServico = this.props.servico.getNome;

        this.props.excluirServico(nomeServico);

        this.props.atualizarDados();

        alert(`Serviço "${nomeServico}" excluído com sucesso!`);
        this.props.seletorView('Serviços', event); 
    }

    render() {
        const { tema, seletorView, servico } = this.props;

        if (!servico) {
            return (
                <div className="container-fluid">
                    <h2>Excluir Serviço</h2>
                    <p className="alert alert-warning">Nenhum serviço selecionado para exclusão. Por favor, volte para a lista de serviços e selecione um.</p>
                    <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Serviços', e)}>Voltar</button>
                </div>
            );
        }

        return (
            <div className="container-fluid">
                <h2>Confirmar Exclusão de Serviço</h2>
                <div className="alert alert-warning" role="alert">
                    Você tem certeza que deseja excluir o serviço: <strong>{servico.getNome}</strong> (Valor: R$ {servico.getValor.toFixed(2)}, Descrição: {servico.getDescricao})?
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
                    onClick={(e) => seletorView('Serviços', e)}
                >
                    Cancelar
                </button>
            </div>
        );
    }
}