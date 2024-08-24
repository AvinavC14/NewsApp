import React from 'react'

const Newsitem=(props)=> {
 
    let { title, description, imageUrl, newsUrl,author,date,sources} = props;
    return (
      <div><div className="card my-2" >
        
        <img src={imageUrl ? imageUrl : "https://www.goabadminton.com/sites/default/files/default_images/default-news.jpg"} className="card-img-top" alt='.' />
        <div className="card-body" >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'85%'}} >
    {sources}
    
  </span>
  
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {description}...
          </p>
          <p className="card-text">
  <small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small>
</p>

          <a href={newsUrl} target='_blank'rel="noreferrer" className="btn btn-sm btn-primary">
            Read More
          </a>
        </div>
      </div>
      </div>
    )
  
}
export default Newsitem
