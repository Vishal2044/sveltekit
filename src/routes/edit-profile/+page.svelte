<script lang="ts">
  import { supabase } from '$lib/supabase'; // Import Supabase client
  import "../../app.css";

  let updatedProfile = {
    username: '',
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
    <label for="username">Username:</label>
    <input type="text" id="username" bind:value={updatedProfile.username} required />

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
