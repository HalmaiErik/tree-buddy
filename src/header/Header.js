import './Header.css'
import Navigation from './Navigation/Navigation';
import MetamaskConnection from './MetamaskConnection/MetamaskConnection';
import Logo from './Logo/Logo';

const Header = () => {
  return (
    <header>
      <Logo />

      <Navigation />
      
      <MetamaskConnection />
    </header>
  )
}

export default Header
