from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import time

app = FastAPI()
app.add_middleware(
    CORSMiddleware, 
    allow_origins = ["http://localhost:3000"], 
    allow_credentials = True, 
    allow_methods = ["*"], 
    allow_headers = ["*"])

@app.get("/hello")
async def root():
    return {
        "message": "Hello world!"
    }

@app.post("/create_table", status_code=status.HTTP_200_OK)
def create_table(): 
    tableName = 'boards'
    # tableName = request.args.get('tableName')
    # Retry connection to ensure DB is up
    print("start function")
    while True:
        try:
            connection = psycopg2.connect(
                dbname='mydb',
                user='postgres',
                password='Password1',
                host='db',
                port='5432'
            )
            break
        except psycopg2.OperationalError:
            print("Database not ready, retrying in 5 seconds...")
            time.sleep(5)

    cursor = connection.cursor()

    sql = f'''CREATE TABLE IF NOT EXISTS {tableName}(
        id SERIAL PRIMARY KEY,
        board JSON
    );'''

    cursor.execute(sql)

    connection.commit()
    return {
        "message": "create table success"
    }

@app.post("/save_table", status_code=status.HTTP_200_OK)
def save_table(): 
    testData = {"name":"fredd"}
    # tableName = request.args.get('tableName')
    # Retry connection to ensure DB is up
    print("start function")
    while True:
        try:
            connection = psycopg2.connect(
                dbname='mydb',
                user='postgres',
                password='Password1',
                host='db',
                port='5432'
            )
            break
        except psycopg2.OperationalError:
            print("Database not ready, retrying in 5 seconds...")
            time.sleep(5)

    cursor = connection.cursor()

    sql = '''INSERT INTO boards (board) VALUES ('{"name":"fredd"}');'''

    cursor.execute(sql)

    connection.commit()
    return {
        "message": "save table success"
    }
