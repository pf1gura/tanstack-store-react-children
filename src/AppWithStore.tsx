import { Store, useStore } from "@tanstack/react-store";
import { useEffect, useId, type ReactNode } from "react";

const rowsStore = new Store<{ children: ReactNode; id: string }[]>([]);

export function AppWithStore() {
  return (
    <div>
      <SimpleRow text="Hello" />
      <SimpleRow text="world" />
      <RowRenderer />
    </div>
  );
}

function RowRenderer() {
  const rows = useStore(rowsStore);
  return rows.map((row) => <p key={row.id}>{row.children}</p>);
}

function SimpleRow({ text }: { text: string }) {
  const id = useId();

  console.log("Simple row re-rendered");

  useEffect(() => {
    rowsStore.setState((prev) => [...prev, { id, children: <>{text}</> }]);
    return () => {
      rowsStore.setState((prev) => prev.filter((row) => row.id !== id));
    };
  }, []);

  return null;
}
