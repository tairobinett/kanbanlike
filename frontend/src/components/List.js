import React, { useState } from 'react';
import Column from './Column';

const List = () => {

    const [columns, setColumns] = useState([
        {
            title:'title1', 
            items:[
                {name:'item1', body:'aaaa help'},
                {name:'item2', body:'aaaa help'},
                {name:'item3', body:'aaaa help'},
            ]
        },
        {
            title:'title2', 
            items:[
                {name:'item4', body:'aaaa help'},
                {name:'item5', body:'aaaa help'},
                {name:'item6', body:'aaaa help'},
            ]
        },
        {
            title:'title3', 
            items:[
                {name:'item7', body:'aaaa help'},
                {name:'item8', body:'aaaa help'},
                {name:'item9', body:'aaaa help'},
            ]
        },
    ]);

    return (
        <div className='list'>

            {columns.map((column, index) => (
                <Column key={index} title={column.title} items={column.items}/>
            ))}
        </div>
    );
};
export default List;