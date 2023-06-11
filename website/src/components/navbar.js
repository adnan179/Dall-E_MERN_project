import { Link } from 'react-router-dom'

import { logo } from '../assets';
const Navbar = () => {
  return (
    <header className='w-full bg-white border-b 
    border-b-[#e6ebf4]
    sm:px-8 px-4 py-4 fixed'>
      <nav className='flex justify-between items-center'>
        {/* logo */}
        <Link to='/'>
          <img src={logo} alt='logo svg'
          className='w-28 object-contain' />
        </Link>
        
        {/* nav elements */}
        {/* <ul className='flex flex-row gap-8 font-pacifico text-xl'>
          <li>
            Sign up
          </li>
          <li>
            Login
          </li>
        </ul> */}
        <Link to='/post'>
          <button className='font-pacifico font-medium text-white
          bg-[#6469ff] px-4 py-2 rounded-lg'>
            Create
          </button>
        </Link>
      </nav>
    </header>
  )
}

export default Navbar;
