// 1. We tell the component to expect a prop called 'onLogout'
function Header({ onLogout }) {
    return (
        <header>
            <h1>My Task Manager App</h1>

            {/* 2. Here is the new button. It calls the 'onLogout'
             function when it's clicked. */}
            <button onClick={onLogout}>Logout</button>

        </header>
    );
}

export default Header;
