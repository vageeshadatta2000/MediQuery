# Project: Instruction-Tuned Healthcare Chatbot with RAG using LLaMA 2–7B

# Phase 1: Imports and Setup
import streamlit as st
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import ConversationalRetrievalChain
from langchain.llms import HuggingFacePipeline
from langchain.schema import Document
from langchain.memory import ConversationBufferMemory
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import CrossEncoderReranker
import torch
import os

# Phase 2: Load and Preprocess Medical Corpus
documents_path = "./medical_documents/"
documents = []
for filename in os.listdir(documents_path):
    with open(os.path.join(documents_path, filename), 'r') as f:
        content = f.read()
        documents.append(Document(page_content=content, metadata={"source": filename}))

text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
split_docs = text_splitter.split_documents(documents)

# Phase 3: Dense Embedding and Vector Store
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
faiss_index = FAISS.from_documents(split_docs, embedding_model)
faiss_index.save_local("faiss_medical_index")

# Phase 4: Load Instruction-Tuned LLaMA 2–7B (Assumes it's already fine-tuned)
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-chat-hf")
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-chat-hf",
    torch_dtype=torch.float16,
    device_map="auto"
)

pipe = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=512,
    temperature=0.3,
    do_sample=True,
    top_p=0.95,
    return_full_text=False
)
llm = HuggingFacePipeline(pipeline=pipe)

# Phase 5: Setup RAG Pipeline with Conversational Memory, Reranking, and Compression
retriever = faiss_index.as_retriever(search_kwargs={"k": 8})
reranker = CrossEncoderReranker(model_name="cross-encoder/ms-marco-MiniLM-L-6-v2")
compression_retriever = ContextualCompressionRetriever(
    base_compressor=reranker,
    base_retriever=retriever
)

# Long-term memory using separate retriever (can be saved and extended)
long_term_memory = FAISS.from_documents([], embedding_model)
long_term_retriever = long_term_memory.as_retriever(search_kwargs={"k": 2})

# Conversational Memory
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

rag_conversational_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=compression_retriever,
    memory=memory,
    return_source_documents=True
)

# Phase 6: Streamlit App Interface
st.set_page_config(page_title="Healthcare Chatbot", page_icon="🩺", layout="centered")
st.title("🩺 Healthcare Chatbot")
st.markdown("""
This chatbot uses **LLaMA 2–7B**, dense retrieval, reranking, and memory for context-aware, medically grounded responses.
""")

if "history" not in st.session_state:
    st.session_state.history = []

user_query = st.text_input("Ask a medical question:", "")

if st.button("Submit") and user_query:
    response = rag_conversational_chain({"question": user_query})
    answer = response['answer']
    sources = [doc.metadata.get('source', 'N/A') for doc in response['source_documents']]

    st.session_state.history.append((user_query, answer, sources))

    # Add to long-term memory
    user_doc = Document(page_content=f"User: {user_query}\nBot: {answer}")
    long_term_memory.add_documents([user_doc])

# Display chat-like interface
for i, (q, a, sources) in enumerate(reversed(st.session_state.history)):
    st.markdown(f"**👤 You:** {q}")
    with st.chat_message("🩺 Bot"):
        st.markdown(f"**Response:**\n{a}")
        with st.expander("Sources"):
            for src in sources:
                st.write(f"- {src}")

        # Feedback section
        st.markdown("**Was this helpful?**")
        cols = st.columns(3)
        with cols[0]:
            if st.button("👍", key=f"up_{i}"):
                st.success("Thanks for the feedback!")
        with cols[1]:
            if st.button("👎", key=f"down_{i}"):
                st.warning("We'll work on improving.")
        with cols[2]:
            feedback = st.text_input("Optional comments:", key=f"fb_{i}")

st.markdown("---")
st.markdown("_Built with LangChain, HuggingFace, and Streamlit_ ✨")
