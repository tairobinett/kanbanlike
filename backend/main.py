from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import time
import os

app = Flask(__name__)
CORS(app)

@app.route("/hello")
def hello_world(): 
    return "<p>Hello World!</p>"