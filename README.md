# 🩺 Instruction-Tuned Healthcare Chatbot with RAG using LLaMA 2–7B

An advanced conversational healthcare assistant built using **Meta's LLaMA 2–7B**, enhanced with **Retrieval-Augmented Generation (RAG)**, **reranking**, **contextual compression**, and **conversational memory**. This chatbot provides medically relevant, instruction-following responses grounded in a vectorized medical knowledge base.

---

## 🚀 Features

- 🧠 **Instruction-Tuned LLaMA 2–7B** for accurate and coherent response generation.
- 📚 **RAG pipeline** using LangChain for context-rich retrieval from a medical corpus.
- 📌 **Cross-encoder reranker** for improved relevance scoring of retrieved documents.
- 🧾 **Conversational memory** to maintain context across user turns.
- 💾 **FAISS vector store** for scalable embedding-based retrieval.
- 🧩 **Long-term memory** to log user interactions and improve responses.
- 🌐 **Streamlit UI** for clean and interactive chatbot deployment.

---

## 🧪 Example Interaction

```plaintext
👤 User: What are the symptoms of iron deficiency?
🩺 Bot: Common symptoms of iron deficiency include fatigue, pale skin, shortness of breath, and dizziness.
These symptoms result from reduced oxygen delivery to tissues due to low hemoglobin levels.


📁 Project Structure

healthcare-chatbot/
├── medical_documents/       # Input medical knowledge base (text files)
├── app.py                   # Streamlit-based chatbot frontend
├── agents/, tools/, config/ # Modular RAG components
├── faiss_medical_index/     # Saved FAISS vector index
├── requirements.txt         # Project dependencies
└── README.md


💡Technologies Used
Meta LLaMA 2–7B Chat HF
LangChain (retrieval, chains, compression)
FAISS (semantic search)
HuggingFace Transformers & Sentence Transformers
CrossEncoder Reranker (MS MARCO)
Streamlit (interactive UI)
PyTorch for efficient model loading
.env file support for safe API key management (recommended)


