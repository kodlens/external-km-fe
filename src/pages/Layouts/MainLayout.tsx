//import { Header } from './Header'
import Navbar from '../../components/Navbar'
import { Footer } from './Footer'
import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout