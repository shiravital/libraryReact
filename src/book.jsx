import React from 'react';
// import Library from './library';

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
            <label className='col-xs-12' style={{color: 'white', textAlign: 'center',fontSize: '10px',paddingTop: '30px'}}>{this.props.date}</label>
         </div>
        <div className='row'>
            <label className='col-xs-12' style={{fontFamily:'Palatino Linotype', textAlign: 'center',color: 'white',fontSize: '11px'}}>{this.props.author}</label>
        </div>
        
        <div className='row'>
            <label className='col-xs-12' style={{color: 'white', textAlign: 'center'}}>{this.props.title}</label>
        </div>
        
         <div className='row-edit'>
            <button type='button' className='btn btn-edit' onClick={this.editClick.bind(this)}><i className="glyphicon glyphicon-edit"></i></button>
            <button type='button' className='btn btn-edit' onClick={this.deleteClick.bind(this)}><i className="glyphicon glyphicon-trash"></i></button>
          </div>
      </div>
    )
  }
}


