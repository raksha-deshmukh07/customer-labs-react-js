import { useState } from "react";
import { createPortal } from "react-dom";

export default function DialogBox({onClose, children, title}) {

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
        <div className="modal-overlay">
            {/* Wrap the whole Modal inside the newly created StyledModalWrapper
            and use the ref */}
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-header">
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    {title && <h1>{title}</h1>}
                    <div className="modal-body" style={{height: '600px'}}>{children}</div>
                </div>
            </div>
        </div>
    );

    return createPortal(
        modalContent,
        document.getElementById("modal-root")
    );
}