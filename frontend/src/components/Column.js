import React, {useState} from 'react';
import Item from './Item';

const Column = ({title, items}) => {

    const [itemList, setItemList] = useState(items);

    const helloFunction = (itemIndex) => {console.log("item index: " + itemIndex)};

    return (
        <div className='column'>

            <h3 className='title'>{title}</h3>
            {itemList.map((item, index) => (
                <Item 
                    key={index} 
                    name={item.name} 
                    body={item.body} 
                    helloFunction={helloFunction}
                />
            ))}
        </div>
    );
};
export default Column;