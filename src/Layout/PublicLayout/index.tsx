import { Outlet } from 'react-router-dom'
import  Navbar  from '../../Navbar';

const PublicLayout = () => {

    return (
        <>
        <Navbar />
        <div>
           
            <Outlet />
            <div>Footer</div>
        </div>
        </>
    )
}

export default PublicLayout