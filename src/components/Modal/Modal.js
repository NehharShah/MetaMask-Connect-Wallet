import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css';

const Modal = (props) => {
    const [portal] = useState(() => document.createElement('div'));

    useEffect(() => {
        document.body.appendChild(portal);
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.removeChild(portal);
            document.body.style.overflow = 'auto';
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return createPortal(
        <div className={classes.modal} onClick={props.onClick}>
            <div className={classes.content} onClick={e => e.stopPropagation()}>
                <div className={classes.close}>
                    <div className={classes.closeWrap} onClick={props.onClick}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </div>
                </div>
                <div>
                    <p className={classes.title}>
                        MetaMask not installed!
                    </p>
                    <a
                        href="https://metamask.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.link}
                    >
                        <div className={classes.linkInner}>
                            <p>Install Metamask</p>
                            <img src="metamask.png" alt="metamask-logo" />
                        </div>
                    </a>
                </div>
            </div>
        </div>,
        portal
    );
}

export default Modal;
