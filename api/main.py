from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

class UserInfo(BaseModel):
    name : str
    age : str

app = FastAPI()

@app.get("/")
async def test():
    return { "message" : "testowy endpoint"}

@app.post("/info")
async def info(userInfo : UserInfo):
    return (userInfo.name + ", lat: " + userInfo.age)

app.mount("/cv", StaticFiles(directory="../static", html=True), name="static")