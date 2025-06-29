
# 🩺 MediQuery: AI Healthcare Chatbot

An advanced conversational healthcare assistant built with a powerful Large Language Model, enhanced with real-time web search for Retrieval-Augmented Generation (RAG). This chatbot provides medically relevant, instruction-following responses grounded in verifiable, up-to-date sources.

---

## 🚀 Features

-   🧠 **Instruction-Tuned AI Core**: Utilizes a sophisticated large language model fine-tuned with specific system instructions to ensure accurate, safe, and coherent responses in the healthcare domain.
-   🌐 **Dynamic RAG Pipeline**: Employs a real-time Retrieval-Augmented Generation (RAG) pipeline using live web search. This grounds answers in the latest information, ensuring responses are verifiable and up-to-date.
-   🔗 **Source Citation**: Automatically cites sources for its generated answers, providing users with links to the web pages used to formulate the response, enhancing trust and transparency.
-   💬 **Conversational Memory**: Maintains context across turns in a single session, allowing for natural, follow-up conversations.
-   🛡️ **Built-in Safety Guardrails**: Includes a critical disclaimer in its instructions, reminding users that it is an AI assistant and not a substitute for professional medical advice.
-   ✨ **Modern & Responsive UI**: A clean, interactive, and fully responsive user interface built with React and Tailwind CSS, offering a seamless experience on any device.
-   ⚙️ **Secure API Key Handling**: Designed to securely use an API key from environment variables, preventing exposure on the client-side. The UI gracefully handles a missing key by disabling input.

---

## 🧪 Example Interaction

```plaintext
👤 User: What are the symptoms of iron deficiency?

🩺 Bot: Common symptoms of iron deficiency include fatigue, pale skin, shortness of breath, and dizziness. These symptoms result from reduced oxygen delivery to tissues due to low hemoglobin levels. 

Please remember, I am an AI assistant and not a medical professional. Always consult with a qualified healthcare professional for any medical advice or diagnosis.

Sources:
1. Iron-Deficiency Anemia - mayoclinic.org
2. Iron Deficiency Anemia - National Heart, Lung, and Blood Institute (NHLBI)
```

---

## 💡 Technology Stack

-   **Frontend**: React, TypeScript, Tailwind CSS
-   **AI & Backend**: Powered by a state-of-the-art Large Language Model with integrated web search capabilities.
-   **Core Libraries**: `@google/genai` (as the client for the LLM), React Hooks for state management.

---

## 📁 Project Structure

```
.
├── index.html          # Main HTML entry point with Tailwind CSS
├── index.tsx           # React application root
├── App.tsx             # Main application layout component
├── metadata.json       # Application metadata
├── README.md           # This readme file
├── types.ts            # Shared TypeScript type definitions (Message, Source)
└── components/
    ├── Chat.tsx        # Core chat UI, state management, and API logic
    └── Icons.tsx       # Reusable SVG icon components for the UI
```

---

## 🛠️ Setup and Usage

To run this application, you must provide an API key for the underlying AI service.

1.  **Obtain an API Key** from the AI service provider.
2.  **Set Environment Variable**: This key must be set as an environment variable named `API_KEY` in your deployment environment.
3.  **Run the Application**: Once the `API_KEY` is configured, the application will be fully functional.

The application is designed to not function without this key to ensure security and proper operation. An error message will be displayed in the UI if the key is not detected.
