import React from 'react';
import Modal from 'react-awesome-modal';

const ModalPopup = ({show, handleCloseModal, itemList}) => {
    let list;

    if (itemList){
        list = itemList.list.map(item => {
            return (
                item.content
            )
        })
    }

    return (
        <section>
            <Modal visible={show} width="800" height="600" effect="fadeInUp" onClickAway={() => handleCloseModal(false)}>
                <div>
                    <p><li>{list}</li></p>
                    <button onClick={() => handleCloseModal(false)}>Close</button>
                </div>
            </Modal>
        </section>
    );
}

export default ModalPopup;