import React from 'react';
import Modal from 'react-awesome-modal';

const ModalPopup = ({ show, handleCloseModal, itemList }) => {
    let title;
    let list;

    title = (itemList && itemList.title) ? itemList.title : "No title";

    if (itemList) {
        list = itemList.list.map(item => {
            return (
                <li key={item._id}>{item.content}</li>                
            )
        })
    }

    return (
        <section>
            <Modal visible={show} width="800" height="600" effect="fadeInUp" onClickAway={() => handleCloseModal(false)}>
                <div>
                    <h3>{title}</h3>
                    <ul>{list}</ul>
                    <button onClick={() => handleCloseModal(false)}>Close</button>
                </div>
            </Modal>
        </section>
    );
}

export default ModalPopup;