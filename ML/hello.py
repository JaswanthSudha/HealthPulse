from flask import Flask,request,jsonify
from model import model
import tensorflow as tf

app = Flask(__name__)
@app.route("/")
def home():
    return "<h1>Home</h1>"

@app.route("/getReport",methods=["POST"])
def model_perform():
    data=request.get_json()
    print(data)
    value=model(data["location"])
    response={
        "report":value
    }
    return jsonify(response)
if __name__=="__main__":
    app.run(debug=False,host='0.0.0.0')