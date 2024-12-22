const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-100 ">
      <div className="logo w-1/5 ">
        <div className="font-bold text-xl">Admin.</div>
      </div>
      <ul className="flex items-center justify-between gap-16">
        <li>
          <a>Home</a>
        </li>
        <li>
          <a>About</a>
        </li>
        <li>
          <a>Contact</a>
        </li>
        <li>
          <a>Signup</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
