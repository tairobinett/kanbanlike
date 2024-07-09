import React from 'react';

const Item = ({name, body}) => {
    return (
        <div className='item'>
            <h3>{name}</h3>
            <p>{body}</p>
        </div>
    );
};
export default Item;