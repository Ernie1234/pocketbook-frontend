import { Button } from "@/components/ui/button";

export default function TransButtons() {
  return (
    <div className="flex gap-3">
      <Button
        onClick={() => {}}
        size="lg"
        className="border-2 border-green-600 bg-transparent hover:bg-green-600 rounded-full text-green-600 hover:text-white transition-all duration-500"
      >
        Send
      </Button>
      <Button
        onClick={() => {}}
        size="lg"
        className="border-2 border-green-600 bg-transparent hover:bg-green-600 rounded-full text-green-600 hover:text-white transition-all duration-500"
      >
        Receive
      </Button>
    </div>
  );
}
