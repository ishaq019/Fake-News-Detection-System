# Fake News Detection System 📰🚫

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Streamlit](https://img.shields.io/badge/Streamlit-App-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white)](https://streamlit.io/)
[![Scikit-Learn](https://img.shields.io/badge/scikit--learn-ML-orange?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)

An end-to-end **Natural Language Processing (NLP)** project designed to classify news articles as **Reliable** or **Unreliable**. This system utilizes a **Decision Tree Classifier** trained on a dataset of over 20,000 news articles, achieving an accuracy of **88%**. The project features a user-friendly web interface built with **Streamlit** for real-time predictions.

---

## 🚀 Features

* **Real-Time Detection:** Instant classification of news text as "Reliable" or "Unreliable" via a web GUI.
* **Advanced Text Preprocessing:** Implements **Porter Stemming**, stop-word removal, and Regex cleaning to refine raw text data.
* **Robust Vectorization:** Uses **TF-IDF (Term Frequency-Inverse Document Frequency)** to transform text into meaningful numerical features.
* **High Accuracy:** Trained on the Kaggle Fake News dataset using a Decision Tree algorithm, validated with an 80/20 train-test split.
* **Model Persistence:** Uses **Pickle** for efficient model serialization and loading.

---

## 🛠️ Tech Stack

* **Language:** Python
* **Machine Learning:** Scikit-Learn (Decision Tree Classifier, TF-IDF Vectorizer)
* **Data Processing:** Pandas, NumPy
* **NLP:** NLTK (Natural Language Toolkit), Re (Regular Expressions)
* **Web Framework:** Streamlit
* **Deployment/Serialization:** Pickle

---

## 📂 Project Structure

```bash
Fake-News-Detection-System/
├── dataset/
│   ├── train.csv          # Training dataset
│   └── test.csv           # Testing dataset
├── Model_Training.ipynb   # Jupyter Notebook for Data Cleaning, Preprocessing & Training
├── app.py                 # Main Streamlit application file
├── model.pkl              # Serialized Machine Learning Model
├── vector.pkl             # Serialized TF-IDF Vectorizer
├── requirements.txt       # List of dependencies
└── README.md              # Project Documentation

```

---

## ⚙️ Installation & Usage

### 1. Clone the Repository

```bash
git clone [https://github.com/ishaq019/Fake-News-Detection-System.git](https://github.com/ishaq019/Fake-News-Detection-System.git)
cd Fake-News-Detection-System

```

### 2. Create a Virtual Environment (Optional but Recommended)

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

```

### 3. Install Dependencies

```bash
pip install -r requirements.txt

```

*If you don't have a requirements file yet, install manually:*

```bash
pip install pandas numpy scikit-learn nltk streamlit

```

### 4. Run the Application

```bash
streamlit run app.py

```

### 5. Access the Web App

The application will automatically open in your browser at `http://localhost:8501`.

---

## 📊 Model Performance

* **Algorithm:** Decision Tree Classifier
* **Vectorization:** TF-IDF
* **Accuracy:** **88%** on Test Data
* **Split Strategy:** 80% Training / 20% Testing

---

## 📸 Screenshots

*(Add screenshots of your project here to make it visually appealing)*

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving the model accuracy or UI, feel free to fork the repo and create a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Contact

**Syed Ishaq** * **GitHub:** [ishaq019](https://www.google.com/search?q=https://github.com/ishaq019)

* **LinkedIn:** [Connect with me](https://www.linkedin.com/in/s-ishaq/)

---

*This project is for educational purposes and is based on the Kaggle Fake News dataset.*

```

```
