# MediQuery

> An AI-powered health information assistant.

MediQuery is a sophisticated conversational AI designed to provide clear, sourced information on medical topics, symptoms, and wellness. It features a clean, responsive interface that feels like chatting with a medical expert, ensuring users can get information quickly and intuitively.

---

### 🚨 Important Disclaimer

**MediQuery is an AI assistant, not a medical professional.** The information provided is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

---

## Features

*   **Conversational Interface:** An intuitive chat-based UI for asking health-related questions.
*   **Sourced Information:** Answers are grounded in up-to-date information from web sources, which are cited directly in the chat.
*   **Comprehensive Topics:** Get information on conditions, symptoms, treatments, medications, and general wellness.
*   **Safety First:** The AI is designed with safety as a priority, including a mandatory disclaimer on all responses.
*   **Responsive Design:** A clean, modern, and fully responsive layout that works beautifully on desktop and mobile devices.
*   **Clear Guidance:** An info panel clearly outlines the assistant's capabilities and limitations.

## Tech Stack

*   **Frontend:** [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **AI:** Powered by a powerful large-scale conversational AI model.
*   **Data Retrieval:** Utilizes a built-in web search capability to provide up-to-date, Retrieval-Augmented Generation (RAG) responses.

## Getting Started

This project is a client-side application built without a complex build setup. It can be run locally with a simple web server.

### Prerequisites

*   A modern web browser.
*   A way to serve static files. If you have Node.js installed, you can use `serve`.

### Configuration

The application requires an API key from the AI service provider to function.

1.  **Obtain an API Key:** Get an API key from the provider that powers the underlying language model.
2.  **Set Environment Variable:** The application's code expects the key to be available as an environment variable named `API_KEY`. You must configure this in the environment where you deploy or run the application. Without this key, the chat interface will be disabled.

### Running Locally

1.  **Download the Files:** Place all the project files (`index.html`, `index.tsx`, `components/`, etc.) into a single directory on your computer.

2.  **Start a Local Server:** Open your terminal, navigate to the project directory, and run one of the following commands:

    *   **Using the Node.js `serve` package:**
        ```bash
        npx serve
        ```

    *   **Using Python:**
        ```bash
        # For Python 3
        python3 -m http.server
        ```

3.  **Open in Browser:** The command will output a local URL (e.g., `http://localhost:3000` or `http://localhost:8000`). Open this URL in your web browser to use MediQuery.
