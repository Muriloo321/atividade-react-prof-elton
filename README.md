# The Copacabana Club - Atividade React.js

Trabalho desenvolvido para a disciplina do professor Elton Figueiredo da Silva no curso de Engenharia de Software da Universidade Católica do Salvador (UCSAL).

## Sobre o Projeto

Para essa aplicação, houve forte inspiração ao "The Copacabana Club", inspirada nos clássicos clubes de jazz e jantar dançante de Nova York dos anos 1950 e 1960, e a música "Copacabana" do Barry Manilow. O objetivo do projeto é aplicar os conceitos de componentização, propriedades (`props`), gerenciamento de estado (`useState`), efeitos (`useEffect`) e responsividade utilizando React.js e CSS puro.

## Componentes Implementados

Todos os 6 componentes obrigatórios foram implementados no arquivo `src/App.jsx` e estilizados em `src/App.css`:

1- Acordeão (`Acordeao`): Utilizado na seção "Etiqueta da Cas" para exibir e ocultar as regras de traje e costumes do clube, mantendo apenas uma pergunta aberta por vez.
2- Paginação (`Paginacao`): Utilizada na aba principal para navegar entre os cartões de atrações musicais e pratos clássicos da noite (2 itens por página), desabilitando os botões de navegação na primeira e na última página.
3- Barra de Progresso (`BarraProgresso`): Utilizada na aba "Reserva de Mesa VIP" para indicar o percentual de conclusão do preparo da mesa (de 0% a 100%).
4- Abas (`Abas`): Organiza o conteúdo principal do clube em três painéis distintos: Programação & Carta, Reserva de Mesa VIP e Etiqueta da Casa (FAQ).
5- Menu Suspenso (`MenuSuspenso`): Localizado no cabeçalho para permitir a troca do setor/ambiente do clube (Salão Imperial, Lounge Velvet ou Terraço Tropicana), fechando automaticamente ao selecionar uma opção ou ao clicar fora dele.
6- Notificação Toast (`NotificacaoToast`): Exibe avisos temporários no canto inferior direito da tela sempre que o usuário solicita um item na mesa, altera o ambiente ou avança etapas da reserva.

<img width="940" height="812" alt="{0BE8B4A3-1971-40D6-88A5-741F51EAE0AF}" src="https://github.com/user-attachments/assets/27fbb62c-e123-4e7a-b284-bc5f796d69e2" />



## Tecnologias Utilizadas

- React.js (com Vite)
- CSS3 puro 
- HTML
- GitHub Codespaces

## Como executar o projeto

Pra lembrete: no terminal do GitHub Codespaces, executar esses comandos abaixo:

```bash
npm install
npm run dev
