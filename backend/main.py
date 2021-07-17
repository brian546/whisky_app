from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import pathlib, os, json, pickle
import pandas as pd
from PIL import Image
from lemmaTokenizer import LemmaTokenizer
from review_wordcloud import print_word_cloud
import matplotlib.pyplot as plt
from recommend_whisky import recommend, recommend_vector
from whisky_classifier import classifier
from flask_cors import CORS
from chart import price_chart
import asyncio
import time

app = Flask(__name__)
CORS(app)

df = pd.read_csv("./dataset/top100_whisky.csv")


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/searchImage", methods=['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
        img_file = request.files['image']
        # Read the image via file.stream
        index = classifier(img_file.stream)
        df = pd.read_csv("./dataset/top100_whisky.csv")
        name = df["Name"].iloc[index]
        year = df["Year"].iloc[index]

        return jsonify({'index': index,
                        'name': name + " " + year + "-year-old"})
        
@app.route("/whisky/<int:whiskyId>")
def getData(whiskyId):
    print(f"started at {time.strftime('%X')}")
    df = pd.read_csv("./dataset/top100_whisky.csv")
    new_df = df[["Name","Year"]].iloc[whiskyId].to_dict()
    recommend_data = recommend(whiskyId)
    wordcloud = print_word_cloud(whiskyId)
    price_img, price_table = price_chart(whiskyId)
    
    # recommend_data, wordcloud, [price_img, price_table] = await asyncio.gather(
    #     recommend(whiskyId),
    #     print_word_cloud(whiskyId),
    #     price_chart(whiskyId)
    # )
    
    print(f"finished at {time.strftime('%X')}")
    
    price_table = price_table.to_dict(orient="index")

    
    return jsonify({
        "info": new_df,
        "recommend": recommend_data,
        "wordcloud": wordcloud,
        "price_img": price_img,
        "price_table": price_table
    })

