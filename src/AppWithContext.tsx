import { Store, useStore } from "@tanstack/react-store";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";

const RowsContext = createContext<{
  rows: { id: string; children: ReactNode }[];
  registerRow: (id: string, children: ReactNode) => void;
  unregisterRow: (id: string) => void;
} | null>(null);

function RowsProvider({ children }: { children: React.ReactNode }) {
  const [rows, setRows] = useState<{ id: string; children: ReactNode }[]>([]);

  const registerRow = useCallback((id: string, children: ReactNode) => {
    setRows((prev) => [...prev, { id, children }]);
  }, []);

  const unregisterRow = useCallback((id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  }, []);

  return (
    <RowsContext.Provider value={{ registerRow, unregisterRow, rows }}>
      {children}
    </RowsContext.Provider>
  );
}

export function AppWithContext() {
  return (
    <RowsProvider>
      <div>
        <SimpleRow text="Hello" />
        <SimpleRow text="world" />
        <RowRenderer />
      </div>
    </RowsProvider>
  );
}

function RowRenderer() {
  const context = useContext(RowsContext);
  return context?.rows.map((row) => <p key={row.id}>{row.children}</p>);
}

function SimpleRow({ text }: { text: string }) {
  const id = useId();
  const context = useContext(RowsContext);

  console.log("Simple row re-rendered");

  useEffect(() => {
    context?.registerRow(id, <>{text}</>);
    return () => {
      context?.unregisterRow(id);
    };
  }, []);

  return null;
}
