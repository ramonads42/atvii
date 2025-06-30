import { Component } from "react";
import BarraNavegacao from "./BarraNavegacao";
import ListaClientes from "./clientes/ListaClientes";
import FormularioCadastroCliente from "./clientes/FormularioCadastroCliente";
import FormularioAtualizacaoCliente from "./clientes/FormularioAtualizacaoCliente";
import ConfirmacaoExclusaoCliente from "./clientes/ConfirmacaoExclusaoCliente";

import ListaPets from "./pets/ListaPets";
import FormularioCadastroPet from "./pets/FormularioCadastroPet";
import FormularioAtualizacaoPet from "./pets/FormularioAtualizacaoPet";
import ConfirmacaoExclusaoPet from "./pets/ConfirmacaoExclusaoPet";

import ListaProdutos from "./produtos/ListaProdutos";
import FormularioCadastroProduto from "./produtos/FormularioCadastroProduto";
import FormularioAtualizacaoProduto from "./produtos/FormularioAtualizacaoProduto";
import ConfirmacaoExclusaoProduto from "./produtos/ConfirmacaoExclusaoProduto";

import ListaServicos from "./servicos/ListaServicos";
import FormularioCadastroServico from "./servicos/FormularioCadastroServico";
import FormularioAtualizacaoServico from "./servicos/FormularioAtualizacaoServico";
import ConfirmacaoExclusaoServico from "./servicos/ConfirmacaoExclusaoServico";

import RegistroConsumo from "./consumo/RegistroConsumo";

import RelatorioClientesMaisConsumiram from "./relatorios/RelatorioClientesMaisConsumiram";
import RelatorioProdutosServicosMaisConsumidos from "./relatorios/RelatorioProdutosServicosMaisConsumidos";
import RelatorioConsumoPorTipoRaca from "./relatorios/RelatorioConsumoPorTipoRaca"; // Este será "Mais Consumidos por Raça"
import RelatorioClientesMaisGastaram from "./relatorios/RelatorioClientesMaisGastaram";
import RelatorioConsumoPorTipo from "./relatorios/RelatorioConsumoPorTipo"; // Este será "Mais Consumidos por Tipo"

// Importar o serviço da empresa
import empresaService from "../servicos/EmpresaService";
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";
import Pet from "../modelo/pet";

type AppState = {
    tela: string;
    itemSelecionado?: Cliente | Pet | Produto | Servico | any;
    clientes: Cliente[];
    produtos: Produto[];
    servicos: Servico[];
};

export default class Roteador extends Component<{}, AppState> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            tela: 'Clientes',
            itemSelecionado: undefined,
            clientes: [],
            produtos: [],
            servicos: [],
        };
        this.selecionarView = this.selecionarView.bind(this);
        this.selecionarViewComItem = this.selecionarViewComItem.bind(this);
        this.atualizarDados = this.atualizarDados.bind(this);
    }

    componentDidMount() {
        this.atualizarDados();
    }

    atualizarDados() {
        this.setState({
            clientes: empresaService.getClientes(),
            produtos: empresaService.getProdutos(),
            servicos: empresaService.getServicos(),
        });
    }

    selecionarView(novaTela: string, evento: React.MouseEvent | React.FormEvent) {
        if (evento) evento.preventDefault();
        console.log(novaTela);
        this.setState({
            tela: novaTela,
            itemSelecionado: undefined
        });
        this.atualizarDados();
    }

    selecionarViewComItem(novaTela: string, item: any, evento: React.MouseEvent | React.FormEvent) {
        if (evento) evento.preventDefault();
        console.log(`Navegando para ${novaTela} com item:`, item);
        this.setState({
            tela: novaTela,
            itemSelecionado: item
        });
    }

    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema="#e3f2fd" />;
        let conteudo;
        const { clientes, produtos, servicos } = this.state;

        switch (this.state.tela) {
            // Clientes
            case 'Clientes':
                conteudo = <ListaClientes
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    selecionarViewComItem={this.selecionarViewComItem}
                    clientes={clientes}
                    atualizarDados={this.atualizarDados}
                />;
                break;
            case 'Cadastrar Cliente':
                conteudo = <FormularioCadastroCliente
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    cadastrarCliente={empresaService.cadastrarClienteComDados.bind(empresaService)}
                    atualizarDados={this.atualizarDados}
                />;
                break;
            case 'Atualizar Cliente':
                conteudo = <FormularioAtualizacaoCliente
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    cliente={this.state.itemSelecionado as Cliente}
                    atualizarCliente={empresaService.atualizarCliente.bind(empresaService)}
                    atualizarDados={this.atualizarDados}
                />;
                break;
            case 'Excluir Cliente':
                conteudo = <ConfirmacaoExclusaoCliente
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    cliente={this.state.itemSelecionado as Cliente}
                    excluirCliente={empresaService.excluirCliente.bind(empresaService)}
                    atualizarDados={this.atualizarDados}
                />;
                break;

            // Pets
            case 'Pets':
                conteudo = <ListaPets
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    selecionarViewComItem={this.selecionarViewComItem}
                    pets={clientes.flatMap(c => c.getPets.map(p => ({
                        nome: p.getNome,
                        tipo: p.getTipo,
                        raca: p.getRaca,
                        genero: p.getGenero,
                        cpfCliente: c.getCpf.getValor
                    })))}
                    atualizarDados={this.atualizarDados}
                />;
                break;
            case 'Cadastrar Pet':
                conteudo = <FormularioCadastroPet
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    cadastrarPet={empresaService.cadastrarPet.bind(empresaService)}
                    clientes={clientes}
                    atualizarDados={this.atualizarDados}
                />;
                break;
            case 'Atualizar Pet':
                conteudo = <FormularioAtualizacaoPet
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    pet={this.state.itemSelecionado as {nome: string, tipo: string, raca: string, genero: string, cpfCliente: string}}
                    atualizarPet={empresaService.atualizarPet.bind(empresaService)}
                    atualizarDados={this.atualizarDados}
                />;
                break;
            case 'Excluir Pet':
                conteudo = <ConfirmacaoExclusaoPet
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    pet={this.state.itemSelecionado as {nome: string, tipo: string, raca: string, genero: string, cpfCliente: string}}
                    excluirPet={empresaService.excluirPet.bind(empresaService)}
                    atualizarDados={this.atualizarDados}
                />;
                break;

            // Produtos
            case 'Produtos':
                conteudo = <ListaProdutos
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    selecionarViewComItem={this.selecionarViewComItem}
                    produtos={produtos}
                    atualizarDados={this.atualizarDados}
                />;
                break;
            case 'Cadastrar Produto':
                conteudo = <FormularioCadastroProduto
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    cadastrarProduto={empresaService.cadastrarProduto.bind(empresaService)}
                    atualizarDados={this.atualizarDados}
                />;
                break;
            case 'Atualizar Produto':
                conteudo = <FormularioAtualizacaoProduto
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    produto={this.state.itemSelecionado as Produto}
                    atualizarProduto={empresaService.atualizarProduto.bind(empresaService)}
                    atualizarDados={this.atualizarDados}
                />;
                break;
            case 'Excluir Produto':
                conteudo = <ConfirmacaoExclusaoProduto
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    produto={this.state.itemSelecionado as Produto}
                    excluirProduto={empresaService.excluirProduto.bind(empresaService)}
                    atualizarDados={this.atualizarDados}
                />;
                break;

            // Serviços
            case 'Serviços':
                conteudo = <ListaServicos
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    selecionarViewComItem={this.selecionarViewComItem}
                    servicos={servicos}
                    atualizarDados={this.atualizarDados}
                />;
                break;
            case 'Cadastrar Serviço':
                conteudo = <FormularioCadastroServico
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    cadastrarServico={empresaService.cadastrarServico.bind(empresaService)}
                    atualizarDados={this.atualizarDados}
                />;
                break;
            case 'Atualizar Serviço':
                conteudo = <FormularioAtualizacaoServico
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    servico={this.state.itemSelecionado as Servico}
                    atualizarServico={empresaService.atualizarServico.bind(empresaService)}
                    atualizarDados={this.atualizarDados}
                />;
                break;
            case 'Excluir Serviço':
                conteudo = <ConfirmacaoExclusaoServico
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    servico={this.state.itemSelecionado as Servico}
                    excluirServico={empresaService.excluirServico.bind(empresaService)}
                    atualizarDados={this.atualizarDados}
                />;
                break;

            // Consumo
            case 'Consumo':
                conteudo = (
                    <RegistroConsumo
                        tema="#e3f2fd"
                        seletorView={this.selecionarView}
                        clientes={clientes}
                        produtos={produtos}
                        servicos={servicos}
                        registrarConsumo={empresaService.registrarConsumo.bind(empresaService)}
                        atualizarDados={this.atualizarDados}
                    />
                );
                break;

            // Relatórios - ALTERAÇÕES AQUI!
            case 'Relatórios':
                conteudo = (
                    <div className="container-fluid">
                        <h2>Relatórios Disponíveis</h2>
                        <div className="list-group">
                            <button type="button" className="list-group-item list-group-item-action" onClick={(e) => this.selecionarView('Relatório Clientes + Consumo', e)}>
                                Top 10 Clientes que Mais Consumiram (Quantidade)
                            </button>
                            <button type="button" className="list-group-item list-group-item-action" onClick={(e) => this.selecionarView('Relatório Clientes + Gastaram', e)}>
                                Top 5 Clientes que Mais Consumiram (Valor)
                            </button>
                            <button type="button" className="list-group-item list-group-item-action" onClick={(e) => this.selecionarView('Relatório Prod/Serv + Consumo', e)}>
                                Produtos e Serviços Mais Consumidos (Geral)
                            </button>
                            {/* Nomes dos relatórios alterados aqui */}
                            <button type="button" className="list-group-item list-group-item-action" onClick={(e) => this.selecionarView('Mais Consumidos por Raça', e)}>
                                Mais Consumidos por Raça
                            </button>
                            <button type="button" className="list-group-item list-group-item-action" onClick={(e) => this.selecionarView('Mais Consumidos por Tipo', e)}>
                                Mais Consumidos por Tipo
                            </button>
                        </div>
                    </div>
                );
                break;
            case 'Relatório Clientes + Consumo':
                conteudo = <RelatorioClientesMaisConsumiram
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    getRelatorio={empresaService.getRelatorioTop10ClientesPorQuantidade.bind(empresaService)}
                />;
                break;
            case 'Relatório Clientes + Gastaram':
                conteudo = <RelatorioClientesMaisGastaram
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    getRelatorio={empresaService.getRelatorioTop5ClientesPorValor.bind(empresaService)}
                />;
                break;
            case 'Relatório Prod/Serv + Consumo':
                conteudo = <RelatorioProdutosServicosMaisConsumidos
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    getRelatorio={empresaService.getRelatorioProdutosServicosMaisConsumidos.bind(empresaService)}
                />;
                break;
            {/* Nomes dos cases alterados aqui */}
            case 'Mais Consumidos por Raça':
                conteudo = <RelatorioConsumoPorTipoRaca
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    getRelatorio={empresaService.getRelatorioConsumoPorTipoRaca.bind(empresaService)}
                />;
                break;
            case 'Mais Consumidos por Tipo':
                conteudo = <RelatorioConsumoPorTipo
                    tema="#e3f2fd"
                    seletorView={this.selecionarView}
                    getRelatorio={empresaService.getRelatorioConsumoPorTipo.bind(empresaService)}
                />;
                break;
            default:
                conteudo = <div><h2>Bem-vindo!</h2><p>Selecione uma opção na barra de navegação.</p></div>;
        }

        return (
            <>
                {barraNavegacao}
                <div className="container-fluid">
                    {conteudo}
                </div>
            </>
        );
    }
}