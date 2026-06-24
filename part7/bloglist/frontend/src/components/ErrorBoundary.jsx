import { Component } from 'react'
import styled from 'styled-components'

const FallbackContainer = styled.div`
  padding: 40px;
  background-color: #fff5f5;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  color: #c53030;
  max-width: 600px;
  margin: 40px auto;
  font-family: system-ui, sans-serif;
  text-align: center;
`

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <FallbackContainer>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message || 'An unexpected rendering error occurred.'}</p>
        </FallbackContainer>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
