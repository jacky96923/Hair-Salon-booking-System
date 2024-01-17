from sanic import Sanic
from sanic.response import json
import matplotlib.pyplot as plt
import tensorflow as tf
import numpy as np
import cv2
import os

class_list=['Heart','oblong','Oval','Round','Square']

app = Sanic("FaceShapeApp")

retrieved_model = tf.keras.saving.load_model("./weight/face-shape-detector-weight")

@app.route('/pyShape', methods=['POST'])
async def callModel(request):
    data = request.json
    print("data:", data)
    file_path =  data.get('image')
    print(file_path)
    

    img = cv2.imread(file_path)
    print("check:", img)
    if img is None:
        return json({"error": "Failed to read the image file"})
    # plt.imshow(img)
    # plt.show()
    img = cv2.resize(img, (200, 200))
    img = np.reshape(img, [1, 200, 200, 3])
    results = retrieved_model.predict(img)
    print(class_list[np.argmax(results)])
    predicted_class = class_list[np.argmax(results)]
    

    if __name__ == "__main__":
        app.run(host="0.0.0.0", port=8000, single_process=True)
    
    return json({"predicted_class": predicted_class})