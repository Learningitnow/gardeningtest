/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
  // Gets all posts
  getPosts: function(id="") {
    return axios.get("/api/garden/" + id);
  },
  // Deletes the post with the given id
  deletePost: function(id) {
    return axios.delete("/api/garden/" + id);
  },
  // Saves a post to the database
  savePost: function(userId, plantData) {
    console.log(`[saveBook....] id: `, userId, "Data: ", plantData)
    return axios.post("/api/garden/" + userId, plantData);
  }
};
