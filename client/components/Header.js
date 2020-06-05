import Link from "next/link";

export default ({ currentUser }) => {
  return (
    <nav className="navbar navbar-ligh bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {currentUser ? (
            <Link href="/auth/signout">
              <a className="nav-link">Logout</a>
            </Link>
          ) : (
            <>
              <Link href="/auth/signin">
                <a className="nav-link">Login</a>
              </Link>
              <Link href="/auth/signup">
                <a className="nav-link">Sign Up</a>
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
