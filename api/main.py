from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from PIL import Image, ImageOps, UnidentifiedImageError
from pathlib import Path
from io import BytesIO
from starlette.concurrency import run_in_threadpool

import os, uuid, json

pictureDir = Path("./saved/pics")

class UserInfo(BaseModel):
    title : str

    name : str
    phone : str
    birthday : str

    education : str
    school : str

    about : str
    experience : str

    linkedin : str
    github : str

class Title(BaseModel):
    title : str

app = FastAPI()

def process_profile_image(content: bytes) -> str:
    with Image.open(BytesIO(content)) as original:
        img = ImageOps.exif_transpose(original)

        img = ImageOps.fit(img, (300, 300), method=Image.Resampling.LANCZOS)

        if img.mode in ("RGBA", "LA", "P"):
            img = img.convert("RGB")

        filename = f"{uuid.uuid4().hex}.jpg"
        filepath = pictureDir / filename

        pictureDir.mkdir(parents=True, exist_ok=True)

        img.save(filepath, "JPEG", quality=85, optimize=True)

    return filename

@app.get("/")
async def test():
    return { "message" : "testowy endpoint"}

@app.post("/uploadNewPic")
async def uploadPic(picture: UploadFile = File(...), project: str = Form(...)):
    content = await picture.read()
    if not content:
        raise HTTPException(status_code=400, detail="No image was uploaded")

    try:
        newFileName = await run_in_threadpool(process_profile_image, content)
    except (UnidentifiedImageError, OSError) as exc:
        raise HTTPException(status_code=400, detail="Uploaded file is not a valid image") from exc

    projectFile = Path("./saved/projects") / f"{project}.json"
    if projectFile.exists():
        with projectFile.open("r", encoding="utf-8") as file:
            data = json.load(file)
    else:
        data = {}

    data["picture"] = newFileName
    with projectFile.open("w", encoding="utf-8") as file:
        json.dump(data, file)

    return {"picture": newFileName}

@app.post("/saveInfo") #zapisuje nowy lub nadpisuje istniejacy projekt o nazwie title
async def info(userInfo : UserInfo):
    projectFile = Path("./saved/projects") / f"{userInfo.title}.json"
    data = {
        "name" : userInfo.name,
        "phone" : userInfo.phone,
        "birthday" : userInfo.birthday,
        "education" : userInfo.education,
        "school" : userInfo.school,
        "about" : userInfo.about,
        "experience" : userInfo.experience,
        "github" : userInfo.github,
        "linkedin" : userInfo.linkedin
    }

    if projectFile.exists():
        with projectFile.open("r", encoding="utf-8") as file:
            previousData = json.load(file)
        if "picture" in previousData:
            data["picture"] = previousData["picture"]

    with projectFile.open("w", encoding="utf-8") as file:
        json.dump(data, file)
    return "Saved your data"

@app.post("/getInfo") #bierze informacje z danego projektu
async def getInfo(title : Title):
    with open("./saved/projects/" + title.title + ".json", "r") as file:
        data = json.load(file)
        return data

@app.post("/getSaved") #zwraca liste juz zapisanych projektow
async def getSaved():
    files = os.listdir("./saved/projects")
    for i in range(len(files)):
        files[i] = files[i][:-5]
    return files

app.mount("/pictures", StaticFiles(directory=pictureDir), name="pictures")
app.mount("/cv", StaticFiles(directory="../static", html=True), name="static")