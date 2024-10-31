import Item from "./item/Item.tsx";
import React, { useState, useRef } from "react";
import style from "./itemList.module.css";

interface Props {
    items: string[];
}

const ItemsList: React.FC<Props> = ({ items }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100; // Number of items to display per page
    const listRef = useRef<HTMLUListElement>(null); // Reference to the list
    const [currentItems, setCurrentItems] = useState(items.slice(0, itemsPerPage)); // Initialize with first page's items

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Function to handle page changes
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        const newStartIndex = (newPage - 1) * itemsPerPage;
        const newEndIndex = newStartIndex + itemsPerPage;
        setCurrentItems(items.slice(newStartIndex, newEndIndex));

        // Optionally scroll to the top of the list when changing pages
        if (listRef.current) {
            listRef.current.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    // Function to handle item deletion
    const handleDeleteItem = (index: number) => {
        // Update the original items array
        items.splice(index, 1);

        // Update the currentItems state
        setCurrentItems(items.slice(startIndex, endIndex));

        // Update the page number if necessary
        if (index < startIndex) {
            handlePageChange(currentPage - 1);
        } else if (index >= endIndex && currentPage < Math.ceil(items.length / itemsPerPage)) {
            handlePageChange(currentPage + 1);
        }
    };

    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div ref={listRef} className={style.facts}>
            <h1>Fun facts about numbers</h1>
            <ul className={style.list}>
                {currentItems.map((item: string, index: number) => (
                    <Item
                        fact={item}
                        key={index}
                        onDelete={() => handleDeleteItem(index + startIndex)} // Pass the index in the original array
                    />
                ))}
            </ul>
            <div className={style.pagination}>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={currentPage === number ? style.active : ""}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ItemsList;
