import React, {useState} from 'react';
import Item from './Item';
import Button from '@mui/material/Button';

const Column = ({title, items}) => {

    const [itemList, setItemList] = useState(items);

    const deleteItem = (itemIndex) => 
    {
        const newList = itemList.filter((_, index)=>index!==itemIndex);
        setItemList(newList);
    };

    const createItem = () => 
        {
            const name = window.prompt("Enter name:");
            const body = window.prompt("Enter body text:");
            const newItem = {name: name, body: body};
            setItemList([...itemList, newItem]);
        };

    return (
        <div className='column'>

            <h3 className='title'>{title}</h3>
            {itemList.map((item, index) => (
                <Item 
                    key={index} 
                    name={item.name} 
                    body={item.body} 
                    deleteFunction={()=>deleteItem(index)} // Syntax for passing an anonymous function with an argument
                />
            ))}
            <Button 
                variant="contained" 
                onClick={createItem}>
                Create item
            </Button>
        </div>
    );
};
export default Column;