/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Servico from "../../modelo/servico"; // Importar o modelo Servico

type Props = {
    tema: string;
    seletorView: Function;
    selecionarViewComItem: Function;
    servicos: Servico[]; // A lista de serviços agora vem via props do Roteador
    atualizarDados: Function; // Função para pedir ao Roteador para atualizar os dados
};

export default class ListaServicos extends Component<Props> {
    constructor(props: Props | Readonly<Props>) {
        super(props);
        // O estado 'servicos' foi movido para o Roteador, então este componente não precisa mais dele aqui.
        // Ele apenas renderiza o que recebe via props.
    }

    render() {
        const { tema, seletorView, selecionarViewComItem, servicos } = this.props;

        return (
            <div className="container-fluid">
                <h2>Lista de Serviços</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos.length > 0 ? (
                            servicos.map((servico, index) => (
                                <tr key={`${servico.getNome}-${index}`}> {/* Usar nome e index para chave única temporária */}
                                    <td>{servico.getNome}</td>
                                    <td>R$ {servico.getValor.toFixed(2)}</td>
                                    <td>{servico.getDescricao}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            // Passa o serviço completo para a tela de atualização
                                            onClick={(e) => selecionarViewComItem('Atualizar Serviço', servico, e)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            // Passa o serviço completo para a tela de exclusão
                                            onClick={(e) => selecionarViewComItem('Excluir Serviço', servico, e)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>Nenhum serviço cadastrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button
                    className="btn btn-success mt-3"
                    onClick={(e) => seletorView('Cadastrar Serviço', e)}
                >
                    Cadastrar Novo Serviço
                </button>
            </div>
        );
    }
}