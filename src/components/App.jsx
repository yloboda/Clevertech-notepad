import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { NotesList } from './NotesList';
import { NoteForm } from './NoteForm';

export const App = (props) => {
    const { service } = props;

    const [notes, setNotes] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            const fetchedNotes = await service.getNotes();
            setNotes(fetchedNotes);
        };
        fetchNotes();
    }, [service]);

    const onSubmit = async (note) => {
        await service.saveNote(note);
        const updatedNotes = await service.getNotes();
        setNotes(updatedNotes);
        setSelected(null);
    };

    const newNote = () => {
        const emptyNote = { title: '', text: '', id: uuidv4() };
        setSelected(emptyNote);
        setNotes(prevNotes => [...prevNotes, emptyNote]);
    };

    const onSelect = (note) => {
        setSelected(note);
    };


    const onCancel = () => {
        setSelected(null);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>React Notes</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <NotesList notes={notes} onSelect={onSelect} selected={selected} />
                </div>
                <div className="col-md-8">
                    <NoteForm note={selected} onChange={setSelected} onSubmit={onSubmit} onCancel={onCancel} />
                    <button id="new-note" className="btn btn-primary" onClick={newNote} data-testid="new-note">
                        New Note
                    </button>
                </div>
            </div>
        </div>
    );
};
