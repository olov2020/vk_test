import Item from "./item/Item.tsx";
import React, {useState, useRef, useEffect} from "react";
import style from "./itemList.module.css";
import {List, Pagination} from "antd";

interface Data {
    id: number;
    value: string;
}

interface Props {
    items: Data[];
}

const ItemsList: React.FC<Props> = ({items}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(100); // State for items per page
    const listRef = useRef<HTMLDivElement>(null); // Reference to the list
    const [displayedItems, setDisplayedItems] = useState<Data[]>(
        items.slice(0, itemsPerPage)
    ); // State for items to be displayed

    // Function to handle page changes
    const handlePageChange = (newPage: number) => {
        if (items.length === 0) {
            setDisplayedItems([]);
            return;
        }
        setCurrentPage(newPage);
        const startIndex = (newPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedItems(items.slice(startIndex, endIndex));
        if (listRef.current) {
            listRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    };

    // Function to handle item deletion
    const handleDeleteItem = (idToDelete: number) => {
        const index = items.findIndex((item) => item.id === idToDelete);
        // Update the original items array
        items.splice(index, 1);

        // Update the displayedItems state (only if the deleted item was on the current page)
        if (index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setDisplayedItems(items.slice(startIndex, endIndex));
        }
    };

    useEffect(() => {
        handlePageChange(1);
        setDisplayedItems(items.slice(0, itemsPerPage));
    }, [itemsPerPage, items])

    // Function to handle changing items per page
    const handleItemsPerPageChange = (current: number, size: number) => {
        setItemsPerPage(size);
        handlePageChange(1); // Go to the first page when changing items per page
    };

    return (
        <div ref={listRef} className={style.facts}>
            <h1>Fun facts about numbers</h1>
            <h3>While hovering text you may access input where you can change facts to your own</h3>
            <List
                style={
                    items.length === 0 ?
                        {display: 'none'} :
                        {display: 'flex'}
                }
                className={style.list}
                itemLayout="horizontal"
                dataSource={displayedItems} // Use displayedItems for rendering
                renderItem={(item: Data) => (
                    <List.Item style={{
                        width: '60vw',
                    }}>
                        <Item
                            value={item.value}
                            key={item.id}
                            onDelete={() => handleDeleteItem(item.id)}
                        />
                    </List.Item>
                )}
            >
                <Pagination
                    className={style.pagination}
                    defaultCurrent={currentPage}
                    total={items.length} // Total number of items
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                    showSizeChanger // Enable the "Items per page" dropdown
                    onShowSizeChange={handleItemsPerPageChange} // Handle changes to items per page
                />
            </List>
        </div>
    );
};

export default ItemsList;
