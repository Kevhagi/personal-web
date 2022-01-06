let blogs = []

function addBlog(event){
    event.preventDefault()

    let title = document.getElementById('input-blog-title').value
    let content = document.getElementById('input-blog-content').value
    let image = document.getElementById('input-blog-image').files

    image = URL.createObjectURL(image[0])

    let blog = {
        title : title,
        content : content,
        image : image,
        author : 'Kevin Jaya Susilo',
        postAt : new Date()
    }

    blogs.push(blog);

    renderBlog()
}

document.getElementById('contents').innerHTML = ''

function renderBlog() {
    let contentContainer = document.getElementById('contents')

    document.getElementById('contents').innerHTML = ''
    for (let i = 0; i < blogs.length; i++) {
        contentContainer.innerHTML += `
        <div class="blog-list-item">
            <div class="blog-image">
                <img src="${blogs[i].image}" alt="" />
            </div>
            <div class="blog-content">
            <div class="btn-group">
                <button class="btn-edit">Edit Post</button>
                <button class="btn-post">Post Blog</button>
            </div>
            <h1>
                <a href="blog-detail.html" target="_blank"
                >${blogs[i].title}</a
                >
            </h1>
            <div class="detail-blog-content">
                ${getFullTime(blogs[i].postAt)} | ${blogs[i].author}
            </div>
            <p>
                ${blogs[i].content}
            </p>
            <div class="blog-time-post" style="text-align: right; font-size: 13px; color: gray;">
                ${getDistanceTime(blogs[i].postAt)}
            </div>
            </div>
        </div>`
    }
}

let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function getFullTime(time) {
    let date = time.getDate();
    let monthIndex = time.getMonth();
    let year = time.getFullYear();

    let hours = time.getHours();
    let minutes = time.getMinutes();

    let fullTime = `${date} ${month[monthIndex]} ${year} ${hours}:${minutes}`

    return fullTime
}

function getDistanceTime(time) {
    let timePost = time
    let timeNow = new Date()

    let distance = timeNow - timePost

    // convert milisecond => hari
    let milisecond = 1000 // mili -> second
    let minutes = 3600 // second -> jam
    let hoursInDay = 23 // jam -> hari

    let distanceDay = distance / (milisecond * minutes * hoursInDay)
    let distanceHours = distance / (milisecond * minutes)
    let distanceMinutes = distance / (milisecond * 60)
    let distanceSeconds = distance / milisecond

    distanceDay = Math.floor(distanceDay)
    distanceHours = Math.floor(distanceHours)
    distanceMinutes = Math.floor(distanceMinutes)
    distanceSeconds = Math.floor(distanceSeconds)

    if(distanceDay >=1){
        return `${distanceDay} days ago`;
    } else {
        if(distanceHours >=1){
            return `${distanceHours} hours ago`;
        } else{
            if(distanceMinutes >=1){
                return `${distanceMinutes} minutes ago`;
            } else{
                return `${distanceSeconds} seconds ago`;
            }
        }
    }
}

setInterval(()=>{
    renderBlog()
},60000)