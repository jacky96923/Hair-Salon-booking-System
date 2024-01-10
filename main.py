from sanic import Sanic
from sanic.response import json
import matplotlib.pyplot as plt
import tensorflow as tf
import numpy as np
import cv2
import os

class_list=['heart','oblong','oval','round','square']

app = Sanic("FaceShapeApp")

retrieved_model = tf.keras.saving.load_model("./weight/face-shape-detector-weight")

@app.route('/upload', methods=['POST'])
async def callModel(request):
    data = request.json
    print(data)
    file_path = data.get('image')

    img = cv2.imread(file_path)
    plt.imshow(img)
    plt.show()
    img = cv2.resize(img, (200, 200))
    img = np.reshape(img, [1, 200, 200, 3])
    results = retrieved_model.predict(img)
    print(np.argmax(results), class_list[np.argmax(results)])

    if __name__ == "__main__":
        app.run(host="0.0.0.0", port=8000, single_process=True)