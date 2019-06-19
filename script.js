"use strict";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

window.onload = function () {

    var contentfulClient = contentful.createClient({
        accessToken: '99rj1CmFTuNC6fk4GpMBkOKGVnGCg9XnQyUHMP3r-7U',
        space: 't6d42o9alt4j'
    })

    contentfulClient.getEntries({
        content_type: "blogPost",
        order: "fields.date"
      })
      .then(function(entries) {
        let posts = entries.items;
        let postDivs = document.getElementById("posts");
        posts.forEach(post => {
            let overallDiv = document.createElement("div");
            let fields = post.fields;
            let title = fields.title;
            let date = fields.date;        
            let fullDate = new Date(date);
            let cleanedDate = `${monthNames[fullDate.getMonth()]} ${fullDate.getDate()}, ${fullDate.getFullYear()}`;
            let description = fields.description;
            let heading = document.createElement("h2");
            let titleEl = document.createElement("a");
            titleEl.href = "/post.html?post=" + post.sys.id;
            titleEl.innerText = title;
            titleEl.classList.add("post-link");
            heading.append(titleEl);
            let dateEl = document.createElement("p");
            dateEl.innerText = cleanedDate;
            let descriptionEl = document.createElement("p");
            descriptionEl.innerText = description;
            overallDiv.append(heading);
            overallDiv.append(dateEl);
            overallDiv.append(descriptionEl);
            postDivs.append(overallDiv);
        });
      })
    

}

  