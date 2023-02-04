/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { toast } from 'react-toastify';
import { AsyncButtonInterface } from '../interfaces';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';

const AsyncButton = (config: AsyncButtonInterface) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { actionName, thunkAction, styles, succesMessage, errorMessage } = config;
    const dispatch = useDispatch<AppDispatch>();

    const handleRequest = async () => {
        try {
            setLoading(true);
            dispatch(thunkAction).then(() => {
                setLoading(false);
                toast(succesMessage, {
                    type: 'success'
                })
            }).catch((error) => {
                console.log(error);
                setLoading(false);
                toast(errorMessage, {
                    type: 'error'
                })
            });
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <button className={styles} disabled={loading} onClick={handleRequest}>
            {
                loading ? (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    actionName
                )
            }
        </button>
    )
}

export default AsyncButton
