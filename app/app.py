from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.llms.ollama import Ollama
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
from bson import ObjectId
from datetime import timedelta
import warnings

warnings.filterwarnings("ignore")

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)


# Configure the JWT
app.config['JWT_SECRET_KEY'] = 'MedicalChatbotProjectKMIT'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
jwt = JWTManager(app)


# Configure MongoDB
client = MongoClient('mongodb+srv://Anpur_Phani:Phani3115$@cluster0.ctbtkkq.mongodb.net/')
db = client['medical-chatbot']
db2 = client['conversations']
users_collection = db['users']
sessions_collection = db2['sessions']

def query_finetune(prompt: str):
    try:
        prompt = f"<|start_header_id|>system<|end_header_id|> Answer the question truthfully, you are a medical professional. If the question is not related to health or gibberish, reply that you are a medical professional and cannot answer it.<|eot_id|><|start_header_id|>user<|end_header_id|> This is the question: {prompt}<|eot_id|>"
        model = Ollama(model="medical-llama")
        response_text = model.invoke(prompt)
        print(response_text)
        return response_text
    except Exception as e:
        print(f"Error in query_rag: {e}")
        return f"Error processing request: {e}"
    
@app.route('/queryFineTune', methods=['POST'])
def queryFinetune():
    try:
        data = request.get_json()
        query_text = data.get('query_text')
        if not query_text:
            return jsonify({"error": "No query_text provided"}), 400
        
        print(f"Received query: {query_text}")
        response_text = query_finetune(query_text)
        return jsonify({"response": response_text})
    except Exception as e:
        print(f"Error in /query endpoint: {e}")
        return jsonify({"error": f"Error processing request: {e}"}), 500

@app.route('/userregister', methods=['POST'])
def user_register():
    data = request.get_json()
    user = data.get('user')

    if not user:
        return jsonify({"message": "No user data provided"}), 400

    name = user.get('name')
    email = user.get('email')
    password = user.get('password')

    if not (name and email and password):
        return jsonify({"message": "All fields are required"}), 400

    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        return jsonify({"message": "User Already Exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    new_user = {
        "name": name,
        "email": email,
        "password": hashed_password
    }

    users_collection.insert_one(new_user)
    
    access_token = create_access_token(identity={"email": email})
    new_user["_id"] = str(new_user["_id"]) 

    return jsonify({"message": "Registered Successfully", "user": new_user, "access_token": access_token}), 201

@app.route('/userlogin', methods=['POST'])
def user_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not (email and password):
        return jsonify({"message": "Email and password are required"}), 400

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "User Not Registered"}), 400

   
    if not bcrypt.check_password_hash(user['password'], password):
        return jsonify({"message": "Invalid Credentials"}), 400

    access_token = create_access_token(identity={"email": email})

    return jsonify({
        "message": "Login Successful",
        "access_token": access_token,
        "name": user['name'],
        "email": user['email']
    }), 200

@app.route('/saveSession', methods=['POST'])
def save_session():
    data = request.json
    email = data.get('email')
    session_name = data.get('sessionName')
    messages = data.get('messages')
    
    if not email or not session_name or not messages:
        return jsonify({"error": "Invalid input"}), 400

    user = sessions_collection.find_one({"email": email})

    if user:
        sessions_collection.update_one(
            {"email": email},
            {"$push": {"sessions": {"sessionName": session_name, "messages": messages}}}
        )
    else:
        sessions_collection.insert_one({
            "email": email,
            "sessions": [{"sessionName": session_name, "messages": messages}]
        })

    return jsonify({"status": "success"})

@app.route('/getSessions', methods=['POST'])
def get_sessions():
    data = request.json
    email = data.get('email')
    
    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = sessions_collection.find_one({"email": email})
    
    if user:
        return jsonify({"sessions": user.get('sessions', [])}), 200
    
    return jsonify({"sessions": []}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
