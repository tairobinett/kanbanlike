import React, { useState } from 'react';
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
            title:'title1', 
            items:[
                {name:'item1', body:'aaaa help'},
                {name:'item2', body:'aaaa help'},
                {name:'item3', body:'aaaa help'},
            ]
        },
        {
            id: uuid2,
            title:'title2', 
            items:[
                {name:'item4', body:'aaaa help'},
                {name:'item5', body:'aaaa help'},
                {name:'item6', body:'aaaa help'},
            ]
        },
        {
            id: uuid3,
            title:'title3', 
            items:[
                {name:'item7', body:'aaaa help'},
                {name:'item8', body:'aaaa help'},
                {name:'item9', body:'aaaa help'},
            ]
        },
    ]);

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
        </div>
    );
};
export default List;