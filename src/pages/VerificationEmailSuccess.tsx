import { useLocation } from "react-router-dom";

export default function VerificationEmailSuccess() {
  const location = useLocation();

  // Function to parse query parameters
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();
  const email = query.get("email"); // Get the name from the query string

  return (
    <div>
      VerificationEmailSuccess
      <p>{email}</p>
    </div>
  );
}
