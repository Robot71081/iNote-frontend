import React, { useContext, useEffect ,useRef,useState} from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  let navigate=useNavigate()
  const context = useContext(noteContext);
  const { Notes, getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else
    {
      navigate('/login')
    }
    
  }, []);

  const ref=useRef(null)
  const refClose=useRef(null)
  const [note,setNote]=useState({id:'',etitle:"",edescription:"",etag:""})

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
   
  };
  

  const handleclick=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag)
   refClose.current.click()
   props.showAlert("updated Successfully","success")

    
}

const onchange=(e)=>{
setNote({...note,[e.target.name]:e.target.value})
}
  return (
    <>
      <Addnote showAlert={props.showAlert} />
      <button type="button"  ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

      

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
       
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form className='my-3'>
    <div className="mb-3">
      <label htmlFor="etitle" className="form-label">
        Title
      </label>
      <input
        type="text"
        className="form-control"
        id="etitle"
        name="etitle"
        value={note.etitle}
        minLength={5}
        required
        onChange={onchange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="edescription" className="form-label">
       Description
      </label>
      <textarea
        className="form-control"
        id="edescription"
        name="edescription"
        rows="3"
        value={note.edescription}
        minLength={5}
        required
        onChange={onchange}
      ></textarea>
     </div>
     <div className="mb-3">
      <label htmlFor="etag" className="form-label">
        Tag
      </label>
      <input
        type="text"
        className="form-control"
        id="etag"
        name="etag"
        value={note.etag}
        
        onChange={onchange}
      />
    </div>
     
     </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button"  disabled={note.etitle.length<5 ||note.edescription.length<5} className="btn btn-primary" onClick={handleclick}>
               Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row my-3">
          <h1>Your Notes</h1>
          <div className="container mx-2"> {Notes.length===0 && 'No Notes to display'}</div>
         
          {Notes.map((note) => {
            return (
              <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
