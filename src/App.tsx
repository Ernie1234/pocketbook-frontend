import { useEffect } from "react";
import { Button } from "./components/ui/button";
import { useAuthStore } from "./store/authStore";

function App() {
  const { signup, error, isLoading } = useAuthStore();

  useEffect(() => {
    console.log(signup("josh", "anumahjoshuaeneye@gmail.com", "112342"));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button>Click me</Button>
    </>
  );
}

export default App;
