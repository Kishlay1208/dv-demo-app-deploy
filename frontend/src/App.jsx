import { useState, useEffect } from "react";

function App() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [error, setError] = useState("");

  // Fetch date and time from backend on mount and every second
  useEffect(() => {
    const fetchDateTime = async () => {
      try {
        const res = await fetch("/api/datetime");
        const data = await res.json();
        setDate(data.date);
        setTime(data.time);
      } catch (err) {
        console.error("Failed to fetch date/time:", err);
      }
    };

    fetchDateTime();
    const interval = setInterval(fetchDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGreeting("");
    setError("");

    try {
      const res = await fetch("/api/greet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();

      if (res.ok) {
        setGreeting(data.message);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Could not connect to server");
    }
  };

  return (
    <div className="container">
      <h1>Full Stack App</h1>

      <div className="datetime-section">
        <p>
          Date: <span>{date || "Loading..."}</span>
        </p>
        <p>
          Time: <span>{time || "Loading..."}</span>
        </p>
      </div>

      <form className="form-section" onSubmit={handleSubmit}>
        <label htmlFor="nameInput">What is your name?</label>
        <input
          id="nameInput"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {greeting && <div className="greeting">{greeting}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
