import React from 'react';
import Book from './book';
import EditModal from './editModal';
import DeleteModal from './deleteModal';

export default class Library extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            openModal: '',
            index: 0,
            title: '',
            author: '',
            date: '',
        }

    }

    componentDidMount() {
        $(document).ready(function(){
            $.ajax({
                type : 'GET',
                url: "bookList.json",
                dataType: 'json',
                async: true,
                success: function(data) {
                    var book = [];
                    $.each(data.books, function(index, obj){
                        book.push({
                            title: obj.title,
                            author: obj.author,
                            date: obj.date,
                        });
                    });
                    this.setState({
                      books: book
                    })

                }.bind(this),
                error: function() {
                    alert("error");
              }.bind(this)
            });
        }.bind(this))

        }

    openModal(type, idx='') {
        this.setState({
            openModal: type,
            index: idx,
        })
    }

    closeModal() {
        this.setState({
            openModal: '',
        })
    }

    edit(t, a, d) {
        let book = this.state.books;
        book[this.state.index].title = t;
        book[this.state.index].author = a;
        book[this.state.index].date = d;
        this.setState({
            books: book
        })
        this.closeModal();
    }

    add(t, a, d) {
        let book = this.state.books;
        book.push({title: t, author: a, date: d});
        this.setState({
            books: book
        })
        this.closeModal();
    }

    delete() {
        let book = this.state.books;
        book.splice(this.state.index,1);
        this.setState({
            books: book
        })
        this.closeModal();
    }

    render() {
        let b = [];
        let modal = '';
        this.state.books.forEach((book, index)=> {
            b.push(
                <div className='under-line' key={index}>
                    <div>
                        <div className='sample thumb1'>
                            <Book index={index} title={book.title} author={book.author} date={book.date} fnOpenModal={this.openModal.bind(this)}/>
                        </div>
                    </div>
                </div>
            )
        })
        if (this.state.openModal == 'edit') {
            let book = this.state.books[parseInt(this.state.index)]
            modal = <EditModal type="Edit" books={this.state.books} t={book.title} a={book.author} d={book.date} fnCloseModal={this.closeModal.bind(this)} fnEdit={this.edit.bind(this)}/>
        }
        else if (this.state.openModal == 'add') {
            modal = <EditModal type="Add" books={this.state.books} fnCloseModal={this.closeModal.bind(this)} fnAdd={this.add.bind(this)}/>
        }

        else if (this.state.openModal == 'delete') {
            modal = <DeleteModal fnCloseModal={this.closeModal.bind(this)} fnDelete={this.delete.bind(this)}/>
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                      <div className="head-title">Books Library</div>
                      <div className='bookshelf'>
                            <div className='shelf'>
                                <div className='row-1'>
                                    <div className='loc'>
                                        {b}
                                    </div>
                                </div>
                             </div>
                      </div>
                      {modal}
                     <div style={{textAlign: 'center'}}>
                         <button className='btn btn-add' onClick={this.openModal.bind(this,"add")}>Add New Book</button>
                     </div>
                     </div>
                </div>
            </div>
        )
    }
}
