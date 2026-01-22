import { useMemo, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { type SortBy, type User } from './types'
import { useUsers } from './hooks/useUsers'


function App() {
  const {
    loading, 
    error, 
    allUsers,
    refetch,
    fetchNextPage,
    hasNextPage
  } = useUsers()

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>('none')
  const [showReset, setShowReset] = useState(false)
  const [filterCountry, setFilterCountry] = useState<null | string>(null)
  // const [currentPage, setCurrentPage] = useState(1)

  // const originalState = useRef<User[]>([])


  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === 'none' ? 'country' : 'none'
    setSorting(newSortingValue)
  }

  const handleReset = async () => {
    await refetch()
    // setShowReset(false)
  }


  const filteredUsers = useMemo(() => {
  if (!filterCountry || filterCountry.length === 0) return allUsers

  return allUsers.filter(user =>
    user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  )
}, [allUsers, filterCountry])

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
  }, [filteredUsers, sorting])

  const handleDelete = (email: string) => {
    //const filterUsers = users.filter((users) => users.email !== email)
    //setUsers(filterUsers)
    setShowReset(true)
  }

  const changeSorting = (value: SortBy) => {
    setSorting(value)
  }

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
          !loading && !error && allUsers.length === 0 ?
            <p>No users detected</p>
            :
            <UsersList changeSorting={changeSorting} deleteUser={handleDelete} showColors={showColors} users={sortUsers} />
        }
        {
          loading ? <p>Loading...</p>
            :
            error && <p>Something went wrong !!</p>
        }
        {
          !loading && !error && hasNextPage &&
          <button
            onClick={() => fetchNextPage()}
          >
            Show more data
          </button>
        }
      </main>
    </div>
  )
}

export default App
