import { useState } from "react";
import Reentrancy from "./components/Reentrancy";
import AccessControl from "./components/AccessControl";
import Overflow from "./components/Overflow";
import "./App.css";

function App() {
  const [active, setActive] = useState("access");
  const [logs, setLogs] = useState([
    "System initialized",
    "Waiting for user action...",
  ]);

  const addLog = (msg) => {
    setLogs((prev) => [msg, ...prev.slice(0, 5)]);
  };

  const renderComponent = () => {
    const props = { addLog };

    if (active === "reentrancy") return <Reentrancy {...props} />;
    if (active === "overflow") return <Overflow {...props} />;
    return <AccessControl {...props} />;
  };

  return (
    <div className="layout">
      
      {/* Sidebar */}
      <div className="sidebar">
        <h2>⚡ AuditX</h2>

        <button
          className={active === "reentrancy" ? "active" : ""}
          onClick={() => {
            setActive("reentrancy");
            addLog("Switched to Reentrancy module");
          }}
        >
          Reentrancy
        </button>

        <button
          className={active === "access" ? "active" : ""}
          onClick={() => {
            setActive("access");
            addLog("Switched to Access Control module");
          }}
        >
          Access Control
        </button>

        <button
          className={active === "overflow" ? "active" : ""}
          onClick={() => {
            setActive("overflow");
            addLog("Switched to Overflow module");
          }}
        >
          Overflow
        </button>
      </div>

      {/* Main */}
      <div className="main">

        {/* Topbar */}
        <div className="topbar">
          <span className="badge">🟢 Localhost</span>
          <span className="badge">👛 Wallet Connected</span>
        </div>

        {/* Content */}
        <div className="content">
          
          {/* Main Card */}
          <div className="card">
            {renderComponent()}
          </div>

          {/* Logs Panel */}
          <div className="logs">
            <h3>📜 Activity Logs</h3>
            {logs.map((log, i) => (
              <p key={i}>• {log}</p>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;