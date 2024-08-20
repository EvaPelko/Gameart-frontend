import axios from "axios";
import $router from "@/router";

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
    async CreatePost(postData, imageFile) {
      let formData = new FormData();
      formData.append("title", postData.title);
      formData.append("text", postData.text);
      formData.append("email", postData.email);
      formData.append("userRole", postData.userRole);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      let response = await Service.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
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
  };

  let Auth = {
    async login(email, password) {
      let response = await Service.post("/auth", {
        email: email, // use lowercase keys here
        password: password,
      });
      let user = response.data;
  
      localStorage.setItem("user", JSON.stringify(user));
  
      return true;
    },
  
    async Register(userData) {
      let result = await Service.post("/users", {
        email: userData.email,       // use lowercase keys here
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