import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import TransactionDetail from '../components/TransactionDetail';
import { fetchTransactionsAsync } from '../features/transactionSlice';
const TransactionHistory = () => {
    const dispatch = useDispatch();
    const user_id = useSelector((state) => state.auth.user_id);
    const transactions = useSelector((state) => state.transactions.transactions);
    useEffect(() => {
        dispatch(fetchTransactionsAsync(user_id));
    }, [])
    return (
        <>

                <div className="Container-fluid transaction_history py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-4 text-center">
                                <h4 className='fw-semibold text-center'>Transaction History</h4>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-md-10 col-12">
                                <div className="row gy-3">
                                    {
                                        transactions.map((transaction, index) => (
                                            <TransactionDetail key={index} transaction={transaction} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default TransactionHistory;
