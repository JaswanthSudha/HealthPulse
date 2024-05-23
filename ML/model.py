import os
import cv2
import numpy as np
from sklearn.model_selection import train_test_split
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers



# Function to load and preprocess images from a directory
def load_images_from_directory(directory, label):
    if not os.path.exists(directory):
        print(f"Directory {directory} does not exist.")
        return [], []

    dir_images = []
    dir_labels = []

    for filename in os.listdir(directory):
        image_path = os.path.join(directory, filename)
        img = cv2.imread(image_path)
        if img is not None:
            img = cv2.resize(img, (64, 64))  # Resize to a common size
            img = img / 255.0  # Normalize pixel values to [0, 1]
            dir_images.append(img)
            dir_labels.append(label)
        else:
            print(f"Error reading image {image_path}")

    return dir_images, dir_labels
def model(location):
    mod_mal_dir = "training/mod mal" 
    no_mal_dir = "training/no mal"
    sev_mal_dir = "training/sev mal"
    label_to_int = {'mod mal': 0, 'no mal': 1, 'Sev mal': 2}

    images = []
    labels = []
    # Load images from each directory
    mod_mal_images, mod_mal_labels = load_images_from_directory(mod_mal_dir, label_to_int['mod mal'])
    no_mal_images, no_mal_labels = load_images_from_directory(no_mal_dir , label_to_int['no mal'])
    sev_mal_images, sev_mal_labels = load_images_from_directory(sev_mal_dir, label_to_int['Sev mal'])

    # Combine all images and labels
    images = np.array(mod_mal_images + no_mal_images + sev_mal_images)
    labels = np.array(mod_mal_labels + no_mal_labels + sev_mal_labels)

    # Ensure that we have loaded images and labels
    if images.size == 0 or labels.size == 0:
        raise ValueError("No images or labels loaded. Check your dataset paths and contents.")

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(images, labels, test_size=0.2, random_state=42)

    # Define the model
    model = keras.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dense(3, activation='softmax')
    ])

    # Compile the model
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    # Train the model
    model.fit(X_train, y_train, epochs=10, batch_size=32, validation_data=(X_test, y_test))

    # Evaluate the model
    test_loss, test_accuracy = model.evaluate(X_test, y_test)
    print(f"Test accuracy: {test_accuracy}")

    # Replace with the path to your uploaded image
    image_path = f"../{location}"

    # Preprocess the input image
    img = cv2.imread(image_path)
    if img is not None:
        img = cv2.resize(img, (64, 64))
        img = img / 255.0
        input_data = np.array([img])

        # Make a prediction
        predictions = model.predict(input_data)
        predicted_class = np.argmax(predictions)
        model.save("model.h5")
        print(predicted_class)
        if predicted_class == 0:
           return "Moderate Malnourished"
        elif predicted_class == 1:
            return "Not Malnourished"
        else:
            return "Severely Malnourished"
    else:
        return "Error: Image not found or could not be read."
if __name__=="__main":
    pass