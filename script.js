let allUsers = [];
let isLoading = false;

async function loadUserData() {
  const apiEndpoint = "https://jsonplaceholder.typicode.com/users";
  const dataContainer = document.getElementById("userDataDisplay");

  isLoading = true;
  renderUsers([]);

  try {
    const response = await fetch(apiEndpoint);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    allUsers = await response.json();
    renderUsers(allUsers);
  } catch (error) {
    console.error(
      "There was a problem with the fetch operation:",
      error.message
    );
    dataContainer.innerHTML =
      "<p>Error fetching data. Please try again later.</p>";
  } finally {
    isLoading = false;
    renderUsers(allUsers);
  }
}

function renderUsers(users) {
  const dataContainer = document.getElementById("userDataDisplay");

  dataContainer.innerHTML = isLoading
    ? "<p>Loading data...</p>"
    : !users.length
    ? "<p>No users found or no data available.</p>"
    : users
        .map(
          (user) => `
        <div class="user-card">
            <h2>${user.name} (${user.username})</h2>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
            <div class="address">
                <h3>Address:</h3>
                <p>Street: ${user.address.street}</p>
                <p>Suite: ${user.address.suite}</p>
                <p>City: ${user.address.city}</p>
                <p>Zip: ${user.address.zipcode}</p>
            </div>
            <div class="company">
                <h3>Company:</h3>
                <p>Name: ${user.company.name}</p>
                <p>Catchphrase: ${user.company.catchPhrase}</p>
                <p>BS: ${user.company.bs}</p>
            </div>
        </div>
    `
        )
        .join("");
}

function filterUsers() {
  const searchTerm = document.getElementById("searchField").value.toLowerCase();
  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm)
  );
  renderUsers(filteredUsers);
}
