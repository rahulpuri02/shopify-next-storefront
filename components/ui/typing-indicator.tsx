import { Dot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="justify-left flex space-x-1">
      <div className="bg-muted rounded-lg p-3">
        <div className="flex -space-x-2.5">
          <Dot className="h-5 w-5 animate-bounce [animation-duration:1.04s]" />
          <Dot className="h-5 w-5 animate-bounce [animation-delay:0.195s] [animation-duration:1.04s]" />
          <Dot className="h-5 w-5 animate-bounce [animation-delay:0.39s] [animation-duration:1.04s]" />
        </div>
      </div>
    </div>
  );
}
