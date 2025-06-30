import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Cliente from '../../modelo/cliente';
import Produto from '../../modelo/produto';
import Servico from '../../modelo/servico';

type ClienteData = Cliente;
type ProdutoData = Produto;
type ServicoData = Servico;

type Props = {
    tema: string;
    seletorView: Function;
    clientes: ClienteData[];
    produtos: ProdutoData[];
    servicos: ServicoData[];
    registrarConsumo: (cpfCliente: string, nomeItem: string, tipoItem: 'produto' | 'servico') => void;
    atualizarDados: Function;
};

type State = {
    clienteSelecionadoCpf: string;
    itemTipo: 'produto' | 'servico' | '';
    itemId: string | null;
    feedback: string;
};

export default class RegistroConsumo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            clienteSelecionadoCpf: '',
            itemTipo: '',
            itemId: null,
            feedback: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectCliente = this.handleSelectCliente.bind(this);
        this.handleSelectTipoItem = this.handleSelectTipoItem.bind(this);
        this.handleSelectItem = this.handleSelectItem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    }

    handleSelectCliente(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ clienteSelecionadoCpf: event.target.value, feedback: '' });
    }

    handleSelectTipoItem(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ itemTipo: event.target.value as 'produto' | 'servico' | '', itemId: null, feedback: '' });
    }

    handleSelectItem(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ itemId: event.target.value, feedback: '' });
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const { clienteSelecionadoCpf, itemTipo, itemId } = this.state;
        const { clientes, produtos, servicos } = this.props;

        if (!clienteSelecionadoCpf || !itemTipo || !itemId) {
            this.setState({ feedback: 'Por favor, preencha todos os campos.' });
            return;
        }

        const cliente = clientes.find(c => c.getCpf.getValor === clienteSelecionadoCpf);
        let itemConsumido: Produto | Servico | undefined;

        if (itemTipo === 'produto') {
            itemConsumido = produtos.find(p => p.getNome === itemId);
        } else if (itemTipo === 'servico') {
            itemConsumido = servicos.find(s => s.getNome === itemId);
        }

        if (!cliente || !itemConsumido) {
            this.setState({ feedback: 'Cliente ou item selecionado inválido.' });
            return;
        }

        this.props.registrarConsumo(cliente.getCpf.getValor, itemConsumido.getNome, itemTipo);
        this.props.atualizarDados();

        this.setState({
            feedback: `Consumo de ${itemConsumido.getNome} registrado para ${cliente.nome}!`,
            clienteSelecionadoCpf: '',
            itemTipo: '',
            itemId: null,
        });
        // REMOVIDO: alert(`Consumo de ${itemConsumido.getNome} registrado para ${cliente.nome}!`);
    }

    render() {
        const { tema, seletorView, clientes, produtos, servicos } = this.props;
        const { clienteSelecionadoCpf, itemTipo, itemId, feedback } = this.state;

        const itensDisponiveis = itemTipo === 'produto' ? produtos : itemTipo === 'servico' ? servicos : [];

        return (
            <div className="container-fluid">
                <h2>Registrar Consumo</h2>
                <form onSubmit={this.handleSubmit}>
                    {feedback && (
                        <div className={`alert ${feedback.includes('registrado') ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {feedback}
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="clienteSelecionadoCpf" className="form-label">Selecionar Cliente</label>
                        <select
                            className="form-select"
                            id="clienteSelecionadoCpf"
                            name="clienteSelecionadoCpf"
                            value={clienteSelecionadoCpf}
                            onChange={this.handleSelectCliente}
                            required
                        >
                            <option value="">Selecione um cliente...</option>
                            {clientes.map(cliente => (
                                <option key={cliente.getCpf.getValor} value={cliente.getCpf.getValor}>
                                    {cliente.nome} ({cliente.getCpf.getValor})
                                </option>
                            ))}
                        </select>
                    </div>

                    {clienteSelecionadoCpf && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="itemTipo" className="form-label">Tipo de Consumo</label>
                                <select
                                    className="form-select"
                                    id="itemTipo"
                                    name="itemTipo"
                                    value={itemTipo}
                                    onChange={this.handleSelectTipoItem}
                                    required
                                >
                                    <option value="">Selecione o que foi consumido...</option>
                                    <option value="produto">Produto</option>
                                    <option value="servico">Serviço</option>
                                </select>
                            </div>

                            {itemTipo && (
                                <div className="mb-3">
                                    <label htmlFor="itemId" className="form-label">Item</label>
                                    <select
                                        className="form-select"
                                        id="itemId"
                                        name="itemId"
                                        value={itemId || ''}
                                        onChange={this.handleSelectItem}
                                        required
                                    >
                                        <option value="">Selecione o item...</option>
                                        {itensDisponiveis.map(item => (
                                            <option key={item.getNome} value={item.getNome}>
                                                {item.getNome} (R$ {item.getValor.toFixed(2)})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </>
                    )}

                    <button type="submit" className="btn btn-success me-2" disabled={!clienteSelecionadoCpf || !itemTipo || !itemId}>Registrar Consumo</button>
                    <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Clientes', e)}>Voltar ao Menu</button>
                </form>
            </div>
        );
    }
}