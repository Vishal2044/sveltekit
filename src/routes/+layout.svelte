<nav>
  <a class="logo" href="/">bigbell</a>
  <div class="nav-links">
    <a href="/">Home</a>
    <a href="/login">Login</a>
    <a href="/signup">Signup</a>
  </div>
</nav>

<style>
  /* General reset for margin and padding */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Styling for the navigation bar */
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 30px;
    background-color: #f8f9fa;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
  }

  /* Logo styling */
  .logo {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.8em;
    font-weight: bold;
    color: #333;
    text-decoration: none;
    transition: color 0.3s;
  }

  .logo:hover {
    color: #0a66c2;
  }

  /* Navigation links styling */
  .nav-links {
    display: flex;
    gap: 20px;
  }

  .nav-links a {
    font-size: 1em;
    color: #555;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
  }

  .nav-links a:hover {
    background-color: #0a66c2;
    color: white;
  }

  /* Responsive design for smaller screens */
  @media (max-width: 768px) {
    nav {
      flex-direction: column;
      align-items: flex-start;
    }

    .nav-links {
      flex-direction: row;
      width: 100%;
      gap: 10px;
    }

    .nav-links a {
      width: 100%;
      text-align: left;
      padding-left: 0;
    }
  }
</style>

<slot />
