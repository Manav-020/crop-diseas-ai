# 🌱 Crop Disease AI

An AI-powered crop disease detection and agricultural assistance platform that helps farmers and growers identify plant diseases from leaf images and receive treatment recommendations instantly.

## 🚀 Features

### 🔍 Plant Disease Detection

* Upload a crop leaf image
* Detect plant diseases using a deep learning model
* Confidence score for each prediction
* Support for multiple crop species and disease classes

### 💊 Disease Information

* Disease name identification
* Cause and symptoms
* Treatment recommendations
* Preventive measures

### 🤖 Crop Assistant Chatbot

* Agriculture-focused chatbot
* Answers crop and plant disease related questions
* Provides farming tips and treatment guidance
* Returns relevant agricultural resources and references

### 🖥 Modern User Interface

* Built with React + Vite
* Drag-and-drop image upload
* Responsive design
* Real-time prediction results

---

## 🏗 Tech Stack

### Frontend

* React
* Vite
* CSS3

### Backend

* FastAPI
* Python

### Machine Learning

* TensorFlow
* Keras
* EfficientNetB0 (Transfer Learning)

### Dataset

* New Plant Diseases Dataset (Augmented)
* Source: Kaggle

---

## 🧠 Model Architecture

The disease classification model uses:

* EfficientNetB0 pretrained on ImageNet
* Global Average Pooling
* Batch Normalization
* Dense Layer (256 neurons)
* Dropout Regularization
* Softmax Output Layer

### Training Configuration

| Parameter     | Value                           |
| ------------- | ------------------------------- |
| Image Size    | 224 × 224                       |
| Batch Size    | 8                               |
| Optimizer     | Adam                            |
| Learning Rate | 1e-4                            |
| Epochs        | 10                              |
| Loss Function | Sparse Categorical Crossentropy |

---

## 🌿 Supported Disease Classes

The model supports 38 plant disease categories across multiple crops including:

* Apple
* Blueberry
* Cherry
* Corn (Maize)
* Grape
* Orange
* Peach
* Bell Pepper
* Potato
* Raspberry
* Soybean
* Squash
* Strawberry
* Tomato

Examples:

* Tomato Early Blight
* Tomato Late Blight
* Tomato Leaf Mold
* Tomato Target Spot
* Tomato Mosaic Virus
* Potato Early Blight
* Potato Late Blight
* Apple Scab
* Corn Common Rust

---

## 📂 Project Structure

```text
crop-disease-ai/
│
├── backend/
│   ├── app/
│   │   ├── chatbot/
│   │   ├── data/
│   │   ├── model/
│   │   ├── utils/
│   │   ├── main.py
│   │   └── predict.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Manav-020/crop-diseas-ai.git
cd crop-diseas-ai
```

### Backend Setup

```bash
cd backend

python -m venv .crop

# Windows
.crop\Scripts\activate

pip install -r requirements.txt
```

Run FastAPI server:

```bash
uvicorn app.main:app --reload
```

Backend will run at:

```text
http://127.0.0.1:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

## 📸 Usage

1. Start backend server
2. Start frontend application
3. Upload a crop leaf image
4. Click **Analyze**
5. View:

   * Predicted disease
   * Confidence score
   * Treatment recommendation
   * Disease explanation
6. Use the Crop Assistant chatbot for additional guidance

---

## 🔮 Future Improvements

* Mobile application support
* Multilingual chatbot
* Weather-aware disease prediction
* Fertilizer recommendation system
* Farmer community integration
* Disease severity estimation

---

## 👨‍💻 Author

**Manav Patel**

Passionate about Machine Learning, Computer Vision, Agriculture Technology, and Full-Stack Development.

---

## 📜 License

This project is intended for educational and research purposes.
