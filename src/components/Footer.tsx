const Footer = () => {
  return (
    <>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <aside className="flex flex-col justify-between h-full p-1">
          <div className="text-3xl font-bold">
            <span className="text-gray-700">Verif</span>
            <span className="text-accent">Ed</span>
          </div>
          <p className=" italic">
            VeriEd Solutions Ltd.
            <br />
            Providing revolutionary solutions for the education sector using
            blockchain.
          </p>
          <div className="">
            <p>
              Copyright © 2024 - All right reserved by VeriEd Solutions Ltd.
            </p>
          </div>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
