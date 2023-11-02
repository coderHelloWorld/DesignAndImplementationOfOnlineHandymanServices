import React, {useEffect, useState} from "react";
//import Navbar from "../navigationBar/Navbar";
import Title from "./Title/Title.js"
import TopCategories from "./TopCategories/TopCategories.js"
import TrendingCategories from "./TrendingCategories/TrendingCategories.js"
import axios from 'axios';

function Homepage(){
    const [data, setData] = useState([]);
    const [tdata, settData] = useState([]);
    const jwtToken = localStorage.getItem('jwtTokenForHandyman');
    
    useEffect(() => {
      if (jwtToken) {
        axios.get(process.env.REACT_APP_API_URL + '/data/category/top', {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        })
        .then(response => {
          console.log("response from res: ",response.data)
          setData(response.data);
        })
        .catch(error => {
          setData([{}]);
        });
      } else {
        setData([{}]);
      }
    }, [jwtToken]);

    useEffect(() => {
      if (jwtToken) {
        axios.get(process.env.REACT_APP_API_URL + '/data/category/trending', {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        })
        .then(response => {
          console.log("response from res trending: ",response)
          settData(response.data.categories);
        })
        .catch(error => {
          settData([{}]);
        });
      } else {
        settData([{}]);
      }
    }, [jwtToken]);


    // Reset the scroll position on page/component load:
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []); // It sounds like you're experiencing an issue with scroll position persistence across different pages or components. When you navigate to a new page or component, the browser or React may retain the previous scroll position, causing the new page to start at a certain offset from the top.
      //To solve this issue, you can use one of the following approaches:
     // Reset the scroll position on page/component load: You can reset the scroll position to the top of the page or component using the window.scrollTo method. For example, you can add the following code to the componentDidMount or useEffect hook of your component to reset the scroll position to the top:
    return(
        <div>
            <Title /> 
            <TopCategories data={data}/>
            <TrendingCategories datas={tdata}/>
        </div>    
    );
}

export default Homepage;