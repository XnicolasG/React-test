import type { SortBy, User } from "../types"
import '../App.css'
interface Props {
    changeSorting: (value: SortBy) => void
    deleteUser: (email: string) => void
    showColors: boolean
    users: User[]
}

export const UsersList = ({ changeSorting, deleteUser, showColors, users }: Props) => {
    return (
        <table width='100%'>
            <thead className="thead">
                <tr>
                    <th>Image</th>
                    <th onClick={() => changeSorting('name') }>Name</th>
                    <th onClick={() => changeSorting('last') }>Last name</th>
                    <th onClick={() => changeSorting('country') }>Location</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => {
                        const backgroundColor = index % 2 === 0 ? '#333' : '#555'
                        const color = showColors ? backgroundColor : 'transparent'
                        return (

                            <tr key={user.email} style={{ backgroundColor: color }}>
                                <td className="contImg">
                                    <img src={user.picture.thumbnail} alt={user.name.title} />
                                </td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td><button onClick={() => { deleteUser(user.email) }}>Delete</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
