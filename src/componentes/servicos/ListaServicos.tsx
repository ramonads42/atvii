import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Servico from "../../modelo/servico"; 

type Props = {
    tema: string;
    seletorView: Function;
    selecionarViewComItem: Function;
    servicos: Servico[]; 
    atualizarDados: Function; 
};

export default class ListaServicos extends Component<Props> {
    constructor(props: Props | Readonly<Props>) {
        super(props);

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
                                <tr key={`${servico.getNome}-${index}`}> 
                                    <td>{servico.getNome}</td>
                                    <td>R$ {servico.getValor.toFixed(2)}</td>
                                    <td>{servico.getDescricao}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={(e) => selecionarViewComItem('Atualizar Serviço', servico, e)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
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