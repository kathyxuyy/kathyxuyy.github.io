"use strict";

window.onload = function() {
    let posts = window.location.search;
    let index = posts.indexOf("post") + 5;
    let postId = posts.substring(index);

    var contentfulClient = contentful.createClient({
        accessToken: '99rj1CmFTuNC6fk4GpMBkOKGVnGCg9XnQyUHMP3r-7U',
        space: 't6d42o9alt4j'
    })

    let postDivs = document.getElementById("post");
    contentfulClient.getEntry(postId).then(function(entry) {
        let overallDiv = document.createElement("div");
        overallDiv.classList.add("background");
        let fields = entry.fields;
        let title = fields.title;
        let date = fields.date;
        let description = fields.description;
        let content = fields.content.content;
        let heading = document.createElement("h2");
        heading.innerText = title;
        let dateEl = document.createElement("p");
        dateEl.innerText = (new Date(date)).toDateString();
        let descriptionEl = document.createElement("p");
        descriptionEl.innerText = description;
        let contentEl = document.createElement("div");
        content.forEach(contentIndex => {
            let contentContent = contentIndex.content[0].value;
            let paragraph = contentContent;
            let paragraphEl = document.createElement("p");
            paragraphEl.innerHTML = paragraph;
            contentEl.append(paragraphEl);
        })
        overallDiv.append(heading);
        overallDiv.append(dateEl);
        overallDiv.append(descriptionEl);
        overallDiv.append(contentEl);
        postDivs.append(overallDiv);
    });
}