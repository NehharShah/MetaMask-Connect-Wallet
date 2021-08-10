import React from 'react';
import classes from './Info.module.css';

const Info = ({data}) => {
    return (
        <div className={classes.contentWrapper}>
            <div className={classes.content}>
                <h2 className={classes.title}>Account Information</h2>
                {data.connected
                    ? <div className={classes.info}>
                        <div>
                            <p className={classes.text}>Address:</p>
                            <p className={`wordwrap ${classes.text}`}>
                                {data.address}
                            </p>
                        </div>
                        <div>
                            <p className={classes.text}>
                                Balance: <span>{data.balance} {data.symbol}</span>
                            </p>
                        </div>
                        <div>
                            <p className={classes.text}>Network: <span>{data.network}</span></p>
                        </div>
                    </div>
                    : <div className={classes.text}>
                        <p>Information is not available</p>
                        <p>Please connect to metamask</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default Info;
