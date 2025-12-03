FROM python:3.12-slim

RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache google-cloud-storage

COPY upload.py /upload.py
CMD ["python", "/upload.py"]
