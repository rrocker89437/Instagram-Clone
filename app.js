const posts = [
  {
    id: 1,
    name: "Vincent van Gogh",
    username: "vincey1853",
    location: "Zundert, Netherlands",
    avatar: "images/avatar-vangogh.jpg",
    post: "images/post-vangogh.jpg",
    comment: "just took a few mushrooms lol",
    likes: 21,
  },
  {
    id: 2,
    name: "Gustave Courbet",
    username: "gus1819",
    location: "Ornans, France",
    avatar: "images/avatar-courbet.jpg",
    post: "images/post-courbet.jpg",
    comment: "i'm feelin a bit stressed tbh",
    likes: 4,
  },
  {
    id: 3,
    name: "Joseph Ducreux",
    username: "jd1735",
    location: "Paris, France",
    avatar: "images/avatar-ducreux.jpg",
    post: "images/post-ducreux.jpg",
    comment:
      "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
    likes: 152,
  },
];

const feedEl = document.getElementById("content-feed");

function renderPosts() {
  if (!feedEl) {
    console.error("Element with ID 'content-feed' not found.");
    return;
  }
  feedEl.innerHTML = "";

  posts.forEach((post) => {
    const postHTML = `
      <section class="user-content" data-id="${post.id}">
        <div class="wrapper">
          <div class="flex ai-c padding-10">
            <img class="user-profile-img" width="34" height="34" src="${post.avatar}" alt="Profile Picture" />
            <div class="user-info flex jc-c">
              <h1 class="main-user">${post.name}</h1>
              <h2 class="main-user--location">${post.location}</h2>
            </div>
          </div>
        </div>

        <img class="user-post-img" width="375" height="375" src="${post.post}" alt="Post Image" data-id="${post.id}" />

        <div class="wrapper">
          <div class="icons flex ai-c padding-20">

            <button class="like-btn" data-id="${post.id}">
              <svg class="icon-heart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1)">
                <path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path>
              </svg>
            </button>

            <button>
              <svg
                class="icon-comment"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style="fill: rgba(0, 0, 0, 1)"
              >
                <path
                  d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.898 5.516 5 6.934V22l5.34-4.005C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8zm0 14h-.333L9 18v-2.417l-.641-.247C5.67 14.301 4 12.256 4 10c0-3.309 3.589-6 8-6s8 2.691 8 6-3.589 6-8 6z"
                ></path>
              </svg>
            </button>

            <button>
              <svg
                class="icon-dm"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style="fill: rgba(0, 0, 0, 1)"
              >
                <path
                  d="M20.56 3.34a1 1 0 0 0-1-.08l-17 8a1 1 0 0 0-.57.92 1 1 0 0 0 .6.9L8 15.45v6.72L13.84 18l4.76 2.08a.93.93 0 0 0 .4.09 1 1 0 0 0 .52-.15 1 1 0 0 0 .48-.79l1-15a1 1 0 0 0-.44-.89zM18.1 17.68l-5.27-2.31L16 9.17l-7.65 4.25-2.93-1.29 13.47-6.34z"
                ></path>
              </svg>
            </button>

          </div>
          <p class="user-likes" id="likes-${post.id}">${post.likes} likes</p>
          <div class="flex">
            <p class="user-name">${post.username}</p>
            <p class="user-comment">${post.comment}</p>
          </div>
        </div>
      </section>
    `;
    feedEl.innerHTML += postHTML;
  });

  attachEventListeners();
}

function attachEventListeners() {
  feedEl.addEventListener("click", (event) => {
    let postId;
    let heartIcon;

    // Check if clicked element is the like button or the post image
    if (event.target.closest(".like-btn")) {
      postId = event.target.closest(".like-btn").dataset.id;
      heartIcon = event.target
        .closest(".like-btn")
        .querySelector(".icon-heart");
    } else if (event.target.classList.contains("user-post-img")) {
      postId = event.target.dataset.id;
      heartIcon = document.querySelector(
        `.like-btn[data-id="${postId}"] .icon-heart`
      );
    }

    if (!postId) return;

    const post = posts.find((p) => p.id == postId);
    if (!post) return;

    post.likes += 1;
    document.getElementById(
      `likes-${post.id}`
    ).textContent = `${post.likes} likes`;

    // Change the heart icon to red
    if (heartIcon) {
      heartIcon.style.fill = "red";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const userAvatar = document.getElementById("user-avatar");
  const dropdownMenu = document.getElementById("dropdown-menu");

  if (!userAvatar || !dropdownMenu) {
    console.error("User avatar or dropdown menu not found!");
    return;
  }

  const userName = "Per";

  userAvatar.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent immediate closing when clicking avatar
    console.log("Avatar Clicked!");

    // Insert content dynamically if empty
    if (!dropdownMenu.dataset.loaded) {
      dropdownMenu.innerHTML = `
        <li class="user-id" id="userEl">Welcome, ${userName}</li>
              <li class="settings">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style="fill: rgba(0, 0, 0, 1)"
                >
                  <path
                    d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"
                  ></path>
                </svg>
                <a href="#">Settings</a>
              </li>

              <li class="logout">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style="fill: rgba(0, 0, 0, 1)"
                >
                  <path d="m2 12 5 4v-3h9v-2H7V8z"></path>
                  <path
                    d="M13.001 2.999a8.938 8.938 0 0 0-6.364 2.637L8.051 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051 2.051 3.08 2.051 4.95-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637c1.7-1.699 2.637-3.959 2.637-6.364s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"
                  ></path>
                </svg>
                <a href="#">Logout</a>
              </li>
      `;
      dropdownMenu.dataset.loaded = "true"; // Mark dropdown as populated
      console.log("Dropdown Content Added!");
    }

    // Toggle visibility
    dropdownMenu.classList.toggle("dropdown-active");
    console.log(
      "Dropdown class toggled:",
      dropdownMenu.classList.contains("dropdown-active")
    );
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !userAvatar.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.remove("dropdown-active");
      console.log("Dropdown closed");
    }
  });
});

document.addEventListener("DOMContentLoaded", renderPosts);
