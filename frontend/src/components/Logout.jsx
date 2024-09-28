import { useNavigate } from 'react-router-dom';
import {useUserStore} from "../store/user.js";

const Logout = () => {
    const navigate = useNavigate();
    const {isLogged, setLogoutState} = useUserStore()

    const handleLogout = async (e) => {
        e.preventDefault();
        // You can handle the logout logic here (e.g., calling an API, clearing tokens, etc.)
        // await fetch('/logout', {
        //     method: 'POST',
        // });

        localStorage.removeItem('token');
        setLogoutState(false)
        navigate('/login');
    };

    return (
        <form onSubmit={handleLogout}>
            <button type="submit">
                Logout
            </button>
        </form>
    );
};

export default Logout