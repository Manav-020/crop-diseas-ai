# main.py
from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.predict import predict_disease
from app.disease_info import disease_data
from app.utils.validation import validate_image
from app.chatbot.chatbot import get_response

app = FastAPI()

# ─── CORS ────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CONFIDENCE_THRESHOLD = 0.6


# ─── Schemas ─────────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str


# ─── Root ────────────────────────────────────────────────────────
@app.get("/")
def home():
    return {"message": "🌱 CropScan AI — API Running"}


# ─── Chatbot Endpoint ─────────────────────────────────────────────
# NOTE: endpoint is /chatbot to match the React frontend fetch call
@app.post("/chatbot")
def chatbot(request: ChatRequest):
    response = get_response(request.message)
    return {
        "user_message": request.message,
        "bot_response": response
    }


# ─── Disease Prediction Endpoint ──────────────────────────────────
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        await validate_image(file)

        disease, display_name, confidence = predict_disease(file.file)

        # Prepare disease info (fallback when not found)
        info = disease_data.get(disease, {
            "solution": "Information not available.",
            "reason": "Information not available."
        })
        print("Disease:", disease)
        print("Disease data:", disease_data.get(disease))

        low_confidence = confidence < CONFIDENCE_THRESHOLD

        # Include a helpful message when confidence is low, but still return
        # the predicted disease and the associated info so the frontend can
        # display reason/solution even for uncertain predictions.
        response = {
            "disease": display_name,
            "confidence": round(confidence * 100, 2),
            "solution": info["solution"],
            "reason": info["reason"],
            "low_confidence": low_confidence
        }

        if low_confidence:
            response["message"] = "⚠️ Low confidence — result may be unreliable."

        return response

    except Exception as e:
        return {"error": str(e)}
