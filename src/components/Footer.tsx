export function Footer() {
  return (
    <footer className="footer py-5" id="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <p className="copyright-text text-center">
              &copy; {new Date().getFullYear()} Adam Colyer. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
