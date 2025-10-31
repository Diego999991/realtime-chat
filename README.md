# 💬 Real-Time Chat Application

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Socket.io](https://img.shields.io/badge/Socket.io-4.x-010101?logo=socket.io)
![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)

> Aplicação de chat em tempo real com salas públicas, mensagens instantâneas, indicador de digitação e interface moderna. Construída com Next.js 14, Socket.io e Prisma ORM.


---

## ✨ Funcionalidades

### 💬 Chat em Tempo Real
- ✅ Mensagens instantâneas com WebSocket (Socket.io)
- ✅ Salas de chat públicas e privadas
- ✅ Indicador "digitando..." em tempo real
- ✅ Status online/offline dos usuários
- ✅ Histórico de mensagens persistente
- ✅ Timestamps nas mensagens

### 👥 Gerenciamento de Usuários
- ✅ Sistema de username simples
- ✅ Avatar personalizado (opcional)
- ✅ Lista de usuários online
- ✅ Notificações de entrada/saída

### 🎨 Interface Moderna
- ✅ Design responsivo (mobile-first)
- ✅ Tema dark com gradientes
- ✅ Efeitos glassmorphism
- ✅ Animações suaves
- ✅ Ícones modernos (Lucide React)

---

## 🛠️ Stack Tecnológica

### Frontend
- **Next.js 14** - App Router com Server Components
- **React 18** - UI library
- **Socket.io Client** - WebSocket client
- **Tailwind CSS** - Estilização utility-first
- **Lucide React** - Ícones modernos
- **date-fns** - Formatação de datas

### Backend
- **Next.js API Routes** - Endpoints REST
- **Socket.io Server** - WebSocket real-time
- **Prisma** - ORM type-safe
- **SQLite** - Banco de dados (dev)

---

## 🏗️ Arquitetura
```
realtime-chat/
├── prisma/
│   ├── schema.prisma         # Schema do banco
│   ├── migrations/           # Histórico de migrações
│   └── dev.db               # SQLite database
│
├── src/
│   ├── app/
│   │   ├── chat/            # Página do chat
│   │   ├── api/             # API routes
│   │   ├── globals.css      # Estilos globais
│   │   ├── layout.js        # Layout principal
│   │   └── page.js          # Página inicial (login)
│   │
│   ├── components/
│   │   └── chat/            # Componentes do chat
│   │
│   └── lib/
│       ├── prisma.js        # Cliente Prisma
│       └── socket.js        # Configuração Socket.io
│
├── server.js                # Servidor customizado
├── .env                     # Variáveis de ambiente
└── package.json
```

---

## 📦 Instalação

### Pré-requisitos

- Node.js >= 18.x
- npm ou yarn

### Setup
```bash
# Clone o repositório
git clone https://github.com/Diego999991/realtime-chat.git

# Entre no diretório
cd realtime-chat

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute as migrations
npx prisma migrate dev

# Inicie o servidor
npm run dev
```

O chat estará disponível em: **http://localhost:3000** 🚀

---

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz:
```env
# Database
DATABASE_URL="file:./dev.db"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

---

## 📚 Como Usar

### 1. Entrar no Chat

1. Acesse `http://localhost:3000`
2. Digite seu nome de usuário
3. Clique em "Entrar no Chat"

### 2. Enviar Mensagens

- Digite sua mensagem no campo inferior
- Pressione Enter ou clique em enviar
- Mensagem aparece instantaneamente para todos

### 3. Criar Salas

- Clique em "Nova Sala"
- Escolha nome e descrição
- Convide outros usuários

---

## 🗄️ Modelo de Dados
```prisma
model User {
  id        String   @id @default(uuid())
  username  String   @unique
  avatar    String?
  messages  Message[]
  rooms     RoomMember[]
}

model Room {
  id          String   @id @default(uuid())
  name        String
  description String?
  isPrivate   Boolean  @default(false)
  messages    Message[]
  members     RoomMember[]
}

model Message {
  id        String   @id @default(uuid())
  content   String
  userId    String
  roomId    String
  createdAt DateTime @default(now())
  user      User
  room      Room
}

model RoomMember {
  userId    String
  roomId    String
  joinedAt  DateTime @default(now())
  user      User
  room      Room
  @@unique([userId, roomId])
}
```

---

## 🔌 Socket.io Events

### Cliente → Servidor
```javascript
// Entrar em uma sala
socket.emit('join-room', roomId);

// Enviar mensagem
socket.emit('send-message', { roomId, message });

// Usuário digitando
socket.emit('typing', { roomId, username });

// Parar de digitar
socket.emit('stop-typing', { roomId });
```

### Servidor → Cliente
```javascript
// Nova mensagem recebida
socket.on('new-message', (message) => {...});

// Usuário entrou
socket.on('user-joined', ({ socketId }) => {...});

// Usuário digitando
socket.on('user-typing', ({ username }) => {...});

// Parou de digitar
socket.on('user-stopped-typing', () => {...});
```

---

## 📝 Scripts Disponíveis
```bash
npm run dev              # Servidor de desenvolvimento
npm run build            # Build para produção
npm start                # Servidor de produção
npm run lint             # Executar ESLint
npm run prisma:studio    # Abrir Prisma Studio
```

---

## 🚀 Deploy

### Preparar para Produção

**1. Migrar para PostgreSQL:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/chatdb"
```

**2. Atualizar schema:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**3. Executar migrations:**
```bash
npx prisma migrate deploy
```

---

### Plataformas Recomendadas

#### **Vercel** ⭐ (Recomendado)
- Deploy automático do GitHub
- Edge Functions
- SSL gratuito
```bash
npm i -g vercel
vercel --prod
```

#### **Railway**
- PostgreSQL incluso
- WebSocket support
- Free tier

#### **Render**
- WebSocket support
- SSL automático
- Fácil configuração

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/NovaFeature`
3. Commit: `git commit -m 'Add: nova feature'`
4. Push: `git push origin feature/NovaFeature`
5. Abra um Pull Request

---

## 📝 Roadmap

### Em Desenvolvimento
- [ ] Página do chat funcional
- [ ] Componentes de mensagens
- [ ] Sistema de salas
- [ ] Indicador de digitação

### Futuras Funcionalidades
- [ ] Chamadas de voz/vídeo (WebRTC)
- [ ] Compartilhamento de arquivos
- [ ] Reações em mensagens (emojis)
- [ ] Mensagens privadas (DM)
- [ ] Busca de mensagens
- [ ] Notificações push
- [ ] Temas personalizáveis
- [ ] Markdown nas mensagens
- [ ] Edição/exclusão de mensagens
- [ ] Status customizável
- [ ] Integração com bots

---



---

## 👨‍💻 Autor

**Diego**

- GitHub: [@Diego999991](https://github.com/Diego999991)
- LinkedIn: [Diego Nobrega](https://www.linkedin.com/in/diego-n%C3%B3brega-042a69352?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
- Email: nbmdiego@gmail.com
---

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework React
- [Socket.io](https://socket.io/) - WebSocket library
- [Prisma](https://www.prisma.io/) - ORM moderno
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

⭐ Se este projeto foi útil, considere dar uma estrela!

**Desenvolvido com ❤️ e Next.js**

