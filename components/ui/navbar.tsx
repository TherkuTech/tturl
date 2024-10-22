import Image from "next/image";
import logo from "../../assets/logo.png";
import Link from "next/link";

const Navbar = () => {

  return (
    <div className="relative">
      <div className="fixed z-20 top-8 left-0 right-0 mx-auto w-[90%] sm:w-full sm:max-w-[550px] bg-white text-black p-2 rounded-xl shadow-sm">
        <div className="flex items-center justify-between transition duration-500">
          <Link className="flex items-center gap-2" href="/">
            <Image src={logo} alt="logo" className="h-[30px] w-[30px] rounded-full" />
            <div className="font-semibold">TTURL</div>
          </Link>
          <Link className="font-semibold pr-4 text-[#c0c0c0] hover:text-[#333]" href={"https://github.com/TherkuTech/tturl"}>
            Github
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
