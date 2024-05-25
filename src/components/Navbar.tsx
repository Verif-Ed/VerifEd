const Navbar = () => {
  return (
    <div className="navbar fixed top-0 w-full z-50 bg-slate-800 text-white">
      <div className="navbar-start">
        <a href="/" className="text-lg font-bold p-2">
          VerifEd {/* Add your logo here */}
        </a>
      </div>
      <div className="navbar-end text-center">
        <ul className="menu menu-horizontal px-0 ">
          <li>
            <a href="/">Home</a>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
