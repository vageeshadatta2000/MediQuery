from tools.rag_pipeline import get_rag_chain

class MedicalChatAgent:
    def __init__(self):
        self.rag_chain = get_rag_chain()

    def answer(self, query):
        return self.rag_chain.run(query)
