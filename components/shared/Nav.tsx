import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <header className="bg-slate-700 text-white py-4">
      <nav className="flex justify-between items-center containerStyles">
        <span>LOGO</span>
        <ul>
          <li>
            <Link href={"/admin"}>Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
