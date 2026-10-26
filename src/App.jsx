import { useState, useEffect, useRef } from 'react';
import './App.css';

// ==========================================
// 1. COMPONENTE: ACORDEÃO (Accordion)
// ==========================================
function Acordeao({ itens }) {
  // Guarda o índice de qual pergunta está aberta (apenas uma por vez)
  const [indiceAberto, setIndiceAberto] = useState(0);

  function alternarItem(index) {
    if (indiceAberto === index) {
      setIndiceAberto(null); // Fecha se clicar no mesmo
    } else {
      setIndiceAberto(index); // Abre o novo
    }
  }

  return (
    <div className="acordeao">
      {itens.map((item, index) => {
        const estaAberto = indiceAberto === index;
        return (
          <div key={index} className="acordeao-item">
            <button
              className="acordeao-botao"
              onClick={() => alternarItem(index)}
              aria-expanded={estaAberto}
            >
              <span>{item.titulo}</span>
              <span>{estaAberto ? '▲' : '▼'}</span>
            </button>
            <div className={`acordeao-conteudo ${estaAberto ? 'aberto' : ''}`}>
              <p>{item.conteudo}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ==========================================
// 2. COMPONENTE: PAGINAÇÃO (Pagination)
// ==========================================
function Paginacao({ paginaAtual, totalPaginas, aoMudarPagina }) {
  const paginas = [];
  for (let i = 1; i <= totalPaginas; i++) {
    paginas.push(i);
  }

  return (
    <nav className="paginacao" aria-label="Navegação do cardápio e shows">
      <button
        onClick={() => aoMudarPagina(paginaAtual - 1)}
        disabled={paginaAtual === 1}
      >
        Anterior
      </button>

      {paginas.map((num) => (
        <button
          key={num}
          className={paginaAtual === num ? 'pagina-ativa' : ''}
          onClick={() => aoMudarPagina(num)}
          aria-current={paginaAtual === num ? 'page' : undefined}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => aoMudarPagina(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
      >
        Próxima
      </button>
    </nav>
  );
}

// ==========================================
// 3. COMPONENTE: BARRA DE PROGRESSO (Progress Bar)
// ==========================================
function BarraProgresso({ valor, rotulo }) {
  return (
    <div className="progresso-container">
      <div className="progresso-cabecalho">
        <span>{rotulo}</span>
        <strong>{valor}%</strong>
      </div>
      <div
        className="progresso-trilho"
        role="progressbar"
        aria-valuenow={valor}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="progresso-preenchimento"
          style={{ width: `${valor}%` }}
        ></div>
      </div>
    </div>
  );
}

// ==========================================
// 4. COMPONENTE: ABAS (Tabs)
// ==========================================
function Abas({ abas }) {
  const [abaAtiva, setAbaAtiva] = useState(0);

  return (
    <div className="abas-container">
      <div className="abas-topo" role="tablist">
        {abas.map((aba, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={abaAtiva === index}
            className={abaAtiva === index ? 'aba-botao ativa' : 'aba-botao'}
            onClick={() => setAbaAtiva(index)}
          >
            {aba.titulo}
          </button>
        ))}
      </div>
      <div className="aba-painel" role="tabpanel">
        {abas[abaAtiva].conteudo}
      </div>
    </div>
  );
}

// ==========================================
// 5. COMPONENTE: MENU SUSPENSO (Dropdown Menu)
// ==========================================
function MenuSuspenso({ titulo, opcoes }) {
  const [aberto, setAberto] = useState(false);
  const menuRef = useRef(null);

  // Fecha o menu se o usuário clicar fora dele
  useEffect(() => {
    function clicarFora(evento) {
      if (menuRef.current && !menuRef.current.contains(evento.target)) {
        setAberto(false);
      }
    }
    document.addEventListener('mousedown', clicarFora);
    return () => document.removeEventListener('mousedown', clicarFora);
  }, []);

  function selecionarOpcao(opcao) {
    opcao.acao();
    setAberto(false);
  }

  return (
    <div className="dropdown" ref={menuRef}>
      <button
        className="dropdown-botao"
        onClick={() => setAberto(!aberto)}
        aria-expanded={aberto}
      >
        {titulo} ▼
      </button>

      {aberto && (
        <ul className="dropdown-lista">
          {opcoes.map((opcao, index) => (
            <li key={index}>
              <button onClick={() => selecionarOpcao(opcao)}>
                {opcao.nome}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ==========================================
// 6. COMPONENTE: NOTIFICAÇÃO TOAST
// ==========================================
function NotificacaoToast({ mensagem, tipo, aoFechar }) {
  // Desaparece sozinho após 3,5 segundos
  useEffect(() => {
    if (!mensagem) return;
    const timer = setTimeout(() => {
      aoFechar();
    }, 3500);

    return () => clearTimeout(timer);
  }, [mensagem, aoFechar]);

  if (!mensagem) return null;

  return (
    <div className={`toast toast-${tipo}`} role="alert">
      <span>{mensagem}</span>
      <button className="toast-fechar" onClick={aoFechar} aria-label="Fechar">
        ✕
      </button>
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL (App)
// ==========================================
export default function App() {
  const [salaoAtual, setSalaoAtual] = useState('Salão Imperial (Palco Jazz)');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [progressoReserva, setProgressoReserva] = useState(50);
  const [toast, setToast] = useState({ mensagem: '', tipo: 'info' });

  function mostrarToast(mensagem, tipo = 'info') {
    setToast({ mensagem, tipo });
  }

  // Dados para a Paginação (6 atrações/clássicos divididos em 2 por página = 3 páginas)
  const atracoes = [
    {
      id: 1,
      nome: 'Orquestra Havana & Metais',
      horario: 'Sexta, 21h30',
      detalhe: 'Abertura da noite com mambo, boleros e big band ao vivo.',
    },
    {
      id: 2,
      nome: 'Quarteto Manhattan Swing',
      horario: 'Sexta, 23h00',
      detalhe: 'Clássicos do jazz nova-iorquino dos anos 50 no piano e saxofone.',
    },
    {
      id: 3,
      nome: 'Coquetel Copa Manhattan (Especial)',
      horario: 'Serviço de Bar',
      detalhe: 'Bourbon envelhecido, vermute doce italiano e cereja marrasquino.',
    },
    {
      id: 4,
      nome: 'Jantar Lagosta Thermidor',
      horario: 'Cozinha até 00h',
      detalhe: 'Prato clássico da casa gratinado com molho cremoso de conhaque.',
    },
    {
      id: 5,
      nome: 'Noite de Gala: Tributo Rat Pack',
      horario: 'Sábado, 22h00',
      detalhe: 'Repertório dedicado a Frank Sinatra, Dean Martin e Sammy Davis Jr.',
    },
    {
      id: 6,
      nome: 'Mesa de Charutos & Conhaque Francês',
      horario: 'Lounge Anexo',
      detalhe: 'Seleção especial no salão revestido em veludo vermelho.',
    },
  ];

  const itensPorPagina = 2;
  const totalPaginas = Math.ceil(atracoes.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const atracoesDaPagina = atracoes.slice(
    indiceInicial,
    indiceInicial + itensPorPagina
  );

  // Opções do Menu Suspenso
  const opcoesAmbiente = [
    {
      nome: 'Salão Imperial (Palco Jazz)',
      acao: () => {
        setSalaoAtual('Salão Imperial (Palco Jazz)');
        mostrarToast('Ambiente alterado para Salão Imperial.', 'info');
      },
    },
    {
      nome: 'Lounge Velvet (Bar & Charutos)',
      acao: () => {
        setSalaoAtual('Lounge Velvet (Bar & Charutos)');
        mostrarToast('Ambiente alterado para Lounge Velvet.', 'info');
      },
    },
    {
      nome: 'Terraço Tropicana (Mesas VIP)',
      acao: () => {
        setSalaoAtual('Terraço Tropicana (Mesas VIP)');
        mostrarToast('Ambiente alterado para Terraço Tropicana.', 'info');
      },
    },
  ];

  // Perguntas do Acordeão (Etiqueta dos anos 50)
  const perguntasFaq = [
    {
      titulo: '1. Qual é o traje exigido (Dress Code) no Clube Copacabana?',
      conteudo:
        'Mantemos a tradição de 1954: exige-se smoking ou terno escuro com gravata para os cavalheiros e traje de noite para as damas. Chapéus e sobretudos devem ser entregues na chapelaria da entrada.',
    },
    {
      titulo: '2. Como funcionam as mesas na primeira fila do palco?',
      conteudo:
        'As mesas próximas à orquestra são reservadas mediante confirmação antecipada com o Maitre Emilio e incluem o serviço de jantar completo antes do primeiro show.',
    },
    {
      titulo: '3. É permitido fotografar durante as apresentações?',
      conteudo:
        'Para não ofuscar os músicos durante os solos de trompete, não são permitidos flashes particulares. As "Copa Girls" e o fotógrafo oficial do clube circulam pelas mesas registrando a noite.',
    },
    {
      titulo: '4. Até que horas a cozinha permanece aberta?',
      conteudo:
        'O jantar principal é servido das 20h até a meia-noite. Após esse horário, permanecem disponíveis a carta de coquetéis clássicos e entradas frias até as 3h da manhã.',
    },
  ];

  // Funções para controlar a Barra de Progresso na Aba 2
  function avancarReserva() {
    if (progressoReserva < 100) {
      const novoValor = progressoReserva + 25;
      setProgressoReserva(novoValor);
      if (novoValor === 100) {
        mostrarToast('Reserva VIP concluída! O Maitre aguarda sua chegada.', 'sucesso');
      } else {
        mostrarToast(`Etapa concluída (${novoValor}%).`, 'info');
      }
    } else {
      mostrarToast('Sua reserva já está 100% confirmada!', 'erro');
    }
  }

  function voltarReserva() {
    if (progressoReserva > 0) {
      setProgressoReserva(progressoReserva - 25);
      mostrarToast('Etapa da reserva desfeita.', 'info');
    }
  }

  // Conteúdo das 3 Abas
  const conteudoAbas = [
    {
      titulo: 'Programação & Carta',
      conteudo: (
        <section>
          <h2>Atrações e Especialidades da Noite</h2>
          <p className="subtitulo-secao">
            Consulte abaixo os horários da orquestra e os clássicos servidos no{' '}
            <strong>{salaoAtual}</strong>:
          </p>

          <div className="lista-cartoes">
            {atracoesDaPagina.map((item) => (
              <article key={item.id} className="cartao-copa">
                <div className="cartao-topo">
                  <h3>★ {item.nome}</h3>
                  <span className="etiqueta-horario">{item.horario}</span>
                </div>
                <p>{item.detalhe}</p>
                <button
                  className="botao-acao"
                  onClick={() =>
                    mostrarToast(
                      `Solicitação enviada ao garçom: ${item.nome}`,
                      'sucesso'
                    )
                  }
                >
                  Solicitar na Mesa
                </button>
              </article>
            ))}
          </div>

          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            aoMudarPagina={(novaPagina) => setPaginaAtual(novaPagina)}
          />
        </section>
      ),
    },
    {
      titulo: 'Reserva de Mesa VIP',
      conteudo: (
        <section>
          <h2>Andamento da Reserva para Esta Noite</h2>
          <p className="subtitulo-secao">
            Acompanhe o preparo da sua mesa com vista para o palco no setor{' '}
            <strong>{salaoAtual}</strong>.
          </p>

          <BarraProgresso
            valor={progressoReserva}
            rotulo="Status de Preparação da Mesa (Check-in, Chapelaria, Bebidas e Maitre)"
          />

          <div className="botoes-progresso">
            <button className="botao-secundario" onClick={voltarReserva}>
              - Voltar Etapa (-25%)
            </button>
            <button className="botao-acao" onClick={avancarReserva}>
              + Confirmar Próxima Etapa (+25%)
            </button>
          </div>
        </section>
      ),
    },
    {
      titulo: 'Etiqueta da Casa (FAQ)',
      conteudo: (
        <section>
          <h2>Manual de Etiqueta e Costumes (Anos 50)</h2>
          <p className="subtitulo-secao">
            Dúvidas frequentes dos frequentadores do Copacabana Club:
          </p>
          <Acordeao itens={perguntasFaq} />
        </section>
      ),
    },
  ];

  return (
    <div className="pagina-copa">
      <header className="cabecalho">
        <div className="cabecalho-moldura">
          <span className="ano-fundacao">NEW YORK • EST. 1940</span>
          <h1>The Copacabana Club</h1>
          <p>Jantar Dançante, Orquestra ao Vivo & Coquetéis Clássicos</p>

          <div className="barra-ambiente">
            <span>Setor selecionado: <strong>{salaoAtual}</strong></span>
            <MenuSuspenso
              titulo="Trocar Ambiente do Clube"
              opcoes={opcoesAmbiente}
            />
          </div>
        </div>
      </header>

      <main className="conteudo-principal">
        <Abas abas={conteudoAbas} />
      </main>

      <footer className="rodape">
        <p>The Copacabana Club — 10 East 60th Street, New York</p>
        <small>Atividade de Engenharia de Software (React.js) — UCSAL</small>
      </footer>

      <NotificacaoToast
        mensagem={toast.mensagem}
        tipo={toast.tipo}
        aoFechar={() => setToast({ mensagem: '', tipo: 'info' })}
      />
    </div>
  );
}