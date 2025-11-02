import { useEffect, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'

function App() {
  const [ users, setUsers ] = useState([])

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => {
        console.error(err);
        
      })      
  },[])
  
  return (
    <div>
      <h1>react test</h1>
      {
        <UsersList users={users} />
      }
    </div>
  )
}

export default App
