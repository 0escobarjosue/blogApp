import { apiReq } from "./apiRequests.js";
import HttpRequests from "./http.js";
class Ui {
  constructor() {
    this.title = document.querySelector("#inputTitle");
    this.subTitle = document.querySelector("#inputSubTitle");
    this.image = document.querySelector("#inputImage");
    this.postBody = document.querySelector("#textPostArea");
    this.creationDate = document.querySelector("#inputDate");
    this.author = document.querySelector("#inputAuthor");
    this.tags = document.querySelector("#inputTtags");
  }
  loadRequests() {
    apiReq.getPosts();
    apiReq.getAuthors();
    apiReq.getTags();
    apiReq.getUsers();
    apiReq.getComments();
    const ui = new Ui();
    ui.getAuthorProfiles();
  }

  sortByDate(showPost) {
    showPost.sort((a, b) => {
      if (a.createDate < b.createDate) {
        return 1;
      } else {
        return -1;
      }
    });
    const ui = new Ui();
    let showAmount = 3;
    ui.showFirstThree(showPost, showAmount);
    ui.showRestofPosts(showPost, showAmount);
  }
  showFirstThree(showPost, showAmount) {
    const ui = new Ui();
    for (let i = 0; i < showAmount; i++) {
      document.querySelector(".postsArea").innerHTML += `
        <div class="postContainer">
          <div class="imgContainer">
            <img src="${showPost[i].image}" class ="imgClass">
          </div>
          <div class="postText">
            <h3 class="cardH3">${showPost[i].title}</h3>
            <h6 class="cardH6">${showPost[i].subTitle}</h6>
            <p><strong>Posted:</strong> ${showPost[i].createDate}</p>
            <p><strong>Likes:</strong> ${showPost[i].likes} </p>
            <p class="idP">${showPost[i].id}</p>
            <p class="postBodyP">${showPost[i].body}</p>
            <div>
              <a class="deleteIcon"> <i class="fa fa-times-circle"></i></a>
            </div>
          </div>
        </div>`;
    }
  }

  showRestofPosts(showPost, showAmount) {
    for (let i = showAmount; i < showPost.length; i++) {
      const ui = new Ui();
      document.querySelector(".restOfPosts").innerHTML += `
        <div class="postContainer">

        <div class="postText">
          <div class="imgContainer">
            <img src="${showPost[i].image}" class ="imgClass">
          </div>
          <div class="postText">
          <h3 class="cardH3">${showPost[i].title}</h3>
          <h6 class="cardH6">${showPost[i].subTitle}</h6>
          <p><strong>Posted:</strong> ${showPost[i].createDate}</p>
          <p><strong>Likes:</strong> ${showPost[i].likes} </p>
          <p class="idP">${showPost[i].id}</p>
          <p class="postBodyP">${showPost[i].body}</p>
          <div>
            <a class="deleteIcon"> <i class="fa fa-times-circle"></i></a>
          </div>
        </div>
        </div>`;
    }
  }
  showEditFields() {
    document.querySelector(".showEditItems").innerHTML += `
        <div class="postContainer">
        
        <div class="postText">
        <div class="imgContainer">
          <img src="${showPost[i].image}" class ="imgClass">
        </div>
          <h3 class="cardH3">${showPost[i].title}</h3>
          <h6 class="cardH6">${showPost[i].subTitle}</h6>
          <p><strong>Posted:</strong> ${showPost[i].createDate}</p>
          <p><strong>Likes:</strong> ${showPost[i].likes} </p>
          <p class ="authorSpaceTwo" ></p>
          <p class="tagP"><strong>tags: </strong>${showPost[i].tags}</p>
        </div>
        </div>`;
  }
  submitPost() {
    const newTitle = document.querySelector("#inputTitle");
    const newSubTitle = document.querySelector("#inputSubTitle");
    const inputImage = document.querySelector("#inputImage");
    const newAuthor = document.querySelector("#inputAuthor");
    const inputDate = document.querySelector("#inputDate");
    const newPostBody = document.querySelector("#textPostArea");
    const newTags = document.querySelector("#inputTags");
    if (newTitle == "") {
      alert("must insert a title");
      return false;
    } else if (inputImage == "") {
      alert("must insert an image URL");
      return false;
    } else if (inputDate == "") {
      alert("must insert a date");
      return false;
    } else if (newPostBody == "") {
      alert("must insert a body");
      return false;
    }
    const post = {
      title: newTitle.value,
      subTitle: newSubTitle.value,
      image: inputImage.value,
      body: newPostBody.value,
      createDate: inputDate.value,
      likes: 0,
      author: newAuthor.value,
      tags: newTags.value,
    };

    const http = new HttpRequests();
    http
      .post("http://localhost:3000/posts", post)
      .then((post) => {
        apiReq.getPosts();
        const ui = new Ui();
        alert("Posted succesfully!");
      })
      .catch((error) => console.log(error));
  }

  deletePost(e) {
    if (e.target.parentElement.classList.contains("deleteIcon")) {
      const id =
        e.target.parentElement.parentElement.previousElementSibling
          .previousElementSibling.textContent;

      if (confirm("Are you sure?")) {
        const http = new HttpRequests();
        http
          .delete(`http://localhost:3000/posts/${id}`)
          .then((data) => {
            alert("Deleted Successfuly!");
          })
          .catch((err) => console.log(err));
      }
    }
  }

  getAuthorProfiles() {
    const http = new HttpRequests();
    http
      .get("http://localhost:3000/authors")
      .then((authors) => {
        let output = document.querySelector("#inputAuthor");
        for (let i = 0; i < authors.length; i++) {
          output.innerHTML += `
        <option class="authorOption">${authors[i].name} ${authors[i].lastName}</option>`;
        }
      })
      .catch((error) => console.log(error));
  }
}

export default Ui;
