const App = () => {
    const user = JSON.parse(localStorage.getItem("profile")).account;

    return ( 
        <div>{user.username} </div>
     );
}
 
export default App;