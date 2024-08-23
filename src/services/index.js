import axios from "axios";
import $router from "@/router";
import store from '@/store';

const Service = axios.create({
    baseURL: 'http://localhost:3000', // Your backend URL
    timeout: 1000,
});
// Service.interceptors.request.use((request) => {
//   let token = Auth.getToken();
//   if (!token) {
//     $router.go();
//     return;
//   } else {
//     request.headers["Authorization"] = "Bearer " + token;
//   }
//   return request;
// });
Service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 401 || error.response.status == 403) {
      Auth.logout();
      $router.go();
    }
  }
);

let Users = {
    // Fetch all users
    async GetAllUsers() {
      let response = await Service.get("/users");
      let data = response.data;
      data = data.map((user) => {
        return {
          id: user._id,
          email: user.Email,
          firstName: user.FirstName,
          lastName: user.LastName,
          profileType: user.ProfileType,
        };
      });
      return data;
    },
  
    // Fetch a user by their ID
    async GetUserById(userId) {
      let response = await Service.get(`/users/${userId}`);
      let user = response.data;
      return {
        id: user._id,
        email: user.Email,
        firstName: user.FirstName,
        lastName: user.LastName,
        profileType: user.ProfileType,
      };
    },
  };

  let Posts = {
    // Create a new post
    async CreatePost(postData, imageBlob) {
      try {
          let formData = new FormData();
          formData.append("title", postData.title);
          formData.append("text", postData.text);
          formData.append("email", postData.email);
          formData.append("userRole", postData.userRole);
          
          // Append the image with the expected field name
          if (imageBlob) {
              formData.append("image", imageBlob, "post_image.png");
          }
  
          let response = await Service.post("/posts", formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
          });
  
          return response.data;
      } catch (error) {
          console.error('Error in CreatePost:', error.response || error.message || error);
          throw error;
      }
  },
   
  
    // Fetch student feed
    async GetStudentFeed() {
      let response = await Service.get("/student-feed");
      return response.data.feed;
    },
  
    // Fetch teacher feed
    async GetTeacherFeed() {
      let response = await Service.get("/teacher-feed");
      return response.data.feed;
    },

    // Fetch a specific student post
    async GetStudentPost(postId) {
      let response = await Service.get(`/student-feed/${postId}`);
      return response.data;
    },

    // Fetch a specific teacher post
    async GetTeacherPost(postId) {
      let response = await Service.get(`/teacher-feed/${postId}`);
      return response.data;
    },
    
    // Fetch all posts by a specific user
    async GetUserPosts(email) {
      let response = await Service.get(`/posts/user/${email}`);
      return response.data; // This will return the array of posts
  },
  };

  

  let Comments = {
    // Fetch all comments
    async GetAllComments() {
      let response = await Service.get("/comments");
      return response.data.feed;
    },
  
    // Fetch comments for a specific post by postId
    async GetCommentsByPostId(postId) {
      let response = await Service.get(`/comments/${postId}`);
      return response.data.comments;
    },
    // Post a new comment
    async PostComment(commentData) {
      let response = await Service.post("/comments", commentData);
      return response.data;
  }
  };

  let Auth = {
    async login(email, password) {
      try {
          let response = await Service.post("/auth", {
              email: email,
              password: password,
          });

          // Log the entire response for debugging
          console.log('Full response data:', response.data);

          let user = response.data;

          // Check if the token and other user details are present
          if (user.token && user.email && user.profileType) {
              // Store user details in local storage
              localStorage.setItem("user", JSON.stringify(user));

              // Store user data in the store
              store.currentUser = user.email;
              store.profileType = user.profileType;

              // Log the stored data for debugging
              console.log("Logged in user:", store.currentUser);
              console.log("User role:", store.profileType);

              return true;
          } else {
              console.error("Incomplete user data:", user);
              return false;
          }
      } catch (error) {
          console.error("Error during login:", error);
          return false;
      }
  },
  
    async Register(userData) {
      let result = await Service.post("/users", {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileType: userData.profileType,
      });
      console.log(result);
      return result;
    },
  
    logout() {
      localStorage.removeItem("user");
    },
  
    getUser() {
      return JSON.parse(localStorage.getItem("user"));
    },
  
    getToken() {
      let user = Auth.getUser();
      if (user && user.token) {
        return user.token;
      } else {
        return false;
      }
    },
  
    authenticated() {
      let user = Auth.getUser();
      if (user && user.token) {
        return true;
      }
      return false;
    },
  
    state: {
      get authenticated() {
        return Auth.authenticated();
      },
    },
  };
  
export { Service, Auth, Posts, Users, Comments };