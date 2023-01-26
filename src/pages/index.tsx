import { AuthUser } from './auth/index';

export default function Home() {
  
  const getWeek = () => {
    const day = new Date().getDay();
    const date = Date.now();
    console.log(date.toString())
    if( day < 4 )
      
    return day;
  }

  return (
    <>
      
      <AuthUser />
    </>
  )
}
