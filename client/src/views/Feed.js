import React, {useEffect, useState, useContext } from "react";
import Card from "../components/Card";
import { Container } from "react-bootstrap";
import "./Feed.css";
import API from "../utils/API"
import UserContext from "../context/UserContext";

function Feed() {

  const [posts, setPosts] = useState([])

  const { userData, setUserData } = useContext(UserContext);


  useEffect(() => {
    loadPosts()
  }, [])

  async function loadPosts() {
    if(userData && userData.user && userData.user.id){
      const results = await API.getPosts(userData.user.id)
      setPosts(results.data)
    } else {
      const results = await API.getPosts()
      setPosts(results.data)

    }
  };

  async function removePost(id) {
    const result = await API.deletePost(id)
    console.log(`[removePost]`, result)
    loadPosts()

    // add code here to remove a book using API
  }

  return (
    <div className="wrapper">
      <Container>
        <div className="pageTitle">
          <center>
            <h1>News Feed</h1>
          </center>
        </div>
        <div className="row">
          {posts.map((post) => {
            return (
              <Card key={post.id}
                title={post.title}
                image={post.imageUrl}
                name={post.name}
                sqft={post.sqft}
                datePlanted={post.plantedDate}
                status={post.status}
                description={post.description}
                postDate={post.postDate}
                user={post.user.displayName || "No user"}
                function={() => removePost(post._id)}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Feed;