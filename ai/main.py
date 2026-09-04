from fastapi import FastAPI

app = FastAPI(title="Social Challenge Platform AI")


@app.get("/health")
def health_check():
    return {"status": "ok"}
