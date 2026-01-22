export const fetchUsers = async (page: number) => {
  const response = await fetch(`https://randomuser.me/api?results=10&seed=srpizza&page=${page}`)

  if (!response.ok) throw new Error('Error at the request')

  const data = await response.json()
  return {
    users: data.results,
    nextCursor: data.info.page + 1
  }
}