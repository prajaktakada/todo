import React, { useState } from 'react' //
import axios from "axios"
import './create.css';
//import {NavLink,useHistory} from 'react-router-dom'
const Create = () => {
  //const history=useHistory()
  const [user, setUser] = useState({
    title: "", discription: "", status: ""
  })
  const [task, setTask] = useState([])

  let name, value;
  const handleInputs = (e) => {
    console.log(e)
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value })

  }

  async function getalldata() {

    const resp = await axios.get('/getAllTask')
    setTask([...resp.data.data])
  }
  getalldata()


  
   async function doneTask(id){
     //console.log(id)
  let find=task.find(e=>e._id==id)
  //console.log(find)
    await axios.put(`/update/${find._id}`)
   }
console.log(task)

  const PostData = async (e) => {
    e.preventDefault();

    const { title, discription, status } = user

    const res = await fetch('/createTask', {

      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title, discription, status
      })
    })

    const data = await res.json()

    if (data.status === 400 || !data) {
      window.alert('invalid data')
      console.log('invalid data')
    } else {
      window.alert('perfect data')
      console.log('perfect data')
      //history.push('/Home')
    }
  }


  return (
    <>
      <section className='createTask'>
        <div className='container mt-5'>
          <div className='create-content'>
            <div className='task-form'>
              <h2 className='form-title'>Create-Task</h2>


              <form method="POST" className='task-form' id='createtask'>

                <div className='form-group p-2'>
                  <label htmlFor='title'></label>
                  <input type='title' name='title' id='title' autoComplete='off'
                    value={user.title}
                    onChange={handleInputs}
                    placeholder='enter title'
                  />

                </div>

                <div className='form-group p-2'>
                  <label htmlFor='discription'></label>
                  <input type='discription' name='discription' id='discription' autoComplete='off'
                    value={user.discription}
                    onChange={handleInputs}
                    placeholder='enter discription'
                  />
                </div>


                <div className='form-group p-2'>
                  <label htmlFor='status'></label>

                  <select type='status' name='status' id='status' autoComplete='off'
                    value={user.status}
                    onChange={handleInputs}

                    placeholder='status'>
                    <option value="">--Please choose an option--</option>
                    <option>Open</option>
                    <option>In-Progress</option>
                    <option>Completed</option>
                  </select>
                </div>

                <div className='form-group form-button p-2'>
                  <input type='submit' name='Task form' id='Task form' className='form-submit'
                    value='Submit' onClick={PostData}
                  />
                </div>

              </form>
            </div>
          </div>

         <div>
             { task.map(data=>data.status=='Open'&&
             <div className=''>
            
               <span className='comp'>{data.title}</span>
               <button className='op' onClick={()=>doneTask(data._id)}>done</button>
             </div>
                )}
              </div>

        </div>
      </section>
    </>
  )
}

export default Create

