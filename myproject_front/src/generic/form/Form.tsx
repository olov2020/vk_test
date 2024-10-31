import React, {useState} from 'react';
import Input from "./input/Input.tsx";
import {getListOfItems} from "../../api/userApi.ts";
import style from './form.module.css'
import Loading from "../loading/Loading.tsx";

interface SendData {
    min: number,
    max: number,
}

interface Data {
    id: number,
    value: string,
}

interface Props {
    setItems: (newItems: Data[]) => void; // Correct type for setItems
}

const Form: React.FC<Props> = ({setItems}) => {

    const [values, setValues] = useState<SendData>({min: 0, max: 10});
    const [error, setError] = useState<string | null>(null);
    const [showLoading, setShowLoading] = useState(false);

    const validateForm = () => {
        return !(values.min >= values.max || error);

    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setShowLoading(true);
        setItems([]);

        if (!validateForm()) {
            setError('Error submitting form');
            setShowLoading(false);
            return false;
        }
        if (typeof values !== "undefined") {
            const newItems: Data[] = [];
            for (let i = 0; i < 1000; i++) {
                const data: string = await getListOfItems({...values});
                newItems.push({id: i, value: data});
            }
            setItems(newItems);
        } else {
            setError('Fill inputs');
        }
        setShowLoading(false);
    }

    const onChangeMin = (e) => {
        e.preventDefault()
        const error = validationCheck(e.target.value);

        if (error) {
            setValues({...values, min: parseInt(e.target.value)});
        }
    }

    const onChangeMax = (e) => {
        e.preventDefault()
        const error = validationCheck(e.target.value);

        if (error) {
            setValues({...values, max: parseInt(e.target.value)});
        }
    }

    const validationCheck = (value: string) => {
        const numValue: number = parseInt(value);

        if (numValue < 0 || numValue > 1e9) {
            setError('Value is incorrect');
            return false;
        }

        setError(null);
        return true;
    }

    return (
        <form onSubmit={onSubmit} className={style.form}>

            <Input name="min" placeholder="min value" type='number' required={true} value={values.min.toString()}
                   onChange={(e) => onChangeMin(e)}></Input>
            <Input name="max" placeholder="max value" type='number' required={true} value={values.max.toString()}
                   onChange={(e) => onChangeMax(e)}/>

            <button disabled={showLoading} type="submit" className={
                showLoading ? style.disabled : null
            }>
                Get interesting fact!
            </button>

            {error && <p className={style.error}>{error}</p>}

            { showLoading && <Loading/> }
        </form>
    );
};

export default Form;