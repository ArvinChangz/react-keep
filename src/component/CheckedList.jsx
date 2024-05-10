import React, { useState, useEffect } from 'react';
import { Checkbox, Input } from 'antd';

const CheckedList = ({ keep, setKeep }) => {
    const [listItems, setListItems] = useState([]);
    const [currentItem, setCurrentItem] = useState("");
    const [checkedItems, setCheckedItems] = useState([]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && currentItem.trim() !== "") {
            const updatedList = [...listItems, currentItem];
            setListItems(updatedList);
            setKeep((prev) => {
                return { ...prev, content: updatedList }
            });
            setCurrentItem("");
        }
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

    const handleCheck = (index) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setCheckedItems(updatedCheckedItems);
        setKeep((prev) => {
            return { ...prev, checkedItems: updatedCheckedItems }
        });
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && e.target.value === "") {
            const updatedCheckedItems = checkedItems.filter((item, i) => i !== index);;
            setCheckedItems(updatedCheckedItems);

            const updatedList = listItems.filter((item, i) => i !== index);
            setListItems(updatedList);

            setKeep((prev) => {
                return { ...prev, content: updatedList, checkedItems: updatedCheckedItems }
            });
        };
    };

    useEffect(() => {
        if (keep?.content) {
            setListItems(keep.content);
        };
        if (keep?.checkedItems) {
            setCheckedItems(keep.checkedItems);
        };
    }, [keep.content, keep.checkedItems]);

    return (
        <div>
            <ul style={{ paddingLeft: 14 }}>
                {listItems.map((item, index) => (
                    <li style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 16 }} key={index}>
                        <Checkbox
                            checked={checkedItems[index] || false}
                            onChange={() => handleCheck(index)}
                        />
                        <Input
                            placeholder={"BackSpace to Delete"}
                            type="text"
                            value={item}
                            style={{ backgroundColor: "#feefc3", border: "none" }}
                            onChange={(e) => handleItemChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    </li>
                ))}
            </ul>
            <Input
                placeholder={"Type Something and Press Enter to Add Select..."}
                type="text"
                style={{ marginBottom: 16, backgroundColor: "#feefc3", border: "none" }}
                value={currentItem}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
            />
        </div>
    );
};

export default CheckedList;
