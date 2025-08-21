
import './App.css';
import Navbar from './Components/Navbar';
import React, {useState} from 'react'
import News from './Components/News';
import {
  BrowserRouter as Router,
  
  Route,
  Routes
  
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
const App=()=> {
  const apiKey=process.env.REACT_APP_NEWS_API;
  const [progress, setprogress] = useState(0)
  
  
 

    
    
    return <>
     <Router>
      <Navbar />
      <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
      <Routes>
        <Route exact path="/" element={<News setprogress={setprogress}  apiKey={apiKey} key="general"pageSize={6} category="General" />} />
        <Route exact path="/business" element={<News setprogress={setprogress}  apiKey={apiKey} key="business"pageSize={6} category="Business" />} />
        <Route exact path="/entertainment" element={<News setprogress={setprogress}  apiKey={apiKey} key="entertainment"pageSize={6} category="Entertainment" />} />
        <Route exact path="/health" element={<News setprogress={setprogress}  apiKey={apiKey}  key="health"pageSize={6} category="Health" />} />
        <Route exact path="/science" element={<News setprogress={setprogress}  apiKey={apiKey}  key="science"pageSize={6} category="Science" />} />
        <Route exact path="/sports" element={<News setprogress={setprogress}  apiKey={apiKey}  key="sports"pageSize={6} category="Sports" />} />
        <Route exact path="/technology" element={<News setprogress={setprogress}  apiKey={apiKey}  key="technology"pageSize={6} category="Technology" />} />
      </Routes>
    </Router>
     </>
    
  }
export default App;



