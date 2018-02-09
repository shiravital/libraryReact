import React from 'react';
import PropTypes from 'prop-types';


export default class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.t,
            author: this.props.a,
            date: this.props.d,
            message: '',
        }
    }


   // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
 isValidDate(dateString) {
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
    }

    titleChanged(e){
        let t = e.target.value.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        t = t.replace(/[^A-Za-z\s]/g, '');
        this.setState({
            title: t,
            message: ''
        })
    }

    authorChanged(e) {
        this.setState({
            author: e.target.value,
            message: ''
        })
    }

    dateChanged(e) {
        this.setState({
            date: e.target.value,
            message: ''
        })
    }

    cancel() {
        this.props.fnCloseModal();
     }

    save() {
        let message = '';
         if (!this.isValidDate(this.state.date)) {
               message= 'Date is invalid, please enter in this format: mm/dd/yyyy'
            this.setState({
                message:'Date is invalid, please enter in this format: mm/dd/yyyy'
            })
        }
        if (!this.state.author) {
            this.setState({
                message:'Author is required'
            })
        }
        if (!this.state.title) {
            this.setState({
                message:'Title is required'
            })
        }
        if (this.state.title){
            this.props.books.forEach(book=> {
                if (book.title == this.state.title && this.state.title != this.props.t) {
                    this.setState({
                        message:'Title is already exist, please change name'
                    })
                }
            })}
        if (this.state.title && this.state.author && !this.state.message && !message) {
            if (this.props.type == 'Edit') {
            this.props.fnEdit(this.state.title, this.state.author, this.state.date)
            }
            else this.props.fnAdd(this.state.title, this.state.author, this.state.date)
        }
    }

    render() {
    console.log("hio");
        return (
            <div className='modal fade in modal-open' style={{display: 'block'}}>
                 <div className='modal-dialog'>
                    <div className='modal-content'>
                         <div className='modal-header'><h4 className='modal-title'>{this.props.type} Modal</h4>
                            <button type="button" className="close" onClick={this.cancel.bind(this)} >
                                <span aria-hidden="true">&times;</span>
                            </button>
                         </div>
                         <div className='modal-body' style={{display: 'block'}}>
                            <form className='form-horizntal'>
                                {this.state.message ? <div className="alert alert-danger"> {this.state.message}</div>
                                : null}
                                <div className='row form-group'>
                                    <label className='col-xs-12 col-sm-4 control-label'>Title:</label>
                                    <div className='col-xs-12 col-sm-8'>
                                        <input className='form-control' onChange={this.titleChanged.bind(this)} value={this.state.title}></input>
                                    </div>
                                </div>
                                <div className='row form-group'>
                                    <label className='col-xs-12 col-sm-4'>Author:</label>
                                    <div className='col-xs-12 col-sm-8'>
                                        <input className='form-control' onChange={this.authorChanged.bind(this)} value={this.state.author}></input>
                                    </div>
                                </div>
                                 <div className='row form-group'>
                                    <label className='col-xs-12 col-sm-4 control-label'>Date:</label>
                                    <div className='col-xs-12 col-sm-8'>
                                         <input className='form-control' onChange={this.dateChanged.bind(this)} value={this.state.date}></input>
                                    </div>
                                 </div>
                             </form>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className="btn btn-save" onClick={this.save.bind(this)}>Save</button>
                            <button type='button' className="btn btn-can" onClick={this.cancel.bind(this)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

EditModal.propTypes = {
  d: PropTypes.string
  a: PropTypes.string
  t: PropTypes.string
  type: PropTypes.string
  books: PropTypes.array
  t: PropTypes.string
  fnCloseModal: PropTypes.function
  fnEdit: PropTypes.function
  fnAdd: PropTypes.function
};
