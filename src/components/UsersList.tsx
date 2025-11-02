import type { User } from "../types"

interface Props {
    users: User[]
}

export const UsersList = ({ users }:Props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Last name</th>
                    <th>Location</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user) => (

                        <tr key={user.id.value}>
                            <td>
                                <img src={user.picture.thumbnail} alt={user.name.title} />
                            </td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.location.country}</td>
                            <td>Delete</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
