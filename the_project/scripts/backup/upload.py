#!/usr/bin/env python3
import os
from datetime import date
import subprocess
from google.cloud import storage

URL = os.getenv("URL")
if not URL:
    raise ValueError("ERROR: URL env variable not set")

backup_file = "/backup.sql"
PG_DUMP = "/usr/bin/pg_dump"

print("[1/3] Running pg_dump...")
subprocess.run([PG_DUMP, URL, "-v", "-f", backup_file], check=True)

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/var/secrets/google/gcs-key.json"

print("[2/3] Uploading backup to GCS...")
client = storage.Client()
bucket = client.bucket("todo-app-backup")
blob = bucket.blob(f"backup-{date.today()}.sql")
blob.upload_from_filename(backup_file)

print("[3/3] Backup uploaded successfully!")
