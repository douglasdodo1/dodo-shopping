# 🛍️ Dodo Shopping

Dodo Shopping é uma aplicação web de e-commerce desenvolvida com **Next.js 15**, **React 19**, **Tailwind CSS 4** e **React Query**. Ela permite visualizar produtos, pesquisar por nome, abrir um modal de detalhes e adicionar itens a um carrinho persistido localmente.

## 🚀 Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/) com Turbopack
- [React 19](https://reactjs.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React Query (TanStack)](https://tanstack.com/query/latest)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide React Icons](https://lucide.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## 📦 Estrutura de Pastas

src/
├── app/ # Rotas e páginas (Next.js App Router)
│ └── cart/ # Página do carrinho de compras
├── page.tsx # Página inicial
├── components/ # Componentes reutilizáveis
│ └── ui/ # Componentes de UI baseados em Radix e Tailwind
├── contexts/ # Contexto global (ex: searchContext)
├── lib/ # Funções utilitárias (ex: formatações)
├── providers/ # Providers globais (React Query, Contexts)
├── services/ # Funções de fetch/serviços externos (ex: getAllProducts)
├── types/ # Tipagens TypeScript (ex: productType.ts)

## 🧠 Funcionalidades

- 🔎 **Pesquisa por título** com contexto global
- 🛒 **Carrinho de compras** com:
  - Adição de produtos
  - Alteração de quantidade
  - Confirmação de compra
  - Persistência no `localStorage`
  - Exclusão de produtos 'ao subtrair quantidade de 1'
- 🧾 **Modal com detalhes do produto** ao clicar em um card
- 🌐 Integração com serviço API https://fakestoreapi.com/
- 🇧🇷 **Formatação de valores em reais**, com substituição de ponto por vírgula:

```ts
export const DotToComma = (value: number): string => {
  return value.toFixed(2).replace(/\./g, ",");
};
💻 Como Rodar Localmente
Clone o repositório

bash
Copiar
Editar
git clone https://github.com/douglasdodo1/dodo-shopping.git
cd dodo-shopping
Instale as dependências

bash
Copiar
Editar
npm install
# ou
yarn install
Execute o projeto em modo de desenvolvimento

bash
Copiar
Editar
npm run dev
# ou
yarn dev
A aplicação estará disponível em http://localhost:3000

📦 Scripts Disponíveis
Comando	Descrição
dev	Inicia o servidor Next.js com Turbopack
build	Cria a versão de produção
start	Inicia a aplicação em modo produção
lint	Executa o ESLint para checagem de código

✅ Futuras Melhorias
Integração com backend real (API REST FULL)
Pagamento com gateway (ex: Stripe)
Responsividade total e animações
Testes automatizados com Vitest ou Jest
Filtros por categoria ou preço
Autenticação de usuários

## 🌐 Link para Acesso
Deploy
https://dodo-shopping.vercel.app/

👤 Autor
Douglas Gemir
[CIN - UFPE • Ciência da Computação]
GitHub: @douglasdodo1
```
