import ItemsList from "../generic/itemsList/ItemsList.tsx";
import Form from "../generic/form/Form.tsx";
import {useState} from "react";
import style from './home.module.css'

const Home = () => {

    const [items, setItems] = useState<string[]>([]);

    console.log(items);

    return (
        <div className={style.page}>
            <h1 className={style.title}>In the fields below you can input min and max values and then get interesting facts about it</h1>
            <Form setItems={setItems}/>
            <ItemsList items={items}/>
        </div>
    );
};

export default Home;