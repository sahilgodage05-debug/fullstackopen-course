import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import useUserStore from '../stores/userStore'

const Container = styled.div`
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', system-ui, sans-serif;
  color: #2d3748;
`

const Title = styled.h2`
  color: #1a202c;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 800;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`

const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  border-bottom: 2px solid #edf2f7;
  color: #718096;
  font-weight: 700;
  font-size: 14px;
`

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #edf2f7;
  font-size: 15px;
`

const StyledLink = styled(Link)`
  color: #3182ce;
  text-decoration: none;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`

const UsersList = () => {
  const users = useUserStore(state => state.users)
  const fetchUsers = useUserStore(state => state.fetchUsers)

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <Container>
      <Title>Users</Title>
      <Table>
        <thead>
          <tr>
            <Th>User</Th>
            <Th>Blogs Created</Th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <Td>
                <StyledLink to={`/users/${u.id}`}>{u.name}</StyledLink>
              </Td>
              <Td>{u.blogs?.length || 0}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default UsersList
