import React from 'react';
import PropTypes from 'prop-types';

export default class Book extends React.Component {
  constructor(props) {
    super(props);
  }

  editClick() {
     this.props.fnOpenModal('edit', this.props.index);
  }

  deleteClick() {
    this.props.fnOpenModal('delete',this.props.index);
  }

  render() {
    return (
      <div>
        <div className='row'>
            <label className='col-xs-12 label-text' style={{fontSize: '10px',paddingTop: '30px'}}>{this.props.date}</label>
         </div>
        <div className='row'>
            <label className='col-xs-12 label-text' style={{fontFamily:'Palatino Linotype', fontSize: '11px'}}>{this.props.author}</label>
        </div>

        <div className='row'>
            <label className='col-xs-12 label-text'>{this.props.title}</label>
        </div>

         <div className='row-edit'>
            <button type='button' className='btn btn-edit' onClick={this.editClick.bind(this)}><i className="glyphicon glyphicon-edit"></i></button>
            <button type='button' className='btn btn-edit' onClick={this.deleteClick.bind(this)}><i className="glyphicon glyphicon-trash"></i></button>
          </div>
      </div>
    )
  }
}

Book.propTypes = {
  date: PropTypes.string
  author: PropTypes.string
  title: PropTypes.string
  fnOpenModal: PropTypes.function
};
