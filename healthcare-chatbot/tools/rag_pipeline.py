from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.llms import HuggingFaceHub
import os
from pathlib import Path

def load_documents(directory):
    docs = []
    for file in Path(directory).glob("*.txt"):
        loader = TextLoader(str(file))
        docs.extend(loader.load())
    return docs

def get_rag_chain():
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
    doc_dir = "medical_documents"
    index_path = "faiss_medical_index"

    if not os.path.exists(index_path):
        docs = load_documents(doc_dir)
        splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
        split_docs = splitter.split_documents(docs)
        db = FAISS.from_documents(split_docs, embeddings)
        db.save_local(index_path)
    else:
        db = FAISS.load_local(index_path, embeddings)

    llm = HuggingFaceHub(
        repo_id="meta-llama/Llama-2-7b-chat-hf",
        model_kwargs={"temperature": 0.5, "max_length": 512},
    )

    retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 5})
    return RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
