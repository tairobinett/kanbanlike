import React, { useState } from 'react';
import Column from './Column';
import Button from '@mui/material/Button';

const List = () => {

    const [columns, setColumns] = useState([
        {
            id: 1,
            title:'title1', 
            items:[
                {name:'item1', body:'aaaa help'},
                {name:'item2', body:'aaaa help'},
                {name:'item3', body:'aaaa help'},
            ]
        },
        {
            id: 2,
            title:'title2', 
            items:[
                {name:'item4', body:'aaaa help'},
                {name:'item5', body:'aaaa help'},
                {name:'item6', body:'aaaa help'},
            ]
        },
        {
            id: 3,
            title:'title3', 
            items:[
                {name:'item7', body:'aaaa help'},
                {name:'item8', body:'aaaa help'},
                {name:'item9', body:'aaaa help'},
            ]
        },
    ]);

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
        </div>
    );
};
export default List;