import React, {useState} from "react";
import style from './item.module.css'
import trashIcon from '../../../../public/trashIcon.svg'
import YourFact from "./yourFact/YourFact.tsx";

interface Props {
    value: string,
    key: number,
    onDelete: (id: number, value: string) => {},
}

const Item: React.FC<Props> = ({value, key, onDelete}) => {
    const [showYourFact, setShowYourFact] = useState(false);

    const number: string = value.split(' ')[0];
    const [text, setText] = useState(value.slice(value.indexOf(number) + number.length));

    return (
        <div key={key} className={style.item}>
            <p
                className={style.text}
                onMouseEnter={() => setShowYourFact(true)}
                onMouseLeave={() => setShowYourFact(false)}
            >
                <span className={style.number}>{number}</span>{text}
            </p>

            {showYourFact && (
                <YourFact text={text} setText={setText}
                          onMouseEnter={() => setShowYourFact(true)}
                          onMouseLeave={() => setShowYourFact(false)}
                />
            )}

            <img alt='Delete element' src={trashIcon} onClick={onDelete} className={style.delete}/>
        </div>
    )
}

export default Item;
