<script lang="ts">
  import { supabase } from "$lib/supabase"; // Import Supabase client
  

  // Reactive profile data
  let userProfile = {
    bgImage: "images/bg-img.png",
    profileImg: "images/profile-img.jpeg",
    username: "Ashish Chanchlani",
    handle: "@ashishchanchlani",
    location: "Mumbai, India",
    hobbies: ["Comedy", "Entertainment", "Social Media", "TikTok"],
    description: `Ashish Chanchlani is a famous Youtuber who recently started trending after his drastic weight loss. In the recent episode of Honestly Saying Podcast, Ashish opened up about his weight loss journey and what inspired him to lose weight and get into a healthy fitness routine`,
  };

  let showPopup = false;
  let editingTarget = ""; // 'bgImage' or 'profileImg'

  // Fetch profile data from Supabase
  async function fetchProfileData() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .limit(1) // Ensures only one row is returned
      .single(); // Expect exactly one row

    if (error) {
      console.error("Error fetching profile data:", error.message);
    } else {
      // Update the userProfile with fetched data
      userProfile = {
        ...userProfile,
        username: data.username || userProfile.username,
        handle: data.handle || userProfile.handle,
        location: data.location || userProfile.location,
        hobbies: data.hobbies ? data.hobbies.split(",") : userProfile.hobbies,
        description: data.description || userProfile.description,
        bgImage: data.bgImage || userProfile.bgImage,
        profileImg: data.profileImg || userProfile.profileImg,
      };
    }
  }

  function editProfile() {
    // Navigate to edit profile page (adjusting for Svelte routing)
    location.href = "/edit-profile";
  }

  function viewConnections() {
    // Handle viewing connections logic here
    alert("View connections clicked!");
  }

  function openEditPopup(target: string) {
    editingTarget = target;
    showPopup = true;
  }

  function closePopup() {
    showPopup = false;
  }

  function removeImage() {
    userProfile[editingTarget] = ""; // Clear the image
    closePopup();
  }

  function changeImage(event) {
    // Logic to change the image
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        userProfile[editingTarget] = reader.result as string;
        closePopup();
      };
      reader.readAsDataURL(file);
    }
  }

  // Real-time data listener for profile changes (you can also set up other triggers)
  function setupRealtime() {
    supabase
      .from("profiles")
      .on("UPDATE", (payload) => {
        console.log("Change received!", payload);
        // Update user profile with the real-time data
        userProfile = {
          ...userProfile,
          username: payload.new.username || userProfile.username,
          handle: payload.new.handle || userProfile.handle,
          location: payload.new.location || userProfile.location,
          hobbies: payload.new.hobbies
            ? payload.new.hobbies.split(",")
            : userProfile.hobbies,
          description: payload.new.description || userProfile.description,
          bgImage: payload.new.bgImage || userProfile.bgImage,
          profileImg: payload.new.profileImg || userProfile.profileImg,
        };
      })
      .subscribe();
  }

  // Fetch profile data when the component is mounted
  import { onMount } from "svelte";
  onMount(() => {
    fetchProfileData();
    setupRealtime(); // Set up the real-time listener
  });
</script>

<div class="profile-page">
  <div class="edit-container">
    <img src={userProfile.bgImage} alt="Background Image" class="bg-image" />
    <button
      class="edit-icon"
      on:click={() => openEditPopup("bgImage")}
      title="Edit Background">✏️</button
    >
  </div>
  <div class="profile-container">
    <div class="edit-container">
      <img
        src={userProfile.profileImg}
        alt="Profile Picture"
        class="profile-img"
      />
      <button
        class="edit-icon-profile"
        on:click={() => openEditPopup("profileImg")}
        title="Edit Profile Picture">✏️</button
      >
    </div>
    <div class="username">{userProfile.username}</div>
    <div class="handle">{userProfile.handle}</div>
    <div class="location">{userProfile.location}</div>
    <div class="hobbies-container">
      {#each userProfile.hobbies as hobby}
        <span class="hobby-badge">{hobby}</span>
      {/each}
    </div>
    <div class="description">{userProfile.description}</div>
    <div class="button-container">
      <button class="btn btn-edit" on:click={editProfile}>Edit Profile</button>
      <button class="btn btn-view" on:click={viewConnections}
        >View Connections</button
      >
    </div>
  </div>

  {#if showPopup}
    <div class="popup-overlay" on:click={closePopup}></div>
    <div class="popup">
      <h3>Edit Image</h3>
      <button on:click={removeImage}>Remove Image</button>
      <input type="file" accept="image/*" on:change={changeImage} />
      <button on:click={closePopup}>Close</button>
    </div>
  {/if}
</div>

<style>
  /* Profile */
.profile-page {
  max-width: 600px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  font-family: Arial, sans-serif;
}
.bg-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.profile-container {
  padding: 20px;
  text-align: center;
}
.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: -50px;
  border: 4px solid white;
  object-fit: cover;
}
.username {
  font-size: 1.5em;
  font-weight: bold;
}
.handle,
.location {
  color: #666;
}
.hobbies-container {
  margin: 15px 0;
}
.hobby-badge {
  display: inline-block;
  padding: 5px 10px;
  background: #e0e0e0;
  border-radius: 15px;
  margin: 5px;
  font-size: 0.9em;
}
.description {
  margin-top: 15px;
}
.button-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn-edit {
  background: transparent;
  border: rgb(40, 121, 226) solid 1px;
  color: rgb(40, 121, 226);
  font-weight: bolder;
  border-radius: 30px;
}
.btn-view {
  background: transparent;
  border: rgb(40, 121, 226) solid 1px;
  color: rgb(40, 121, 226);
  font-weight: bolder;
  border-radius: 30px;
}
.edit-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  font-size: 1.2em;
}
.edit-icon-profile {
  position: absolute;
  top: 15px;
  left: 300px;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  font-size: 1.2em;
}
.edit-container {
  position: relative;
}
/* Popup Styling */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}


.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}


.popup button {
  margin: 5px;
  padding: 8px 12px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.popup button:first-of-type {
  background: #e74c3c;
  color: white;
}
.popup button:last-of-type {
  background: #007bff;
  color: white;
}

@media (max-width: 768px) {
  .profile-page {
    max-width: 100%;
    margin: 0 10px;
    border: none;
    border-radius: 5px;
  }

  .bg-image {
    height: 150px;
  }

  .profile-container {
    padding: 15px;
  }

  .profile-img {
    width: 80px;
    height: 80px;
    margin-top: -40px;
    border: 3px solid white;
  }

  .username {
    font-size: 1.2em;
  }

  .hobby-badge {
    font-size: 0.8em;
    padding: 3px 8px;
  }

  .button-container {
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
  }

  .btn {
    padding: 8px 15px;
    width: 100%;
  }

  .edit-icon,
  .edit-icon-profile {
    font-size: 1em;
    padding: 4px;
  }

  .edit-icon-profile {
    left: 60%;
    transform: translateX(-50%);
  }

  .popup {
    width: 90%;
  }
}
</style>