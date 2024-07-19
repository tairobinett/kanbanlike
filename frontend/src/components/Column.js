import React, {useState} from 'react';
import Item from './Item';

const Column = ({title, items}) => {

    const [itemList, setItemList] = useState(items);

    const deleteItem = (itemIndex) => 
    {
        const newList = itemList.filter((_, index)=>index!==itemIndex);
        setItemList(newList);
    };

    return (
        <div className='column'>

            <h3 className='title'>{title}</h3>
            {itemList.map((item, index) => (
                <Item 
                    key={index} 
                    name={item.name} 
                    body={item.body} 
                    helloFunction={()=>deleteItem(index)} // Syntax for passing an anonymous function with an argument
                />
            ))}
        </div>
    );
};
export default Column;