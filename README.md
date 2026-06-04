# Artfinder - Migração para JSON Server

**Aluno:** Pedro OLiveira
**Matrícula:** 927 165

## Descrição do Projeto

Artfinder é um aplicativo web que apresenta uma galeria de obras de arte. Nesta atividade, o projeto foi migrado de dados hardcoded para um modelo com **JSON Server**, implementando requisições assincronas via **Fetch API** e navegação dinâmica por **QueryString**.

## 🗂️ Estrutura de Arquivos

```
tarefa-xiii-Unlikeanypedro/
├── db.json                          # Base de dados JSON
├── public/
│   ├── modulos/
│   │   ├── index.html               # Página principal (Home)
│   │   └── details.html             # Página de detalhes
│   └── assets/
│       ├── js/
│       │   ├── home-script.js        # Script da Home (com Fetch)
│       │   └── details.js            # Script de detalhes (com Fetch)
│       └── css/
│           ├── home-styles.css
│           └── details.css
└── README.md                         # Este arquivo
```

## 💾 Estrutura do db.json

### Coleções Existentes

#### 1. artworks (Coleção Principal - 12 obras)
Contém as obras de arte da galeria.

**Campos de cada item:**
- `id` (number): Identificador único
- `title` (string): Título da obra
- `artist` (string): Nome do artista
- `year` (number): Ano de criação
- `category` (string): Categoria/Movimento artístico
- `medium` (string): Técnica utilizada (ex: óleo sobre tela)
- `description` (string): Descrição curta
- `descricaoCompleta` (string): Descrição detalhada para página de detalhes
- `thumbnail` (string): URL da imagem em miniatura (300x300)
- `image` (string): URL da imagem em tamanho grande (800x600)
- `tags` (array): Tags descritivas
- `destaque` (boolean): Se a obra está em destaque
- `preco` (number): Preço em reais

#### 2. categorias (10 categorias diferentes)
Lista de movimentos e estilos artísticos.

**Campos:**
- `id` (number): Identificador único
- `nome` (string): Nome da categoria
- `descricao` (string): Descrição da categoria

#### 3. avaliacoes
Notas e avaliações das obras.

**Campos:**
- `id` (number): Identificador único
- `artworkId` (number): ID da obra associada
- `nota` (number): Nota de avaliação (0-5)
- `totalAvaliacoes` (number): Quantidade de avaliações

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js instalado
- npm instalado

### Passos de Instalação

**Opção 1: Usar package.json (Recomendado)**

1. **Navegue até a pasta do projeto:**
   ```bash
   cd tarefa-xiii-Unlikeanypedro
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o JSON Server:**
   ```bash
   npm start
   ```

4. **Abra o navegador e acesse:**
   ```
   http://localhost:3000/public/modulos/index.html
   ```

**Opção 2: Instalar JSON Server Globalmente**

1. **Instale o JSON Server globalmente:**
   ```bash
   npm install -g json-server
   ```

2. **Navegue até a pasta do projeto:**
   ```bash
   cd tarefa-xiii-Unlikeanypedro
   ```

3. **Inicie o JSON Server:**
   ```bash
   json-server --watch db.json --port 3000
   ```

4. **Abra o navegador e acesse:**
   ```
   http://localhost:3000/public/modulos/index.html
   ```

### Testando os Endpoints

- **Listar todas as obras:** `http://localhost:3000/artworks`
- **Obter uma obra específica:** `http://localhost:3000/artworks/1`
- **Listar categorias:** `http://localhost:3000/categorias`
- **Listar avaliações:** `http://localhost:3000/avaliacoes`

## Como Executar

## 🎯 Funcionalidades Implementadas

### ✅ Home Page (index.html + home-script.js)
- [x] Requisição assincronas com `fetch()` para buscar dados do JSON Server
- [x] Renderização dinâmica de cards a partir dos dados da API
- [x] Cada card exibe: imagem, título, descrição curta, categoria e tags
- [x] Botão/link "Ver obra →" que navega para `details.html?id=<ID_DO_ITEM>`
- [x] Tratamento de erros (mensagem se JSON Server não estiver rodando)
- [x] Animação de cards com delay baseado em index

### ✅ Página de Detalhes (details.html + details.js)
- [x] Leitura de parâmetro `id` da URL usando `URLSearchParams`
- [x] Requisição assincronas para buscar dados do item específico
- [x] Renderização de informações completas: imagem, título, descrição completa, técnica, ano, preço e tags
- [x] Link de volta para a galeria ("← Galeria")
- [x] Tratamento de erros:
  - Mensagem clara se o `id` não está na URL
  - Mensagem clara se a obra não existe na base de dados

### ✅ Estrutura de Dados (db.json)
- [x] 12 obras de arte (atende o mínimo de 10)
- [x] 10 categorias diferentes
- [x] Estrutura completa de avaliações
- [x] Campos de descrição curta e completa para cada obra
- [x] Campos de imagem miniatura e imagem grande
- [x] Campo de preço para cada obra

## Funcionalidades Implementadas

- ✅ Home com cards renderizados via Fetch API
- ✅ Página de detalhes com QueryString (?id=X)
- ✅ URLSearchParams para leitura de parâmetros
- ✅ Tratamento de erros
- ✅ 12 obras de arte em db.json
- ✅ 10 categorias diferentes

## 🌐 API RESTful - Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /artworks | Lista todas as obras |
| GET | /artworks/:id | Obtém uma obra específica |
| GET | /categorias | Lista categorias |
| GET | /avaliacoes | Lista avaliações |
| POST | /artworks | Cria uma nova obra (JSON Server) |
| PUT | /artworks/:id | Atualiza uma obra (JSON Server) |
| DELETE | /artworks/:id | Deleta uma obra (JSON Server) |

## Endpoints da API

- GET /artworks - Lista todas as obras
- GET /artworks/:id - Obtém uma obra específica
- GET /categorias - Lista categorias
- GET /avaliacoes - Lista avaliações

## ⚙️ Tecnologias Utilizadas

- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização (Bootstrap 5 + CSS customizado)
- **JavaScript (ES6+)**
  - Fetch API para requisições assincronas
  - URLSearchParams para leitura de query strings
  - DOM Manipulation
  - Promises e async/await
- **JSON Server** - Backend simples em Node.js
- **Bootstrap 5** - Framework CSS

## 🔍 Fluxo de Navegação

1. **Home (index.html)** → Exibe cards de todas as obras
2. **Clique em "Ver obra →"** → Navega para `details.html?id=<ID>`
3. **Página de Detalhes (details.html)** → Exibe informações completas
4. **Clique em "← Galeria"** → Volta para a Home

## Tecnologias

- HTML5, CSS3, JavaScript (ES6+)
- Fetch API para requisições assincronas
- JSON Server
- Bootstrap 5

## 📚 Conhecimento Aplicado

- ✅ APIs RESTful
- ✅ Requisições assincronas com Fetch API
- ✅ Promessas e async/await
- ✅ URLSearchParams para manipulação de URLs
- ✅ JSON como formato de dados
- ✅ Renderização dinâmica de DOM
- ✅ Tratamento de erros em requisições
- ✅ Organização de código com funções

## 🐛 Troubleshooting

### "Erro ao carregar obras. Verifique se o JSON Server está rodando."
- Certifique-se de que o JSON Server está iniciado com: `json-server --watch db.json --port 3000`
- Verifique se a porta 3000 está disponível
- Se a porta estiver em uso, use: `json-server --watch db.json --port 3001`

### "Obra não encontrada"
- Verifique se o `id` na URL corresponde a um item existente em `db.json`
- Exemplo válido: `details.html?id=1` (com id entre 1 e 12)

### CORS Error
- Se você estiver servindo o front-end de um servidor diferente, o JSON Server pode necessitar de configuração CORS
- Por padrão, JSON Server permite requisições locais

## 📝 Funções Principais

### home-script.js

- `async function fetchItems()` - Busca todos os artworks no JSON Server
- `function renderCards(artworks)` - Renderiza os cards na página
- `function initNavToggle()` - Inicializa o toggle do menu mobile
- `async function init()` - Função de inicialização

### details.js

- `async function fetchArtwork(id)` - Busca um artwork específico pelo ID
- `async function renderDetails()` - Renderiza as informações detalhadas
- `function initNavToggle()` - Inicializa o toggle do menu mobile

---

**Data de Conclusão:** 2026-06-03
