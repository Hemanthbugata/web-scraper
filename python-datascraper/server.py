from flask import Flask, jsonify
import json
import os

app = Flask(__name__)

@app.route("/")
def home():
    json_path = os.path.join(os.path.dirname(__file__), '..', 'node-scraper', 'data.json')
    json_path = os.path.abspath(json_path)

    try:
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": f"{json_path} not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON format"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
