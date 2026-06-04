import json
from pathlib import Path

data_path = Path("app/data/disease_database.json")

with open(data_path, "r") as f:
    disease_data = json.load(f)