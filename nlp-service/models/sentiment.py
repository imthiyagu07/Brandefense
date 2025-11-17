from transformers import pipeline

sentiment_model = pipeline("sentiment-analysis")

def analyze_sentiment(text: str):
    result = sentiment_model(text)[0]
    label = result["label"].lower()

    if label == "positive":
        return "positive"
    elif label == "negative":
        return "negative"
    else:
        return "neutral"