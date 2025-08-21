import React, {useEffect,useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
const News=(props)=> {
    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(false)
    const [totalResults, settotalResults] = useState(0)
    const [page, setpage] = useState(1)
    // document.title=`${props.category} - NewsApp`;

   
   

    useEffect(() => {
        const updatenews= async (pageno)=> {
            let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&page=${pageno}&pageSize=${props.pageSize}`;
            setloading(true)
            props.setprogress(10);
            let resp = await fetch(url);
            props.setprogress(30);
            let data = await resp.json()
            props.setprogress(100);
            
                setarticles(data.articles)
                settotalResults(data.totalResults)
                setpage(pageno)
               setloading(false)
           
        }
        updatenews(page);
    
      
    },[])
    
 
    
   const fetchMoreData = async () => {
       
       
        let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setloading(true)
        let resp = await fetch(url);
        let data = await resp.json()
    
       
            setarticles(articles.concat(data.articles))
            settotalResults( data.totalResults)
            setpage(page+1)
            setloading(false)
   
      };


    

        return (
           
   <>
                <h1 className='text-center' style={{marginTop:'85px'}}>Top  {props.category} Headlines  </h1>
                {loading && <Spinner />}
                <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={loading&&<Spinner/>}
          >
       <div className='container'>
                <div className="row ">
             
        
                    { articles.map((element) => {
                        return <div key={element.url} className="col-md-4">
                            <Newsitem title={element.title ? element.title : ''} description={element.description ? element.description.slice(0, 88) : ''} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} sources={element.source.name} />
                        </div>

                    })}

                </div>
                </div>
                </InfiniteScroll>
               
                </>
        )
    }

News.defaultProps = {
    country: 'in',
    category: 'general'
}
 News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
}
export default News
