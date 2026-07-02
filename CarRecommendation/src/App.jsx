import { useState } from "react";
import IntakeForm from "@/components/IntakeForm";
import ChatUI from "@/components/ChatUI";
import { sendChat } from "@/api";

// code function

export default function App() {
  const [preferences, setPreferences] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleIntakeSubmit = async (prefs) => {
    setLoading(true);
    setError(null);
    try {
      const useLabel = { city: "city commute", highway: "highway driving", mixed: "mixed driving", off_road: "off-road" }[prefs.primary_use];
      const userText = `Budget up to Rs.${prefs.budget_max}L, ${prefs.people} people usually travel, mainly ${useLabel}.${
        prefs.additional_requirements ? " " + prefs.additional_requirements : ""
      }`;
      const messages = [{ role: "user", content: userText }];
      const data = await sendChat(prefs, messages);
      const fullMessages = [...messages, { role: "assistant", content: data.reply }];
      setPreferences(prefs);
      setInitialData({
        messages: fullMessages,
        cars: data.cars || [],
        suggestions: data.suggested_questions || [],
      });
    } catch (e) {
      setError("Couldn't get recommendations. Please check the backend is running and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-2xl font-bold text-center mb-6">CarDekho Advisor</h1>

      {!initialData ? (
        <>
          <IntakeForm onSubmit={handleIntakeSubmit} loading={loading} />
          {error && <p className="text-destructive text-center mt-4 max-w-xl mx-auto">{error}</p>}
        </>
      ) : (
        <ChatUI
          preferences={preferences}
          initialMessages={initialData.messages}
          initialCars={initialData.cars}
          initialSuggestions={initialData.suggestions}
        />
      )}
    </div>
  );
}
