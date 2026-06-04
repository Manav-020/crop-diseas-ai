from fastapi import UploadFile, HTTPException
from PIL import Image
from io import BytesIO

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
ALLOWED_TYPES = ["JPEG", "PNG"]

async def validate_image(file: UploadFile):

    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large (max 5MB)")

    try:
        image = Image.open(BytesIO(contents))

        if image.format not in ALLOWED_TYPES:
            raise HTTPException(status_code=400, detail="Only JPG and PNG allowed")

    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")

    file.file.seek(0)