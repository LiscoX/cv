from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import json
import os

class UserInfo(BaseModel):
    title : str

    name : str
    birthday : str

    education : str
    school : str

    about : str
    experience : str

class Title(BaseModel):
    title : str

app = FastAPI()

@app.get("/")
async def test():
    return { "message" : "testowy endpoint"}

@app.post("/saveInfo") #zapisuje nowy lub nadpisuje istniejacy projekt o nazwie title
async def info(userInfo : UserInfo):
    with open("./saved/" + userInfo.title + ".json", "w") as file:
        data = {
            "name" : userInfo.name,
            "birthday" : userInfo.birthday,
            "education" : userInfo.education,
            "school" : userInfo.school,
            "about" : userInfo.about,
            "experience" : userInfo.experience
        }
        json.dump(data, file)
    return "Saved your data"

@app.post("/getInfo") #bierze informacje z danego projektu
async def getInfo(title : Title):
    with open("./saved/" + title.title + ".json", "r") as file:
        data = json.load(file)
        return data

@app.post("/getSaved") #zwraca liste juz zapisanych projektow
async def getSaved():
    files = os.listdir("./saved")
    for i in range(len(files)):
        files[i] = files[i][:-5]
    return files

app.mount("/cv", StaticFiles(directory="../static", html=True), name="static")