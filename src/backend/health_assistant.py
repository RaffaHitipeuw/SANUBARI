import os
from pathlib import Path
from groq import Groq
from dotenv import load_dotenv

load_dotenv(dotenv_path=Path(__file__).parent / ".env")

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

SYSTEM_PROMPT = """
Kamu adalah Sari, AI assistant kesehatan jantung yang ramah.

Jawab dalam Bahasa Indonesia.
Jawab singkat, jelas, dan mudah dipahami.
Fokus pada kesehatan jantung.
Selalu sarankan konsultasi dokter untuk diagnosis resmi.
"""

def chat_with_health_assistant(user_message, conversation_history):

    conversation_history.append({
        "role": "user",
        "content": user_message
    })

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            *conversation_history
        ],
        temperature=0.7,
        max_tokens=1024,
    )

    assistant_message = response.choices[0].message.content

    conversation_history.append({
        "role": "assistant",
        "content": assistant_message
    })

    return assistant_message, conversation_history