import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Sprawdź swoją skrzynkę pocztową w celu zresetowania hasła");
    } catch {
      setError("nie udało się zresetować hasła");
    }

    setLoading(false);
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Resetowanie Hasła</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Zresetuj Hasło
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Zaloguj się</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Potrzebujesz konta? <Link to="/signup">Zarejestruj się</Link>
      </div>
    </>
  );
}

export default ForgotPassword;
