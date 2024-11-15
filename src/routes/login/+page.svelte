<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import "../../app.css";


  let email = '';
  let password = '';
  let errorMessage = '';
  let showPassword = false;

  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      errorMessage = error.message;
    } else {
      const user = data.user;
      if (user) {
        goto('/edit-profile');
      } else {
        errorMessage = 'User not found';
      }
    }
  }

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }
</script>



<head> 
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
</head>
<div class="container">
  <div class="form-container">
    <img src="images/logo.png" alt="Company Logo" class="logo" />
    <h2>Login</h2>
    <form on:submit|preventDefault={handleLogin}>
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
          type={showPassword ? 'text' : 'password'}
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
      <button type="submit">Login</button>
    </form>

    <div class="divider">
      <span>Login with</span>
    </div>

    <div class="social-buttons">
      <button style="background: #4285F4; color: white;">Login with Google</button>
      <button style="background: #3b5998; color: white;">Login with Facebook</button>
    </div>

    <div class="signup-link">
      <a href="/signup">Don't have an account?<span> Signup Now</span></a>
    </div>

    {#if errorMessage}
      <div class="error">{errorMessage}</div>
    {/if}
  </div>
</div>
