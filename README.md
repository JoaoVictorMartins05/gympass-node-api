# GymPass Style App 🏋️‍♂️

Aplicação inspirada no modelo GymPass, desenvolvida com **Node.js**, **TypeScript**, **Docker** e **PostgreSQL**.  
Este projeto permite aos usuários encontrarem academias, realizarem check-ins, validarem entradas e gerenciarem seu histórico de atividades.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Docker](https://www.docker.com/)
- [JWT (JSON Web Token)](https://jwt.io/)
- [Fastify](https://www.fastify.io/) (ou outro framework utilizado)

---

## 🏗️ Funcionalidades

### ✅ **Requisitos Funcionais (RFs)**

- [x] Cadastro de usuários
- [x] Autenticação de usuários
- [x] Obtenção de perfil do usuário logado
- [x] Visualizar número total de check-ins realizados
- [x] Histórico completo de check-ins
- [x] Busca de academias próximas (geolocalização)
- [x] Busca de academias pelo nome
- [x] Realizar check-in em uma academia
- [x] Validação de check-in por administradores
- [x] Cadastro de academias (somente admin)

### 🔒 **Regras de Negócio (RNs)**

- [x] Cadastro impedido com e-mail já existente
- [x] Usuário não pode realizar dois check-ins no mesmo dia
- [x] Check-in permitido apenas se estiver a até 100 metros da academia
- [x] Check-in só pode ser validado até 20 minutos após sua criação
- [x] Apenas administradores podem validar check-ins
- [x] Apenas administradores podem cadastrar academias

### 📦 **Requisitos Não Funcionais (RNFs)**

- [x] Senhas armazenadas de forma criptografada
- [x] Persistência dos dados no banco PostgreSQL
- [x] Listagens paginadas com 20 itens por página
- [x] Autenticação baseada em JWT

---