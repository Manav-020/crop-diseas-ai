import tensorflow as tf
import numpy as np
from app.utils.preprocess import preprocess_image
from app.model.class_names import class_names

model = tf.keras.models.load_model("app/model/plant_disease_model.keras")

def predict_disease(file):

    image = preprocess_image(file)

    prediction = model.predict(image)

    # DEBUG PRINTS
    # print("Prediction vector:", prediction)
    # print("Prediction shape:", prediction.shape)
    # print("Predicted index:", np.argmax(prediction))

    index = np.argmax(prediction)
    confidence = float(np.max(prediction))

    disease = class_names[index]
    display_name = disease.replace("___"," ").replace("_"," ")
    return disease, display_name, confidence