# 🩺 Healthcare Chatbot

An advanced AI-powered chatbot designed for answering medical questions using Retrieval-Augmented Generation (RAG) with Meta’s LLaMA 2 7B Chat.

---

## 🚀 Features

- **Instruction-Tuned LLaMA 2–7B Chat** via HuggingFace for natural, factual responses.
- **LangChain RAG Pipeline**: Retrieve relevant content from a medical corpus.
- **Cross-Encoder Reranker** to refine retrieved contexts.
- **Conversational Memory** for coherent multi-turn dialogs.
- **FAISS Vector Store** to store document embeddings.
- **Streamlit UI** for an accessible web interface.

---

## 📁 Project Structure

```
healthcare-chatbot/
├── medical_documents/       # Input medical knowledge base (text files)
├── app.py                   # Streamlit chatbot frontend
├── agents/                  # Conversational agent logic
├── tools/                   # RAG tools and utilities
├── config/                  # Configuration & prompt templates
├── faiss_medical_index/     # Saved FAISS vector index
├── requirements.txt         # Project dependencies
└── README.md
```

---

## 💻 Getting Started

1. **Clone the repo**
```bash
git clone https://github.com/your-username/healthcare-chatbot.git
cd healthcare-chatbot
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Download and place medical documents**
Put `.txt` or `.md` documents inside the `medical_documents/` folder.

4. **Run the chatbot**
```bash
streamlit run app.py
```

---

## 🧠 Tech Stack

| Component         | Technology                         |
|------------------|-------------------------------------|
| LLM               | Meta LLaMA 2–7B Chat HF             |
| Retrieval         | LangChain + FAISS                  |
| Embeddings        | sentence-transformers (mpnet-base) |
| UI                | Streamlit                          |
| Reranker          | CrossEncoder (ms-marco)            |
| Memory            | LangChain ConversationalMemory     |

---

## 📜 License

MIT © 2025
