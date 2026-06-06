# F.R.I.D.A.Y. — Friday Service

> *"Good evening. I'm a bit more than just a friend."*

**F.R.I.D.A.Y.** (Female Replacement Intelligent Digital Assistant Youth) is a personal AI assistant inspired by Iron Man's FRIDAY — Tony Stark's brilliant, ever-present AI companion. This project aims to build a backend service that acts as your personal intelligent assistant: one that remembers you, understands context, and is ready to help whenever you need it.

---

## ✨ Vision

Just like FRIDAY seamlessly assisted Tony — managing tasks, retaining critical information, and responding with sharp intelligence — this service is being built to be your own always-on AI backend. The goal is a smart, memory-aware assistant that knows who you are across every conversation.

---

## 🏗️ What's Been Built So Far

### 🤖 Quick Agent (LangGraph Powered)
The core of FRIDAY is a **stateful AI agent** built using [LangGraph](https://github.com/langchain-ai/langgraphjs). It follows a `chatbot → tools → chatbot` loop, allowing the model to decide when to use tools and when to respond directly.

- **Chatbot Node** — Powered by **Llama 3.3 70B** via [Groq](https://groq.com/), bound with tools for memory management.
- **Tool Node** — Executes tool calls requested by the LLM.
- **Conditional Edges** — Uses LangGraph's `toolsCondition` to route between chatting and tool use intelligently.

### 🧠 Memory System
FRIDAY remembers — both across sessions and within them.

- **Personal Memories** — Facts about *you* that persist across all conversations (e.g., your preferences, your name, your habits).
- **Conversation Memories** — Context and key information tied to a specific conversation, saved so FRIDAY can recall what was discussed.

Both are stored in **MongoDB** via **Prisma ORM**.

### 🗄️ Database (MongoDB + Prisma)
The data layer is modelled with the following entities:

| Model | Description |
|---|---|
| `Conversation` | Tracks individual chat sessions with title and timestamps |
| `Message` | Stores each message (USER / ASSISTANT / SYSTEM roles) linked to a conversation |
| `ConversationMemories` | Scoped memories saved per conversation |
| `PersonalMemories` | Global, user-level memories that persist across all conversations |

### 🌐 REST API (Express.js)
A clean Express.js API exposing the following endpoints:

| Method | Route | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `POST` | `/chat` | Send a message to FRIDAY |
| `GET` | `/conversations` | List all conversations |
| `GET` | `/conversations/:conversationId` | Load messages for a conversation |

### 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| Web Framework | Express.js v5 |
| LLM | Llama 3.3 70B via Groq |
| Agent Framework | LangChain + LangGraph |
| Database | MongoDB |
| ORM | Prisma |
| Logging | Winston + Morgan |
| Testing | Jest + Supertest |
| Deployment | Vercel (configured) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)
- Groq API Key

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd friday_service

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in DATABASE_URL and GROQ_API_KEY in .env

# Run in development mode
npm run dev
```

### Environment Variables

```env
DATABASE_URL=mongodb+srv://...
GROQ_API_KEY=your_groq_api_key
```

---

## 📁 Project Structure

```
friday_service/
├── src/
│   ├── agents/
│   │   └── quickAgent/          # LangGraph agent (chatbot + tool nodes)
│   │       ├── graph.ts         # Agent graph definition
│   │       └── nodes/
│   │           ├── chatbot.node.ts
│   │           └── tool.node.ts
│   ├── tools/
│   │   └── memory.tool.ts       # LangChain tool definitions for memory
│   ├── services/
│   │   ├── llm.service.ts       # Groq LLM instance
│   │   └── memory.service.ts    # Memory read/write logic (Prisma)
│   ├── routes/                  # Express route definitions
│   ├── controllers/             # Request handlers
│   ├── middlewares/             # Express middlewares
│   ├── config/                  # Env config
│   ├── db/                      # Prisma client setup
│   ├── logger/                  # Winston logger setup
│   └── utils/
├── prisma/
│   └── schema.prisma            # MongoDB schema
├── api/
│   └── index.ts                 # Vercel entry point
└── tests/                       # Jest test suite
```

---

## 🛣️ Roadmap

- [ ] Email Agent integration (`emailAgent.service.ts` — in progress)
- [ ] Retrieve & inject memories into conversation context automatically
- [ ] Authentication & multi-user support
- [ ] Voice interface support
- [ ] Scheduled tasks & reminders
- [ ] Calendar and email integration

---

## 🙌 Inspired By

> *Iron Man (2013) — Marvel Cinematic Universe*
>
> FRIDAY was Tony Stark's AI assistant, successor to J.A.R.V.I.S., voiced by Mary J. Blige. Sharp, reliable, and always there when it mattered most.

This project is a personal attempt to build something in that spirit — an AI that knows you, grows with you, and is always ready.

---

*Built with ❤️ by Anurag Kumar Tiwari*
