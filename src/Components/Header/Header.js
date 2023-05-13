import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';
import { getAuth,signOut } from 'firebase/auth';
function Header() {
  const {user} = useContext(AuthContext)
  const auths =getAuth()
  const navigate = useNavigate()
  const handleSignOut = ()=>{
      signOut(auths).then(()=>{
        navigate('/login')
      })
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
   
          <span>{user ? `Welcome  ${user.displayName}`:'Login'}</span>
          <hr />
        </div>
        {user && <span onClick={handleSignOut}>logout</span> }
        <div className="sellMenu"  style={{marginRight:'30px'}}>
          <SellButton></SellButton>
          <div className="sellMenuContent" onClick={()=>navigate('/create')}>
            <SellButtonPlus></SellButtonPlus>
            
            <span >SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
