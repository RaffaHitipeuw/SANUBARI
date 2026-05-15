from flask import Flask, request, jsonify
from flask_cors import CORS

from health_assistant import chat_with_health_assistant

app = Flask(__name__)
CORS(app)

conversation_history = []

@app.route("/chat", methods=["POST"])
def chat():

    global conversation_history

    data = request.json
    user_message = data.get("message")

    if not user_message:
        return jsonify({
            "error": "Message kosong"
        }), 400

    try:

        response, conversation_history = chat_with_health_assistant(
            user_message,
            conversation_history
        )

        return jsonify({
            "response": response
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True)