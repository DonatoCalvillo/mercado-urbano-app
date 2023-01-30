import  AuthUser  from './auth/index';
import Home from './home';

export default function index() {
  
  const getWeek = () => {
    const day = new Date().getDay();
    const date = Date.now();
    console.log(date.toString())
    if( day < 4 )
      
    return day;
  }

  return (
    <>
    <Home/>
      {/* <AuthUser /> */}
    </>
  )
}
