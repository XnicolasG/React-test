import type { User } from "../types"

interface Props {
    showColors: boolean
    users: User[]
}

export const UsersList = ({ showColors, users }:Props) => {
    return (
        <table width='100%'>
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
                    users.map((user, index) => {
                        const backgroundColor = index % 2 === 0 ? '' : ''
                        return(

                        <tr key={user.id.value}>
                            <td>
                                <img src={user.picture.thumbnail} alt={user.name.title} />
                            </td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.location.country}</td>
                            <td>Delete</td>
                        </tr>
                    )})
                }
            </tbody>
        </table>
    )
}
