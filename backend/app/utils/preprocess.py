from PIL import Image
import numpy as np

IMG_SIZE = (224,224)   # match training

def preprocess_image(file):

    image = Image.open(file).convert("RGB")
    image = image.resize(IMG_SIZE)

    img_array = np.array(image)

    img_array = np.expand_dims(img_array, axis=0)

    return img_array
