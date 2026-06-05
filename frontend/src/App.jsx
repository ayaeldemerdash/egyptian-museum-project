import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/chatbot/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        statue_id: 1,
      }),
    });

    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Statue Chat 🤖</h1>

      <input
        type="text"
        placeholder="Ask something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>

      <h3>Response:</h3>
      <p>{response}</p>
    </div>
  );
}

export default App;