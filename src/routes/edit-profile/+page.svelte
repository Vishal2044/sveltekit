<script lang="ts">
  import { supabase } from '$lib/supabase'; // Import Supabase client
  

  let updatedProfile = {
    username: '',
    handle: '', // New handle field added here
    location: '',
    hobbies: '',
    description: ''
  };

  // Function to handle form submission
  async function handleFormSubmit(event: Event) {
    event.preventDefault();

    // Convert hobbies string into an array by splitting at commas
    const hobbiesArray = updatedProfile.hobbies.split(',').map(hobby => hobby.trim());

    // Insert the profile data into Supabase, using the updated hobbies array as a string
    const { data, error } = await supabase
      .from('profiles')
      .upsert([{ ...updatedProfile, hobbies: hobbiesArray.join(', ') }]);

    if (error) {
      console.error('Error updating profile:', error.message);
    } else {
      console.log('Profile Updated:', data);
      location.href = '/profile'; // Redirect back to profile page after saving
    }
  }

  // Function to display hobbies as an array
  function getHobbiesArray() {
    return updatedProfile.hobbies.split(',').map(hobby => hobby.trim()).filter(hobby => hobby.length > 0);
  }
</script>

<div class="edit-profile-page">
  <h2>Edit Profile</h2>
  <form on:submit={handleFormSubmit}>
    <label for="username">Name:</label>
    <input type="text" id="username" bind:value={updatedProfile.username} required />

    <!-- New Handle Field -->
    <label for="handle">Username:</label>
    <input type="text" id="handle" bind:value={updatedProfile.handle} required />

    <label for="location">Location:</label>
    <input type="text" id="location" bind:value={updatedProfile.location} />

    <label for="hobbies">Hobbies (comma separated):</label>
    <input
      type="text"
      id="hobbies"
      bind:value={updatedProfile.hobbies}
      placeholder="e.g., Comedy, Music, Travel(Add coma for second hobby)"
    />

    <div>
      <label>Current Hobbies:</label>
      <ul>
        {#each getHobbiesArray() as hobby}
          <li>{hobby}</li>
        {/each}
      </ul>
    </div>

    <label for="description">Description:</label>
    <textarea id="description" bind:value={updatedProfile.description} rows="5"></textarea>

    <button type="submit" class="btn-save">Save Changes</button>
  </form>
</div>

<style>
  /* Edit Profile */

.edit-profile-page {
  max-width: 500px;
  margin: 30px auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Title styling */
.edit-profile-page h2 {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

/* Label and input styling */
label {
  font-size: 1rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 5px;
  display: block;
}

/* Input fields */
input,
textarea {
  width: 100%;
  padding: 12px;
  margin: 10px 0 20px;
  border: 1px solid #000000;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #fff;
  box-sizing: border-box;
  transition: border-color 0.3s ease-in-out;
}

/* Focus effect on inputs */
input:focus,
textarea:focus {
  border-color: #007bff;
  outline: none;
}

/* Button styling */
.btn-save {
  padding: 12px 25px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  text-align: center;
}

.btn-save:hover {
  background-color: #0056b3;
}

/* Hobbies list styling */
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  background-color: #e7f1ff;
  padding: 8px;
  margin: 5px 0;
  border-radius: 6px;
  color: #555;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-block;
  margin-right: 10px;
}

/* Responsive design */
@media (max-width: 768px) {
  .edit-profile-page {
    padding: 20px;
    margin: 20px;
  }

  .btn-save {
    font-size: 0.9rem;
  }
}

/* Login */

.container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
.form-container {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5%;
  text-align: center;
  margin: auto;
  background: rgb(0, 0, 0);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.logo {
  max-width: 300px;
  margin-bottom: 5px;
}
.input-container {
  position: relative;
  width: 90%;
  margin: 10px 0;
}
input {
  padding: 15px;
  width: 100%;
  border: 1px solid #000000;
  border-radius: 5px;
  background-color: transparent;
  color: #000000;
}
.toggle-password {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #ffffff;
  font-size: 18px;
}

button {
  padding: 10px;
  width: 90%;
  background: rgba(234, 241, 7, 0.859);
  color: rgb(0, 0, 0);
  border: none;
  font-weight: bold;
  border-radius: 3px;
  margin-top: 10px;
}
.divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
}
.divider::before,
.divider::after {
  content: "";
  flex-grow: 1;
  height: 2px;
  background-color: #ffffff;
  margin: 0 10px;
}
.divider span {
  font-weight: bold;
  color: #fffafa;
}
.social-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.social-buttons button {
  padding: 10px;
  flex: 1;
  max-width: 48%;
  margin: 0;
  border: none;
  border-radius: 3px;
}
.error {
  color: red;
  margin-top: 10px;
}
.signup-link {
  margin-top: 15px;
}
.signup-link a {
  color: #ffffff;
  text-decoration: none;
}
.signup-link span {
  color: blue;
  font-weight: bolder;
}
/* Media Query for Mobile */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    padding: 10px;
  }
  .form-container {
    max-width: 100%;
    padding: 15px;
    border-radius: 10px;
  }
  .logo {
    max-width: 80%;
  }
  input,
  button {
    width: 90%;
  }
  .social-buttons {
    flex-direction: column;
    gap: 5px;
  }
  .social-buttons button {
    max-width: 100%;
    width: 100%;
  }
  .divider::before,
  .divider::after {
    margin: 0 5px;
  }
}
</style>
