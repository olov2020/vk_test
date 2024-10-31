import React from "react";
import style from './item.module.css'
import trashIcon from '../../../../public/trashIcon.svg'

interface Props {
    fact: string,
    key: number,
    onDelete: () => {},
}

const Item: React.FC<Props> = ({fact, key, onDelete}) => {

    console.log(fact);
    const number: string = fact.split(' ')[0];
    const value: string = fact.slice(fact.indexOf(number) + number.length);

    return (
        <li key={key} className={style.item}>
            <p><span className={style.number}>{number}</span>{value}</p>
            <img alt='Delete element' src={trashIcon} onClick={onDelete} className={style.delete}/>
        </li>
    )
}

export default Item;