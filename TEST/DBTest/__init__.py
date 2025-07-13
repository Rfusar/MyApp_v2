import requests, json

with open("/home/riccardo/Scrivania/TestApp/TEST/DBTest/example.json") as f:
    EXAMPLE = json.load(f)


headers = { "Content-Type": "application/json" }

def SAVE(content):
    with open("result.json", "wb") as f:
        f.write(content)


class Dbtest:
    def __init__(self):
        self.endpoint = EXAMPLE["mongo_url"]
        self.example = {
            "view": EXAMPLE["examples"]["view"],
            "insert": EXAMPLE["examples"]["insert"],
            "sys_colls": EXAMPLE["examples"]["sys_colls"],
        }

    def View(self, save:bool) -> None:
        res = requests.post(
            url=self.endpoint+"/dbmyapp/b2b",
            headers=headers,
            json=self.example["view"]
        )
        SAVE(res.content) if save else print(res.text)

    def Insert(self, save:bool) -> None:
        res = requests.post(
            url=self.endpoint+"/dbmyapp/b2b",
            headers=headers,
            json=self.example["insert"]
        )
        SAVE(res.content) if save else print(res.text)

    def SYS_Collections(self, save:bool) -> None:
        res = requests.post(
            url=self.endpoint+"/dbmyapp/system",
            headers=headers,
            json=self.example["sys_colls"]
        )
        SAVE(res.content) if save else print(res.text)
