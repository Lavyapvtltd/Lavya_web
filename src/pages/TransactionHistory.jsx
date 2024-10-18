import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import TransactionDetail from '../components/TransactionDetail';
import { fetchTransactionsAsync } from '../features/transactionSlice';
import Spinner from '../components/Spinner';
const TransactionHistory = () => {
    const dispatch = useDispatch();
    const user_id = useSelector((state) => state.auth.user_id);
    const { transactions, status } = useSelector((state) => state.transactions);
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
                                    status === "loading" ? (
                                        <Spinner />
                                    ) : (
                                        transactions?.length > 0 ? (
                                            transactions.map((transaction, index) => (
                                                <TransactionDetail key={index} transaction={transaction} />
                                            ))
                                        ) : (
                                            <div>
                                                <h1>Transaction History Not Found</h1>
                                            </div>
                                        )
                                    )
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
