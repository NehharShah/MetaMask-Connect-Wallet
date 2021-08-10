import React from 'react';
import classes from './Header.module.css';

const Header = (props) => {

    return (
        <div className={classes.header}>
            <div className={`${classes.content} container`}>
                <h1 className={classes.title}>MetaMask Connect</h1>
                {props.connected
                    ? <div className={classes.address}>
                        {props.address.slice(0, 7) + '...' + props.address.slice(-8)}
                    </div>
                    : <button
                        className={classes.button}
                        onClick={props.onClick}
                        >Connect to metamask
                    </button>
                }
            </div>
        </div>
    );
}

export default Header;
