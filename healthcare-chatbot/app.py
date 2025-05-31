import streamlit as st
from dotenv import load_dotenv
import os
from agents.chat_agent import MedicalChatAgent

load_dotenv()

st.set_page_config(page_title="Healthcare Chatbot", layout="wide")
st.title("🩺 Healthcare Chatbot")

agent = MedicalChatAgent()

if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

user_input = st.text_input("👤 Ask a medical question")

if user_input:
    st.session_state.chat_history.append(("user", user_input))
    with st.spinner("Thinking..."):
        response = agent.answer(user_input)
    st.session_state.chat_history.append(("bot", response))

for role, msg in st.session_state.chat_history:
    st.markdown(f"**{'👤' if role == 'user' else '🩺'} {msg}**")
