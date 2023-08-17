import React from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import notes from "../notes"

function createNote(noteItem) {
    return (
        <Note
            key={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
        />
    );
}

function App() {
    return <div>
        <Header />
        {/* {notes.map(createNote)} */}
        {notes.map(
            (note) => (
                <Note
                    key={note.id}
                    title={note.title}
                    content={note.content}
                />
            )
        )}
        <Footer />
    </div>
};

export default App