const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Demo-Commerce</h5>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Demo-Commerce. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;