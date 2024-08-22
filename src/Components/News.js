import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
    static defaultProps = {
        country: 'in',
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }


    constructor(props) {
        super(props);
       
        document.title=`${this.props.category} - NewsApp`;
    }
    state = {
        articles: [],
        page: 1,
        loading: false,
        totalResults:0
 
    }
    async updatenews(pageno) {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${pageno}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        this.props.setProgress(10);
        let resp = await fetch(url);
        this.props.setProgress(30);
        let data = await resp.json()
        this.props.setProgress(100);
        this.setState({
            articles: data.articles,
            totalResults: data.totalResults,
            page: pageno,
           loading:false
        });
    }

 
    async componentDidMount() {
        this.updatenews(this.state.page);
    }
    fetchMoreData = async () => {
       
       
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let resp = await fetch(url);
        let data = await resp.json()
    
        this.setState({
            articles:this.state.articles.concat(data.articles),
            totalResults: data.totalResults,
            page: this.state.page+1,
            loading:false
        });
      };


    render() {

        return (
           
   <>
                <h1 className='text-center' style={{marginTop:'85px'}}>Top  {this.props.category} Headlines  </h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={this.state.loading&&<Spinner/>}
          >
       <div className='container'>
                <div className="row ">
             
        
                    { this.state.articles.map((element) => {
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
}

export default News
