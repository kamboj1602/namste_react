import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.error(err);

  return (
    <main className="page-layout error-page">
      <section className="page-panel">
        <h1>Oops!</h1>
        <p>Something went wrong while loading this page.</p>
        <p className="error-message">
          {err?.statusText || err?.message || "Page could not be displayed."}
        </p>
        <Link to="/" className="secondary-btn">
          Back to Home
        </Link>
      </section>
    </main>
  );
};

export default Error;
