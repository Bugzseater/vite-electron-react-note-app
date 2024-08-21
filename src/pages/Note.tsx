import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { db, auth } from '../firebaseConfig'; 
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, where } from "firebase/firestore";
import { FiTrash2 } from 'react-icons/fi'; 
import { useAuthState } from 'react-firebase-hooks/auth';

interface Note {
  id: string;
  note: string;
  date: string;
  userId: string;
}

function Note() {
  const [note, setNote] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    console.log("User:", user); // Check if user is logged in
    if (user) {
      const notesQuery = query(
        collection(db, "notes"),
        where("userId", "==", user.uid)
      );
      const unsubscribe = onSnapshot(notesQuery, (snapshot) => {
        const fetchedNotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Note));
        console.log("Fetched Notes:", fetchedNotes); // Check if notes are fetched
        setNotes(fetchedNotes);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const addNote = async () => {
    if (note.trim() && user) {
      await addDoc(collection(db, "notes"), {
        note: note,
        date: new Date().toISOString(),
        userId: user.uid,
      });
      setNote('');
    }
  };

  const deleteNote = async (id: string) => {
    const noteRef = doc(db, "notes", id);
    await deleteDoc(noteRef);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!user) return <p>Please log in to view your notes.</p>;

  return (
    <div className="flex justify-center items-center flex-col m-8">
      <div className="w-full h-[60px] flex justify-between items-center">
        <h1 className="text-[3rem]">DevNex Notes</h1>
        <Link to="/" className="w-[100px] bg-red-300 p-[10px] rounded-[20px] flex justify-center items-center">Home</Link>
      </div>
      <div className="w-full h-auto bg-yellow-100 m-8 rounded-[20px] flex flex-col p-[20px]">
        <div className="flex mb-6">
          <input 
            type="text" 
            placeholder="Type Note Here ..." 
            className="w-[400px] rounded-md p-1 mr-[10px]" 
            value={note}
            onChange={(e) => setNote(e.target.value)} 
          />
          <button 
            className="w-[100px] bg-red-300 p-1 rounded-[20px] flex justify-center items-center"
            onClick={addNote}
          >
            Add
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {notes.map((note) => (
            <div key={note.id} className="relative bg-yellow-400 p-3 rounded-lg">
              <h2 className="font-bold">Note</h2>
              <p>{note.note}</p>
              <h3 className="mt-12">Date: {new Date(note.date).toLocaleDateString()}</h3>
              <FiTrash2 
                className="absolute top-2 right-2 text-red-500 cursor-pointer" 
                onClick={() => deleteNote(note.id)} 
                size={20}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Note;
