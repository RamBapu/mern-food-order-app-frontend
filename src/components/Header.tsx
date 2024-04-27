import { Link } from "react-router-dom"
import MobileNav from "./MobileNav"
import MainNav from "./MainNav"

const Header = () => {
  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold tracking-tight text-orange-500"
        >
          Eatables
        </Link>

        <div className="sm:hidden">
          <MobileNav />
        </div>
        <div className="hidden sm:block">
          <MainNav />
        </div>
      </div>
    </div>
  )
}

export default Header
