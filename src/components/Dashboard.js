import { useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
function Dashboard() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(useAuth());
  const { currentUser, logout } = useAuth();
  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Nie udało się wylogowwać");
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          {" "}
          <h2 className="text-center mb-4">Profil</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Aktualizuj profil
          </Link>
        </Card.Body>
      </Card>
      ;
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}

export default Dashboard;
