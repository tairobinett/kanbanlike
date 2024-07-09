import React from 'react';
import Item from './Item';

const Column = ({title, items}) => {
    return (
        <div className='column'>

            <h3 className='title'>{title}</h3>
            {items.map((item, index) => (
                <Item key={index} name={item.name} body={item.body}/>
            ))}
        </div>
    );
};
export default Column;