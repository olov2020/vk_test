import React from 'react';
import style from './yourFact.module.css'

interface Props {
    text: string,
    setText: (newText: string) => void,
}

const YourFact: React.FC<Props> = ({text, setText, ...props}) => {

    const onChange = (e) => {
        e.preventDefault();
        setText(e.target.value);
    }

    return (
        <input onChange={onChange}
               value={text}
               placeholder='Write down your own interesting fact'
               className={style.input}
               {...props}
        />
    );
};

export default YourFact;