import React, { useState } from 'react';
import styles from './Emi.module.css';
import { tenureData } from '../utils/Constant';

const Emi = () => {
    const [cost, setCost] = useState(0);
    const [interest, setInterest] = useState(10);
    const [fee, setFee] = useState(1);
    const [downPayment, setDownPayment] = useState(0);
    const [tenure, setTenure] = useState(12);
    const [emi, setEmi] = useState(0);

    const calculateEMI = (downPaymentValue) => {
        if (!cost) return 0;

        const loanAmt = cost - downPaymentValue;
        const rateOfInterest = interest / 100;
        const numOfYear = tenure / 12;

        const EMI =
            (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYear) /
            ((1 + rateOfInterest) ** numOfYear - 1);
        return Number(EMI / 12).toFixed(0);
    };

    const calculateDp = (emiValue) => {
        if (!cost) return 0;

        const dp = 100 - (emiValue / calculateEMI(0)) * 100;
        return Number((dp / 100) * cost).toFixed(0);
    };

    const updateEMI = (e) => {
        // Calculate EMI and update it
        if (!cost) return;

        const dp = Number(e.target.value);
        setDownPayment(dp.toFixed(0));

        const calculatedEmi = calculateEMI(dp);
        setEmi(calculatedEmi);
    };

    const updateDownPayment = (e) => {
        // Calculate down payment and update it
        if (!cost) return;

        const emiValue = Number(e.target.value);
        setEmi(emiValue.toFixed(0));

        const calculatedDp = calculateDp(emiValue);
        setDownPayment(calculatedDp);
    };

    return (
        <>
            <div className={styles.container}>
                <span>Total cost of Assets</span>
                <input
                    type="text"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="Total cost of Assets"
                />

                <span>Interest Rate (in %)</span>
                <input
                    type="text"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    placeholder="Interest Rate (in %)"
                />

                <span>Processing Fee (in %)</span>
                <input
                    type="text"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    placeholder="Processing Fee (in %)"
                />

                <span>Down Payment</span>
                <span>
                    Total Down Payment-
                    {(Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)}
                </span>
                <input
                    type="range"
                    value={downPayment}
                    min={0}
                    max={cost}
                    onChange={updateEMI}
                />
                <div className={styles.dplabel}>
                    <label className={styles.dpstart}>0%</label>
                    <b className={styles.bold}>{downPayment}</b>
                    <label className={styles.dpend}>100%</label>
                </div>
                <span>Loan per Month</span>
                <span>
                    Total EMI-
                    {(emi * tenure).toFixed(0)}
                </span>

                <input
                    type="range"
                    value={emi}
                    min={calculateEMI(cost)}
                    max={calculateEMI(0)}
                    onChange={updateDownPayment}
                />
                <div>
                    <label> {calculateEMI(cost)} start</label>
                    <b>{emi}</b>
                    <label className={styles.dpend}>{calculateEMI(0)}</label>
                </div>
                <span>Tenure</span>
                <div className={styles.tenureContainer}>
                    {tenureData.map((t) => (
                        <button
                            key={t}
                            className={`tenure ${t === tenure ? styles.selected : ""}`}
                            onClick={() => setTenure(t)}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Emi;
