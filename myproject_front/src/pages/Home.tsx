import ItemsList from "../generic/itemsList/ItemsList.tsx";
import Form from "../generic/form/Form.tsx";
import {useState} from "react";
import style from './home.module.css'

interface Data {
    id: number,
    value: string,
}

const Home = () => {

    const [items, setItems] = useState<Data[]>([]);

    return (
        <div className={style.page}>
            <h1 className={style.title}>In the fields below you can input min and max values and then get interesting facts about random numbers in this range</h1>
            <Form setItems={setItems}/>
            <ItemsList items={items}/>
        </div>
    );
};

export default Home;