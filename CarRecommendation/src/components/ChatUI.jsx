import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import CarCard from "./CarCard";
import { sendChat } from "@/api";

export default function ChatUI({ preferences, initialMessages, initialCars, initialSuggestions }) {
  const [messages, setMessages] = useState(initialMessages);
  const [carsByMessage, setCarsByMessage] = useState({ [initialMessages.length - 1]: initialCars });
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    if (!text.trim() || loading) return;
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const data = await sendChat(preferences, newMessages);
      const updated = [...newMessages, { role: "assistant", content: data.reply }];
      setMessages(updated);
      if (data.cars?.length) {
        setCarsByMessage((prev) => ({ ...prev, [updated.length - 1]: data.cars }));
      }
      setSuggestions(data.suggested_questions || []);
    } catch (e) {
      setError("Something went wrong reaching the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4 pb-24">
      <div className="flex flex-col gap-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
            <Card className={m.role === "user" ? "bg-primary text-primary-foreground" : ""}>
              <CardContent className="p-3 text-sm whitespace-pre-wrap max-w-md">
                {m.content}
              </CardContent>
            </Card>
            {carsByMessage[i]?.length > 0 && (
              <div className="flex gap-3 overflow-x-auto mt-2 pb-2 w-full">
                {carsByMessage[i].map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="space-y-2 max-w-md">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )}

        {error && (
          <div className="text-sm text-destructive flex items-center gap-2">
            {error}
            <button
              className="underline"
              onClick={() => send(messages[messages.length - 1]?.content || "")}
            >
              Retry
            </button>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {suggestions.length > 0 && !loading && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((q, i) => (
            <button
              key={i}
              onClick={() => send(q)}
              className="text-xs border rounded-full px-3 py-1 hover:bg-accent transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-2 fixed bottom-0 left-0 right-0 bg-background border-t p-4 max-w-2xl mx-auto">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Ask a follow-up question..."
          disabled={loading}
        />
        <Button onClick={() => send(input)} disabled={loading}>
          Send
        </Button>
      </div>
    </div>
  );
}
