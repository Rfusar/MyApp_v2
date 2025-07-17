from pdf2image import convert_from_path
import easyocr
from PIL import Image
import numpy as np
import json, glob, os, re
from datetime import datetime as dt

# Carica configurazione di sistema
with open("config/system.json") as f:
    config = json.load(f)

# Carica modello di classificazione
with open("config/models/fatture.json") as f:
    model = json.load(f)

class Doc:
    def __init__(self):
        self.config = {
            "dpi": config["system"]["dpi"],
            "MinConfidance": config["system"]["MinConfidance"]
        }
        self.folders = config["folders"]
        
        for name, path in self.folders.items():
            if name != "input":
                os.makedirs(path, exist_ok=True)
            else:
                if not os.path.exists(path):
                    print("Devi creare la cartella di input con i file PDF, nella stessa cartella dell'eseguibile")



    def ocr(self, filepath: str):
        reader = easyocr.Reader(['it', 'en'])
        img_np = None
    
        try:
            if filepath.lower().endswith(".pdf"):
                pages = convert_from_path(filepath, dpi=self.config["dpi"])
                img_np = np.array(pages[0])
            else:
                img = Image.open(filepath)
                img = img.convert("RGB")  # forza RGB se in scala di grigi o CMYK
                img_np = np.array(img)
        except Exception as e:
            self.Log(f"[ERROR] File non leggibile: {filepath} -> {e}")
            return []
    
        return reader.readtext(img_np)
    
    def Log(self, content: str) -> None:
        filelog, timelog = dt.now().strftime("%Y_%m_%d___%H:%M:%S").split("___")
        log_path = os.path.join(self.folders["log"], f"{filelog}.txt")
        with open(log_path, "a+") as f:
            f.write("[" + timelog + "] " + content + "\n")


class Tari(Doc):
    def __init__(self):
        super().__init__()
        self.model = model

    def classify_row(self, row_text: str):
        result = {}
        for key, patterns in self.model.items():
            for pattern in patterns:
                if pattern["type"] == "regex":
                    match = re.search(pattern["regex"], row_text, re.IGNORECASE)
                    if match:
                        result[key] = match.group(0)
                        break
        return result


# Esecuzione principale
MyDocument = Tari()

for filepath in glob.glob(os.path.join(MyDocument.folders["input"], "*")):
    results = MyDocument.ocr(filepath)
    
    for bbox, text, conf in results:
        if conf >= MyDocument.config["MinConfidance"]:
            matches = MyDocument.classify_row(text)
            log = (
                "############ NEW ROW ###########\n"
                f"File: {os.path.basename(filepath)}\n"
                f"Confidence: {conf:.2f}\n"
                f"Coordinate X: {bbox[0][0]}, Y: {bbox[0][1]}\n"
                "Text: ````````\n"
                f"{text}\n"
                "````````\n"
            )
            if matches:
                log += "Classificazioni:\n"
                for k, v in matches.items():
                    log += f" - {k}: {v}\n"

            MyDocument.Log(log + "\n")
