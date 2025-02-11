from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from huggingface_hub import InferenceClient
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # 

app = Flask(__name__)
CORS(app)

# ✅ Hugging Face API Setup
API_KEY = "HF_apiKey"
MODEL_ID = "microsoft/Phi-3-mini-4k-instruct"
llm_client = InferenceClient(model=MODEL_ID, timeout=120)

# ✅ Add a Default Home Route
@app.route('/')
def home():
    return "Flask Server is Running! ✅"

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get('message')
        if not user_message:
            return jsonify({"error": "Message is required"}), 400

        # ✅ Send request to Hugging Face
        response = llm_client.chat_completion(
            messages=[{"role": "user", "content": user_message}], 
            max_tokens=200
        )

        return jsonify({"reply": response.choices[0].message.content}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)  # ✅ 







