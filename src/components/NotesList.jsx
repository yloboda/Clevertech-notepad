export const NotesList = ({ notes, onSelect, selected }) => {
    return (
        <div className="list-group">
            {notes.map(note => (
                <div
                    key={note.id}
                    onClick={() => onSelect(note)}
                    className={`list-group-item ${selected && note.id === selected.id ? 'active' : ''}`}
                    data-testid="note-item"
                >
                    <h4>{note.title}</h4>
                    <p>{note.text}</p>
                </div>
            ))}
        </div>
    );
};
