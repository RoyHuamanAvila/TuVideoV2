/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useState } from 'react'
import { toast } from 'react-toastify';
import { AsyncButtonInterface } from '../interfaces';

const AsyncButton = (config: AsyncButtonInterface) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { actionName, request, styles, setState, succesMessage, errorMessage } = config;

    const handleRequest = async () => {
        try {
            setLoading(true);
            const response = await axios.request(request);
            if (setState) setState(response.data);
            setLoading(false);
            toast(succesMessage, {
                type: 'success'
            })
        } catch (error) {
            setLoading(false);
            toast(errorMessage, {
                type: 'error'
            })
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
