[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/fLYKC7FM)
# Trabalho Prático - Semana 13: Home com Cards e Página de Detalhes com JSON Server

Nesta atividade, foi implementada uma galeria de arte (Artfinder) que migra dados de um arquivo JavaScript para um arquivo `db.json` e utiliza **JSON Server** como um backend simples para o projeto. A aplicação segue uma estrutura client-server onde o navegador faz solicitações a um servidor REST que fornece dados sobre obras de arte.

---

## Informações Gerais

- **Nome:** Pedro Henriques Santos
- **Matricula:** 738891

---

## Estrutura do Banco de Dados (db.json)

### Coleções Implementadas

#### 1. **artworks** - Obras de Arte (Coleção Principal)
Contém dados sobre as obras de arte exibidas na galeria. Cada obra possui:
- `id` (number): Identificador único
- `title` (string): Título da obra
- `artist` (string): Nome do artista
- `year` (number): Ano de criação
- `medium` (string): Técnica/material utilizado
- `dimensions` (string): Dimensões da obra
- `category` (string): Categoria (Painting, Digital Art, Mixed Media, etc.)
- `price` (number): Preço em reais
- `description` (string): Descrição breve
- `fullDescription` (string): Descrição completa
- `available` (boolean): Disponibilidade para aquisição
- `featured` (boolean): Se é destaque
- `image` (string): URL da imagem em alta resolução
- `thumbnail` (string): URL da imagem em miniatura
- `tags` (array): Tags descritivas

**Total de itens:** 12 obras de arte com categorias variadas

#### 2. **categories** - Categorias
Lista de categorias possíveis:
- Painting
- Digital Art
- Mixed Media
- Photography
- Drawing

#### 3. **comments** - Comentários
Sistema de comentários para as obras (estrutura pronta para expansão futura)

#### 4. **ratings** - Avaliações
Avaliações médias e contagem de ratings para cada obra

### Exemplo de um Item (artwork):

```json
{
  "id": 1,
  "title": "Echoes of Light",
  "artist": "Elena Vasquez",
  "year": 2021,
  "medium": "Oil on canvas",
  "dimensions": "120 × 90 cm",
  "category": "Painting",
  "price": 4500,
  "description": "A luminous exploration of light and shadow, where golden hues dissolve into deep indigo, evoking the fleeting moment between dusk and night.",
  "fullDescription": "A luminous exploration of light and shadow, where golden hues dissolve into deep indigo, evoking the fleeting moment between dusk and night. This masterpiece captures the subtle transitions of evening light...",
  "available": true,
  "featured": true,
  "image": "https://picsum.photos/id/40/600/400",
  "thumbnail": "https://picsum.photos/id/40/200/200",
  "tags": ["abstract", "light", "oil painting", "contemporary"]
}
```

---

## Configuração e Execução

### Pré-requisitos
- Node.js instalado (download em https://nodejs.org/)
- npm (vem com Node.js)

### Passos para Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o JSON Server:**
   ```bash
   npm start
   # ou
   json-server --watch public/db.json --port 3000
   ```

3. **Abrir a aplicação:**
   - O JSON Server estará rodando em: `http://localhost:3000`
   - A API estará disponível em: `http://localhost:3000/artworks`
   - Abrir `public/modulos/index.html` no navegador (pode ser via Live Server)

### Endpoints Disponíveis

- `GET http://localhost:3000/artworks` - Lista todas as obras
- `GET http://localhost:3000/artworks?_limit=6` - Lista 6 primeiras obras
- `GET http://localhost:3000/artworks/1` - Busca obra específica pelo ID
- `GET http://localhost:3000/categories` - Lista categorias
- `GET http://localhost:3000/comments` - Lista comentários

---

## Estrutura do Projeto

```
tarefa-xiii-Unlikeanypedro/
├── package.json                 # Configuração npm
├── README.md                    # Este arquivo
├── db/
│   └── db.json                  # Banco de dados (BACKEND)
├── public/
│   ├── assets/
│   │   ├── css/
│   │   │   └── home-styles.css  # Estilos da aplicação
│   │   └── js/
│   └── modulos/
│       ├── index.html           # Página Home
│       ├── app.js               # Script para renderizar cards
│       ├── details.html         # Página de detalhes
│       ├── details.js           # Script para página de detalhes
│       └── gallery/
│           └── gallery.html
├── img/
│   └── *.png                    # Screenshots da aplicação
└── .git/
```

---

## Funcionalidades Implementadas

### 1. Home Page (index.html + app.js)
✅ Busca assíncrona de dados via Fetch API  
✅ Renderização dinâmica de cards a partir dos dados do servidor  
✅ Cards exibem: imagem, título, descrição curta, categoria, preço e tags  
✅ Animação de fade-in dos cards  
✅ Link "Ver obra" que navega para a página de detalhes  
✅ Badge indicando disponibilidade (Disponível/Vendida)  
✅ Tratamento de erro caso JSON Server não esteja rodando  

### 2. Página de Detalhes (details.html + details.js)
✅ Leitura do parâmetro `id` da URL usando `URLSearchParams`  
✅ Busca assíncrona do item específico via GET `/artworks/:id`  
✅ Exibição completa dos dados: título, artista, categoria, preço, descrição completa, técnica, dimensões e tags  
✅ Link "Voltar à Galeria" para navegação  
✅ Tratamento de erro quando ID não existe ou não é fornecido  
✅ Atualização dinâmica do título da página  

### 3. Estrutura de Dados
✅ 12 obras de arte com dados completos  
✅ 5 categorias definidas  
✅ Coleções adicionais (comentários, avaliações)  
✅ Dados consistentes e coerentes  

---

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica da aplicação
- **CSS3**: Design responsivo e animações
- **JavaScript (ES6+)**: Lógica assíncrona com Fetch API
- **JSON Server**: Backend simulado para requisições REST
- **Node.js + npm**: Ambiente de execução e gerenciamento de dependências
- **Bootstrap 5**: Framework CSS (opcional, já incluso)

---

## Imagens da Aplicação

### Home Page - Cards de Artworks
![Home Page](img/home-screenshot.png)  
*Página inicial com grid de cards exibindo as obras de arte em destaque*

### Página de Detalhes
![Detalhes da Obra](img/details-screenshot.png)  
*Página de detalhes mostrando informações completas de uma obra específica*

### Console/DevTools
![Console](img/console-screenshot.png)  
*Console do navegador mostrando requisições bem-sucedidas para o JSON Server*

---

## Como Usar a Aplicação

1. **Iniciar o servidor JSON Server** (em um terminal):
   ```bash
   npm start
   ```

2. **Abrir a Home** em outro terminal ou diretamente no navegador:
   - Via Live Server: Clique com botão direito em `public/modulos/index.html` > "Open with Live Server"
   - Ou acesse: `file:///caminho/para/projeto/public/modulos/index.html`

3. **Navegar pela galeria**:
   - Veja os cards das obras na Home
   - Clique em qualquer obra para ver detalhes completos
   - Use o link "Voltar à Galeria" para retornar

4. **Verificar requisições**:
   - Abra o DevTools (F12)
   - Vá para a aba "Network"
   - Veja as requisições sendo feitas para `http://localhost:3000/artworks`

---

## Detalhes de Implementação

### Funções Principais

**app.js (Home)**
- `fetchArtworks()`: Busca todas as obras do servidor
- `createCard(art, index)`: Cria elemento HTML de um card
- `renderCards(artworks)`: Renderiza todos os cards na página
- `init()`: Inicializa a página

**details.js (Detalhes)**
- `fetchArtworkById(id)`: Busca uma obra específica por ID
- `renderDetails(art)`: Renderiza os detalhes da obra
- `init()`: Inicializa a página de detalhes

### URLs de Exemplo

```
Navegação para detalhes:
details.html?id=1
details.html?id=5
details.html?id=12
```

---

## Tratamento de Erros

✅ **JSON Server não está rodando**: Mensagem clara indicando ao usuário
✅ **ID não fornecido na URL**: Exibe mensagem de obra não encontrada
✅ **ID inválido**: Busca retorna null e exibe mensagem de erro
✅ **Requisição falha**: Erro capturado no console e mensagem amigável ao usuário

---

## Melhorias Futuras

- [ ] Adicionar filtro por categoria
- [ ] Implementar busca por título
- [ ] Adicionar carrinho de compras
- [ ] Criar página de cadastro de novas obras
- [ ] Implementar avaliações e comentários na interface
- [ ] Adicionar paginação
- [ ] Autenticação de usuários

---

## Commits Git

```bash
git add .
git commit -m "Atividade Prática - JSON Server e detalhes por QueryString - matrícula: 738891"
git push origin seu-branch
```

---

## Referências

- [JSON Server Documentation](https://github.com/typicode/json-server)
- [Fetch API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [URLSearchParams - MDN](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [REST API Best Practices](https://restfulapi.net/)

---

**Desenvolvido por:** Pedro Henriques Santos  
**Data:** Junho de 2026  
**Repositório:** [GitHub Classroom - Tarefa XIII](https://github.com/PucMinasComputacao/turma-45103-diw-2026-1-tarefa-xiii-Tarefa-XIII)

