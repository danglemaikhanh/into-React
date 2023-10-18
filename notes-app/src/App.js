import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { addDoc, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore"
import { notesRef, db } from "./firebase"

export default function App() {
    const [notes, setNotes] = React.useState([]) 
    const [currentNoteId, setCurrentNoteId] = React.useState("")
    const currentNode = notes.find(note => note.id === currentNoteId) || notes[0]
    const sortedNotes = [...notes].sort((a, b) => b.updatedAt - a.updatedAt)
    const [tempNoteText, setTempNoteText] = React.useState("")

    React.useEffect(() => {
        const unsubscribe = onSnapshot(notesRef, snapshot => {
            // Sync up our local notes array with the snapshot data
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(notesArr)
        })
        return unsubscribe
    }, [])

    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [currentNoteId, notes])

    React.useEffect(() => {
        if (currentNode) {
            setTempNoteText(currentNode.body)
        }
    }, [currentNode])

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (tempNoteText === currentNode.body) {
                updateNote(tempNoteText)
            }
        }, 500)
        return () => clearTimeout(timeoutId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tempNoteText])

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const newNoteref = await addDoc(notesRef, newNote)
        setCurrentNoteId(newNoteref.id)
    }

    async function updateNote(text) {
        // This does not rearrange the notes
        /* setNotes(oldNotes => oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, body: text }
                : oldNote
        })) */
        // Try to rearrange the most recently-modified
        // not to be at the top of the list
        const docRef = doc(db, "notes", currentNoteId)
        await setDoc(docRef, { body: text, updatedAt: Date.now() }, { merge: true })
    }

    /**
     * 1. What array method can be used to return a new
     *    array that has filtered out an item based 
     *    on a condition?
     * 2. Notice the parameters being based to the function
     *    and think about how both of those parameters
     *    can be passed in during the onClick event handler
     */

    async function deleteNote(noteId) {
        const docRef = doc(db, "notes", noteId)
        await deleteDoc(docRef)
    }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={sortedNotes}
                            currentNote={currentNode}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        {
                            <Editor
                                tempNoteText={tempNoteText}
                                setTempNoteText={updateNote}
                            />
                        }
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                        </button>
                    </div>

            }
        </main>
    )
}
