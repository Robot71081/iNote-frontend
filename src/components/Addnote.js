import React,{useContext, useState} from 'react'
import noteContext from "../context/notes/NoteContext";

const Addnote = (props) => {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleclick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
        props.showAlert("added Successfully","success")
    }

    const onchange=(e)=>{
   setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    
    <div className="container my-3">
    <h1>Add a Note</h1>
    <form className='my-3'>
    <div className="mb-3">
      <label htmlFor="title" className="form-label">
        Title
      </label>
      <input
        type="text"
        className="form-control"
        id="title"
        name="title"
        minLength={5}
        required
        value={note.title}
        onChange={onchange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="description" className="form-label">
       Description
      </label>
      <textarea
        className="form-control"
        id="description"
        name="description"
        rows="3"
        minLength={5}
        required
        value={note.description}
        onChange={onchange}
      ></textarea>
     </div>
     <div className="mb-3">
      <label htmlFor="title" className="form-label">
        Tag
      </label>
      <input
        type="text"
        className="form-control"
        id="tag"
        name="tag"
        value={note.tag}
        
        onChange={onchange}
      />
    </div>
     <button type="submit"  disabled={note.title.length<5 ||note.description.length<5}className="btn btn-primary" onClick={handleclick}>Add Note</button>
     </form>
  </div>
  )
}

export default Addnote
