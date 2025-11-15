import IdContext from "./creation";
export default function IdProvider({ value, children }) {
  return (
    <IdContext.Provider value={value}>
      {children}
    </IdContext.Provider>
  );
}
