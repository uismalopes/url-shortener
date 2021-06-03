import React, { useState } from 'react'
import { Button, Col, Container, Jumbotron, Row, Spinner } from 'react-bootstrap';
import api from '../../services/api';


interface IResponseData {
  createdAt: string
  link: string
  short: string
  updatedAt: string
}

export default function Home () {
  const [url, setUrl] = useState('')
  const [response, setResponse] = useState({} as IResponseData)
  const [loading, setLoading] = useState(false)

  async function submitForm (e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post<IResponseData>('new', { url })
      setResponse(data)
    } catch (error) {
      
    }
    setLoading(false)
  }
  return (
    <Container>
        <div className="mt-4">
          <Jumbotron>
            <h1>Encurtador de URL</h1>
            <form onSubmit={submitForm} className="mt-4">
              <Row>
                <Col>
                  <div className="form-group">
                    <input type="url" className="form-control" required onChange={(e) => setUrl(e.target.value)} />
                  </div>
                </Col>
                <Col lg={2}>
                  <Button type="submit" variant="warning" block>
                    Encurtar
                  </Button>
                </Col>
              </Row>
            </form>
            {
              loading ? (
                <div className="text-center">
                  <span className="mr-3 h2 font-weight-bold d-block">Encurtando...</span>
                  <Spinner animation="border" />
                </div>
              ) : JSON.stringify(response.short)
            }
          </Jumbotron>
        </div>
      </Container>
  )
}