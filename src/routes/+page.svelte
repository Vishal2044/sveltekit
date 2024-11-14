<script lang="ts">
    import { supabase } from "$lib/supabase";


  let email = "";
  let errorMessage = "";

  async function handleContinueWithGoogle() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        alert('Error signing in with Google: ' + error.message);
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  }

  function handleSigninWithEmail() {
    if (!email) {
      errorMessage = "Please enter an email.";
    } else {
      // Logic for handling email sign-in (not implemented)
      alert("Email authentication not set up.");
    }
  }
</script>

<style>
  /* Base container styling */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;    
    font-family: 'Poppins', sans-serif;
    padding: 20px;  
    color: #000000;
  }

  /* Responsive Layout */
  @media (min-width: 768px) {
    .container {
      flex-direction: row;
    }
    .left-section
     {
      flex: 1;
      padding: 40px;
      max-width: 500px;
    }
  }

  /* Left Section Styling */
  .left-section {
    margin-top: 100px;
    padding: 20px;
    text-align: center;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .left-section h2 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 15px;
    color: #0a66c2;
  }

  .description {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
    color: #555;
  }

  .button {
    padding: 12px 20px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    margin-bottom: 10px;
    width: 100%;
    max-width: 300px;
    text-transform: uppercase;
  }

  .google-button {
    background-color: #0a66c2;
    color: white;
    font-weight: bold;
  }

  .google-button:hover {
    background-color: #004182;
  }



  /* Responsive Typography */
  @media (max-width: 768px) {
    h2 {
      font-size: 24px;
    }
    .description {
      font-size: 14px;
    }
  }
</style>

<div class="container">
  <div class="left-section">
    <h2>Welcome to Bigbell Community</h2>
    <p class="description">Connect, collaborate, and grow your network. Join now and start building meaningful connections.</p>
    <button class="button google-button" on:click={handleContinueWithGoogle}>
      Continue with Google
    </button>
    <button class="button google-button" on:click={() => window.location.href = '/signup'}>
      Sign Up
    </button>    
  </div>
</div>
