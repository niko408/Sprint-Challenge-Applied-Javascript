// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each 'article' in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Use your function to create a card for each of the articles and add the card to the DOM.

const entryPoint = document.querySelector('.cards-container')

function cardMaker(attributes){
    const {headline, imgURL, name} = attributes
    const card = document.createElement('div')
    card.classList.add('card')

    const headLine = document.createElement('div')
    headLine.classList.add('headline')
    headLine.textContent = headline
    card.appendChild(headLine)

    const author = document.createElement('div')
    author.classList.add('author')
    card.appendChild(author)

    const imgContainer = document.createElement('div')
    imgContainer.classList.add('img-container')
    author.appendChild(imgContainer)

    const image = document.createElement('img')
    image.src = imgURL
    imgContainer.appendChild(image)


    const authName = document.createElement('span')
    authName.textContent = `By ${name}`
    author.appendChild(authName)

    return card
}


axios({
    method: 'get',
    url: 'https://lambda-times-backend.herokuapp.com/articles',
})
    .then(response => {
        console.log(response)
        let headlines = []
        let names = []
        let imgLinks = []

        for (i = 0; i < response.data.articles.bootstrap.length; i++){
            headlines.push(response.data.articles.bootstrap[i].headline)
            names.push(response.data.articles.bootstrap[i].authorName)
            imgLinks.push(response.data.articles.bootstrap[i].authorPhoto)
        }
        for (i = 0; i < response.data.articles.javascript.length; i++){
            headlines.push(response.data.articles.javascript[i].headline)
            names.push(response.data.articles.javascript[i].authorName)
            imgLinks.push(response.data.articles.javascript[i].authorPhoto)
        }
        for (i = 0; i < response.data.articles.technology.length; i++){
            headlines.push(response.data.articles.technology[i].headline)
            names.push(response.data.articles.technology[i].authorName)
            imgLinks.push(response.data.articles.technology[i].authorPhoto)
        }
        for (i = 0; i < response.data.articles.node.length; i++){
            headlines.push(response.data.articles.node[i].headline)
            names.push(response.data.articles.node[i].authorName)
            imgLinks.push(response.data.articles.node[i].authorPhoto)
        }
        for (i = 0; i < response.data.articles.jquery.length; i++){
            headlines.push(response.data.articles.jquery[i].headline)
            names.push(response.data.articles.jquery[i].authorName)
            imgLinks.push(response.data.articles.jquery[i].authorPhoto)
        }

        headlines.forEach((headline, index) => {
            const nameData = names[index]
            const imgData = imgLinks[index]
            const finalCard = cardMaker({headline: headline, name: nameData, imgURL: imgData})
            entryPoint.appendChild(finalCard)
        })
})
.catch(error => {
    console.log('error', error)
})