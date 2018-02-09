import React from 'react';

export default class DeleteModal extends React.Component {
    constructor(props) {
        super(props);
    }

    cancel() {
        this.props.fnCloseModal();
    }

    delete() {
        this.props.fnDelete();
    }

    render() {
        return (
        <div className='modal fade in modal-open' style={{display: 'block'}}>
                 <div className='modal-dialog'>
                    <div className='modal-content'>
                         <div className='modal-header'><h4 className='modal-title'>Confirmation Modal</h4>
                         <button type="button" className="close" onClick={this.cancel.bind(this)} >
                             <span aria-hidden="true">&times;</span>
                        </button>
                         </div>
                         <div className='modal-body' style={{display: 'block'}}>
                         <p> Are you sure you want to delete this book?</p>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className="btn btn-danger" onClick={this.delete.bind(this)}>Delete</button>
                            <button type='button' className="btn btn-can-red btn-o" onClick={this.cancel.bind(this)}>Cancel</button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

DeleteModal.propTypes = {
  fnCloseModal: PropTypes.function
  fnDelete: PropTypes.function
};
