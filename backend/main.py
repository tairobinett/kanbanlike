from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import time
from pydantic import BaseModel
import json

app = FastAPI()
app.add_middleware(
    CORSMiddleware, 
    allow_origins = ["http://localhost:3000"], 
    allow_credentials = True, 
    allow_methods = ["*"], 
    allow_headers = ["*"])

class Request(BaseModel):
    data: str

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
def save_table(args: Request):
    columns_data = args.data
    # columns_data is already a JSON string, so we don't need to use json.dumps here
    
    print("Received data:", columns_data)
    
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
    
    try:
        # Delete all existing entries
        delete_sql = '''DELETE FROM boards;'''
        cursor.execute(delete_sql)
        
        # Insert new entry
        insert_sql = '''INSERT INTO boards (board) VALUES (%s);'''
        cursor.execute(insert_sql, (columns_data,))
        
        connection.commit()
        
        return {
            "message": "Table cleared and new data saved successfully"
        }
    except Exception as e:
        connection.rollback()
        return {
            "message": f"An error occurred: {str(e)}"
        }
    finally:
        cursor.close()
        connection.close()

@app.get("/load_table", status_code=status.HTTP_200_OK)
def load_table():
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
    
    try:
        # Fetch the single entry from the table
        sql = '''SELECT board FROM boards LIMIT 1;'''
        cursor.execute(sql)
        
        result = cursor.fetchone()
        
        if result:
            # The data is already a JSON string, so we don't need to use json.loads here
            board_data = result[0]
            return {
                "data": board_data,
                "message": "Data loaded successfully"
            }
        else:
            return {
                "data": None,
                "message": "No data found in the table"
            }
    
    except Exception as e:
        return {
            "data": None,
            "message": f"An error occurred: {str(e)}"
        }
    
    finally:
        cursor.close()
        connection.close()