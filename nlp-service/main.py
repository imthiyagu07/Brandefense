from fastapi import FastAPI
from pydantic import BaseModel
from models.sentiment import analyze_sentiment
from models.embedder import get_embedding
from sklearn.cluster import KMeans

app = FastAPI()

class TextRequest(BaseModel):
    text: str 

class BatchRequest(BaseModel):
    texts: list[str]

@app.post("/sentiment")
def sentiment_api(data: TextRequest):
    label = analyze_sentiment(data.text)
    return {"sentiment": label}

@app.post("/embed")
def embed_api(data: TextRequest):
    vector = get_embedding(data.text)
    return {"embedding": vector}

@app.post("/cluster")
def cluster_api(data: BatchRequest):
    vectors = [get_embedding(t) for t in data.texts]
    kmeans = KMeans(n_clusters=3, random_state=42)
    labels = kmeans.fit_predict(vectors)
    return {"clusters": labels.tolist()}