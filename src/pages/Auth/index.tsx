import useAuth from './hooks/useAuth'

const Auth = () => {
  const { isLoading } = useAuth()
  return (
    <div>
        {isLoading && (
            <p>Loading ...</p>
        )}
    </div>
  )
}

export default Auth