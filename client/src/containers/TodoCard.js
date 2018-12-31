import React from 'react';
import { connect } from 'react-redux';
import { deleteItemList, deleteCard, toggleItemDone, showDetail, closeDetail } from '../actions/TodoActions';
import ListItem from '../components/ListItem';
import ModalPopup from '../components/ModalPopup';

class TodoCard extends React.Component {
    constructor(props) {
        super(props);

        // This local state for handle text input for new item list
        this.state = {
            inputItemList: '',
        }
        console.log('todocard', this.props);

        // not needed anymore
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleDeleteCard = this.handleDeleteCard.bind(this);
        this.handleItemIsDone = this.handleItemIsDone.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOnTextChange(e) {
        e.preventDefault();
        this.setState({ inputItemList: e.target.value });
    }

    handleOnSubmit(e) {
        e.preventDefault();
    }

    handleDeleteItem(cardID, itemID) {
        // Dispatch to redux with card object ID and list item. 
        //console.log('handleDeletItem: ', cardID, itemID);

        this.props.onDeleteItemList(cardID, itemID);
    }

    handleDeleteCard(cardID, showDetailModal) {
        //console.log('handleDeleteCard: ', cardID);

        this.props.onDeleteCard(cardID);
    }

    handleItemIsDone(cardID, itemID, toggledvalue) {
        //console.log('handleItemIsDone itemID: ', itemID);     

        this.props.onToggleItemDone(cardID, itemID, toggledvalue);
    }

    handleCloseModal(closeDetailModal) {
        this.props.onCloseModal(closeDetailModal);
    }

    handleShowDetail(cardID, showDetailModal) {
        this.props.onShowDetaild(cardID, showDetailModal);
    }

    handleModalDetail() {
        if (this.props.detailVisible) {
            return (
                <ModalPopup
                    show={this.props.detailVisible}
                    handleCloseModal={this.handleCloseModal}
                    itemList={this.props.detailItem}
                />
            )
        }
    }

    onRenderListItem() {
        if (this.props.todos.length) {

            let renderList = this.props.todos.map(item => {
                return (
                    <div className="card border-primary mb-3" key={item._id}>
                        <div className="card-header">
                            <h4 className="card-title">{item.title}</h4>
                            <button className="btn btn-primary" onClick={() => this.handleDeleteCard(item._id)}>
                                Delete Card
                              </button>
                            <button className="btn btn-primary" onClick={() => this.handleShowDetail(item._id, true)}>
                                Detail
                              </button>
                        </div>

                        <ListItem
                            cardID={item._id}
                            itemList={item.list}
                            deleteItemList={this.handleDeleteItem}
                            itemIsCompleted={this.handleItemIsDone}
                        />

                        <form className="form-group" id={item._id} onSubmit={this.handleOnSubmit}>
                            <input className="form-control"
                                onChange={this.handleOnTextChange} />
                        </form>
                    </div>
                )
            });

            return (
                renderList
            )
        } else {
            return (
                <div className="center">No Todo</div>
            )
        }
    }

    render() {
        return (
            <div className="wrapper-card">
                <h1>todoCard</h1>
                {this.onRenderListItem()}
                {this.handleModalDetail()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todo.todos,
        detailVisible: state.todo.detailVisible,
        detailItem: state.todo.detailItem
    }
}

const mapDispatchToProps = dispatch => {
    return {
        /** request Delete Todo list item  */
        onDeleteItemList: (cardID, itemID) => { dispatch(deleteItemList(cardID, itemID)); },
        onDeleteCard: (cardID) => { dispatch(deleteCard(cardID)); },
        onToggleItemDone: (cardId, itemId, toggledvalue) => { dispatch(toggleItemDone(cardId, itemId, toggledvalue)); },
        onShowDetaild: (cardID, showDetailModal) => { dispatch(showDetail(cardID, showDetailModal)); },
        onCloseModal: (closeDetailModal) => { dispatch(closeDetail(closeDetailModal)); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoCard)