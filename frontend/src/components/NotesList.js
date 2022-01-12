import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

export default class NotesList extends Component {

    state = {
        notes: []
    }

    async componentDidMount() {
        this.getNotes();
    }

    getNotes = async () => {
        const res = await axios.get('http://localhost:8082/allproducts')
        this.setState({
            notes: res.data
        });
    }

    deleteNote = async (noteId) => {
        await axios.delete('http://localhost:8082/deleteproduct/' + noteId);
        this.getNotes();
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div className="col-md-4 p-2" key={note._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{note.title}</h5>
                                    <Link to={"/edit/" + note._id} className="btn btn-secondary">
                                        <i className="material-icons">
                                            border_color</i>
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p>
                                        {note.price}
                                    </p>
                                    <p>
                                        Author: {note.name}
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => this.deleteNote(note.code)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
