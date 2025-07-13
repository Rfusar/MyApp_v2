import requests, json

with open("/home/riccardo/Scrivania/TestApp/TEST/DBTest/example.json") as f:
    EXAMPLE = json.load(f)

headers = { "Content-Type": "application/json" }

class Dbtest:
    def __init__(self):
        self.endpoint = EXAMPLE["mongo_url"]
        self.example = {
            "view": EXAMPLE["examples"]["view"],
            "insert": EXAMPLE["examples"]["insert"],
            "sys_colls": EXAMPLE["examples"]["sys_colls"],
        }

    def View(self) -> None:
        res = requests.post(
            url=self.endpoint+"/dbmyapp/b2b",
            headers=headers,
            json=self.example["view"]
        )
        print(res.text)

    def Insert(self) -> None:
        res = requests.post(
            url=self.endpoint,
            headers=headers,
            json=self.example["insert"]
        )
        print(res.text)

    def SYS_Collections(self) -> None:
        res = requests.post(
            url=self.endpoint+"/dbmyapp/system",
            headers=headers,
            json=self.example["sys_colls"]
        )
        print(res.text)
