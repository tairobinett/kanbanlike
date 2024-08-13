import React, { useState, useEffect } from 'react';
import Column from './Column';
import Button from '@mui/material/Button';
import {v4 as uuidv4} from 'uuid';

const List = () => {

    const uuid1 = uuidv4();
    const uuid2 = uuidv4();
    const uuid3 = uuidv4();

    const [columns, setColumns] = useState([
        {
            id: uuid1,
            title:'TODO', 
            items:[
                {name:'Dishes', body:'Clean the dishes in the sink'},
            ]
        },
        {
            id: uuid2,
            title:'IN PROGRESS', 
            items:[
                {name:'Laundry', body:'Take laundry from wash and put it in the dryer'},
            ]
        },
        {
            id: uuid3,
            title:'DONE', 
            items:[
                {name:'Garbage', body:'Take out trash and recycling'},
            ]
        },
    ]);

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/create_table', {method: "POST"})
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const saveFunction = () => {
        const dataToSave = JSON.stringify(columns);
        fetch('http://127.0.0.1:5000/save_table',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: dataToSave  // This is already a JSON string, so we don't need to stringify it again
                })
            })
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log("Save response:", data);
            })
            .catch(error => console.error('Error saving data:', error));
    }

    const loadFunction = () => {
        fetch('http://127.0.0.1:5000/load_table')
            .then(response => response.json())
            .then(result => {
                console.log("Received result:", result);
                if (result.data) {
                    setColumns(result.data[0]);
                }
            })
            .catch(error => console.error('Error loading data:', error));
    }

    console.log("data: " + data);
    console.log("data.message: " + data.message);

    const createColumn = () =>
        {
            const uuid = uuidv4();
            const title = window.prompt("Enter column title:");
            const newColumn = {id: uuid, title: title, items: []};
            setColumns([...columns, newColumn]);
        }

    const deleteColumn = (id) => 
    {
        setColumns(columns.filter(column=>column.id!==id));
    };

    const updateItems = (columnId, newItems) =>
    {
        setColumns(
            columns.map(
                column=>column.id===columnId ? {...column, items: newItems} : column
            )
        );
    }

    return (
        <div className='list'>

            {columns.map((column, index) => (
                <div>
                    <Column 
                        key={index} 
                        title={column.title} 
                        items={column.items}
                        updateItems={(newItems)=>updateItems(column.id, newItems)}
                    />
                    <Button 
                        variant="contained" 
                        onClick={()=>deleteColumn(column.id)}>
                        delete column
                    </Button>
                </div>
            ))}

            <Button 
                className='create-column-button'
                variant="contained" 
                onClick={()=>createColumn()}>
                create column
            </Button>

            <Button 
                className='create-column-button'
                variant="contained" 
                onClick={()=>saveFunction()}>
                save
            </Button>
            <Button 
                className='create-column-button'
                variant="contained" 
                onClick={()=>loadFunction()}>
                load
            </Button>
        </div>
    );
};
export default List;