from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
import os
from email.message import EmailMessage
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "GLOWVAI backend running",
        "service": "email-subscription"
    })


@app.route("/subscribe", methods=["POST"])
def subscribe():
    data = request.get_json()
    user_email = data.get("email")

    if not user_email:
        return jsonify({"error": "Email is required"}), 400

    try:
        msg = EmailMessage()
        msg["Subject"] = "🚀 New GLOWVAI Early Access Signup"
        msg["From"] = EMAIL_USER
        msg["To"] = EMAIL_USER
        msg.set_content(
            f"""
New Early Access Signup 🚀

User Email: {user_email}

Product: GLOWVAI
"""
        )

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)

        return jsonify({"message": "Email sent successfully"}), 200

    except Exception as e:
        print("EMAIL ERROR:", e)
        return jsonify({"error": "Failed to send email"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
