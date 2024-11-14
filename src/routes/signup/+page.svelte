<script lang="ts">
  import { supabase } from "$lib/supabase";
  import "../../app.css";


  let name = "";
  let email = "";
  let password = "";
  let errorMessage = "";
  let showPassword = false;

  async function handleSignup() {
    if (!name || !email || !password) {
      errorMessage = "Please fill in all fields";
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      errorMessage = error.message;
    } else {
      const { error: dbError } = await supabase
        .from("users")
        .insert([{ name, email, password }]);

      if (dbError) {
        errorMessage = "Error saving user data to database: " + dbError.message;
      } else {
        alert("Signup successful! You can now log in.");
        // Redirect to login page after successful signup
        window.location.href = "/login";
      }
    }
  }

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }
</script>

<head>
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    rel="stylesheet"
  />
</head>

<div class="container">
  <div class="form-container">
    <img src="images/logo.png" alt="Company Logo" class="logo" />
    <h2>Signup</h2>
    <form on:submit|preventDefault={handleSignup}>
      <div class="input-container">
        <input
          type="text"
          placeholder="Enter your name"
          bind:value={name}
          required
        />
      </div>
      <div class="input-container">
        <input
          type="email"
          placeholder="Enter your email"
          bind:value={email}
          required
        />
      </div>
      <div class="input-container">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          bind:value={password}
          required
        />
        <span class="toggle-password" on:click={togglePasswordVisibility}>
          {#if showPassword}
            <i class="fas fa-eye-slash"></i>
          {:else}
            <i class="fas fa-eye"></i>
          {/if}
        </span>
      </div>
      <button type="submit">Signup</button>
    </form>

    <div class="divider">
      <span>Signup with</span>
    </div>

    <div class="social-buttons">
      <button style="background: #4285F4; color: white;">Signup with Google</button>
      <button style="background: #3b5998; color: white;">Signup with Facebook</button>
    </div>

    <div class="login-link">
      <a href="/login">Already have an account? <span> Log in Now</span></a>
    </div>

    {#if errorMessage}
      <div class="error">{errorMessage}</div>
    {/if}
  </div>
</div>


