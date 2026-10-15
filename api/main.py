from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

@app.get("/")
async def test():
    return { "message" : "testowy endpoint"}

app.mount("/cv", StaticFiles(directory="../static", html=True), name="static")