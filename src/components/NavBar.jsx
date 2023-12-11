function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>Movies123</h1>
    </div>
  );
}

function Search({ query, onSetQuery }) {
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search Movies..."
        value={query}
        onChange={(e) => onSetQuery(e.target.value)}
      />
    </>
  );
}

function Result({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export default Navbar;

export { Logo, Search, Result };
