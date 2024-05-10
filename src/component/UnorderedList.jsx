import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

const UnorderedList = ({ keep, setKeep }) => {
    const [listItems, setListItems] = useState([]);
    const [currentItem, setCurrentItem] = useState("");

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && currentItem.trim() !== "") {
            // const index = e.target.getAttribute('data-index');
            const updatedList = [...listItems, currentItem];
            // updatedList.splice(parseInt(index) + 1, 0, currentItem);
            setListItems(updatedList);
            setKeep((prev) => {
                return { ...prev, content: updatedList }
            });
            setCurrentItem("");
        };
    };

    const handleInputChange = (e) => {
        setCurrentItem(e.target.value);
    };

    const handleItemChange = (index, newValue) => {
        const updatedList = [...listItems];
        updatedList[index] = newValue;
        setListItems(updatedList);
        setKeep((prev) => {
            return { ...prev, content: updatedList }
        });
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && e.target.value === "" && index > 0) {
            const updatedList = listItems.filter((item, i) => i !== index);
            setListItems(updatedList);
            setKeep((prev) => {
                return { ...prev, content: updatedList }
            });
        };
    };

    useEffect(() => {
        if (keep.content) {
            setListItems(keep.content);
        };
    }, [keep.content]);

    return (
        <div>
            <ul>
                {listItems.map((item, index) => (
                    <li key={index}>
                        <Input
                            placeholder={"BackSpace to Delete"}
                            type="text"
                            value={item}
                            style={{ marginBottom: 16, backgroundColor: "#feefc3", border: "none" }}
                            onChange={(e) => handleItemChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            data-index={index}
                        />
                    </li>
                ))}
            </ul>
            <Input
                placeholder={"Type Something and Press Enter to Add List..."}
                type="text"
                style={{ marginBottom: 16, backgroundColor: "#feefc3", border: "none" }}
                value={currentItem}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
            />
        </div>
    );
};

export default UnorderedList;
