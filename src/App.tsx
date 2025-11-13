import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { type SortBy, type User } from './types'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>('none')
  const [showReset, setShowReset] = useState(false)
  const [filterCountry, setFilterCountry] = useState<null | string>(null)

  const originalState = useRef<User[]>([])


  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === 'none' ? 'country' : 'none'
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    setUsers(originalState.current)
    setShowReset(false)
  }


  const filteredUsers = useMemo(() => {
    console.log('filter');

    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })) : users
  }, [users, filterCountry])

  const sortUsers = useMemo(() => {
    console.log('sort');

    if (sorting === 'none') return filteredUsers

    const compareProperties: Record<string, (user: User) => string> = {
      ['country']: user => user.location.country,
      ['name']: user => user.name.first,
      ['last']: user => user.name.last,
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })

    // return sorting === 'country' ?
    //   // [...filteredUsers].sort((a, b) => {
    //   //   return a.location.country.localeCompare(b.location.country)

    //   filteredUsers.toSorted((a, b) => {
    //     return a.location.country.localeCompare(b.location.country)
    //   }) : filteredUsers
  }, [filteredUsers, sorting])

  const handleDelete = (email: string) => {
    const filterUsers = users.filter((users) => users.email !== email)
    setUsers(filterUsers)
    setShowReset(true)
  }

  const changeSorting = (value:SortBy) => {
    setSorting(value)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
        originalState.current = res.results
      })
      .catch(err => {
        console.error(err);

      })
  }, [])

  return (
    <div>
      <h1>react test</h1>
      <header>
        <button onClick={toggleColors}>
          Color rows
        </button>
        <button onClick={toggleSortByCountry}>
          {sorting === 'none' ? 'Sort by country' : 'Show by default'}
        </button>
        {
          showReset &&
          <button onClick={handleReset}>Initial state</button>
        }
        <input
          type="text" placeholder='filter by country...'
          onChange={(e) => { setFilterCountry(e.target.value) }}
        />
      </header>
      <main>
        {
          <UsersList changeSorting={changeSorting} deleteUser={handleDelete} showColors={showColors} users={sortUsers} />
        }
      </main>
    </div>
  )
}

export default App
