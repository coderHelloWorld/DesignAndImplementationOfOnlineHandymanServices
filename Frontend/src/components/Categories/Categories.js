import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import allActions from './../../actions/index';
import classes from "./categories.module.css";
//import data from './merged.json'
function Categories() {

  const categories = useSelector(state => state.categoryReducer.categories);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  //const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(allActions.fetchCategoryData());
  }, [dispatch]);
  useEffect(() => {
    if (categories.length > 0) {
      setData(categories);
      console.log("categories data is:", categories)
    }
  }, [categories]);  
  //setLoading(false);
  //const loading = useSelector(state => state.categoryReducer.loading);
  const error = useSelector(state => state.categoryReducer.error);
  //console.log("Categories from backend: ",categories);
  //console.log("error is: ",error)
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
  //console.log("Final Data is",data)

  const DELAY_TIME = 2000; // delay time in milliseconds

  const scrollToRef = useRef(null);
  const handleimg_1Click = () => {
    scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [show, setShow] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShow(true);
    }, DELAY_TIME);
    return () => clearTimeout(timeoutId);
  }, []);

  const [paused, setPaused] = useState(false);

  const [randomData, setRandomData] = useState([]);
  useEffect(() => {
    const func = () => {
      let dataCopy = data.slice();
      for (let i = dataCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dataCopy[i], dataCopy[j]] = [dataCopy[j], dataCopy[i]];
      }
      const result = dataCopy.slice(0, 9);
      setRandomData(result);
    };
    func();
  }, [data]);


  const firstThreeNames = randomData.slice(0, 3).map(
    (item, index) => <div className={classes[`first_${index}`]} style={{opacity: show ? 0.5 : 0 , animationPlayState: paused ? 'paused' : 'running' }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onClick={() => handleItemClickt(item._id)}>
                        <h2>{item.name}</h2>
                      </div>);        
  const secondThreeNames = randomData.slice(3, 6).map(
    (item, index) => <div className={classes[`second_${index}`]} style={{opacity: show ? 0.5 : 0 , animationPlayState: paused ? 'paused' : 'running' }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onClick={() => handleItemClickt(item._id)}>
                        <h2>{item.name}</h2>
                      </div>);
  const lastThreeNames = randomData.slice(6, 9).map(
    (item, index) => <div className={classes[`last_${index}`]} style={{opacity: show ? 0.5 : 0 , animationPlayState: paused ? 'paused' : 'running' }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onClick={() => handleItemClickt(item._id)}>
                        <h2>{item.name}</h2>
                      </div>);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = data.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || !searchTerm
  );

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
};

  const [selectedId, setSelectedId] = useState(null);

  const handleItemClick = (id) => {
    console.log("clicked id is, ",id)
    setSelectedId(id);
  };

  const navigate = useNavigate();
  const handleItemClickt = (id) => {
    console.log("final id from categories is:", id)
    navigate(`/shop/${id}`);
  }

    // Reset the scroll position on page/component load:
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []); 

  return(
    <div classes={classes.top}>
      <div className={classes.video_background}>
        <video autoPlay muted loop>
          <source src={require('./video/Untitled_video.mp4')} type="video/mp4" />
        </video>
      </div>
      <div className={classes.content}>
          <div className={classes.title}>
            <h2>Featured Categories!</h2>
          </div>
          <div className={classes.cont}>
            <div className={classes.grid_container}>
              {firstThreeNames}
              {secondThreeNames}
              {lastThreeNames}
            </div>
          </div>
          <div className={classes.anotherdiv}>
              <img src={require('./black_down.png')} alt="notfound" onClick={handleimg_1Click}/>
          </div>
      </div>
      
      <div ref={scrollToRef} className={classes.content_2}>
          <div>
              <div className={classes.titlea}>
                  <h2>All Categories</h2>
              </div>          
          </div>
          <div className={classes.content_wrap}>
            {selectedId ? (
                      <div className={classes.content_2_scroll_n}>
                        {selectedId && (
                          <div className={classes.content_2_scroll_not}>
                            <h2>{data.find(item => item._id === selectedId).name}</h2>
                            <p>{data.find(item => item._id === selectedId).description}</p>
                            <div className={classes.content_2_scroll_not_rr}>
                              <p>Rating: {data.find(item => item._id === selectedId).rating}</p>
                              <span> | </span>
                              <p>Reviews: {data.find(item => item._id === selectedId).reviews}</p>
                            </div>
                            <div className={classes.content_2_scroll_not_bb}>
                              <button className={classes.button_86} onClick={() => handleItemClickt(selectedId)}><span>Find Services!</span></button>
                              <button className={classes.button_86} onClick={() => handleItemClick(null)}><span>Close</span></button>
                            </div>
                          </div>
                        )}
                      </div>   
            ) 
            : (
              <div className={classes.content_2_scroll}>
              <div>
                <div className={classes.input}>
                  <input
                    type="text"
                    placeholder="Search it here!"
                    value={searchTerm}
                    onChange={handleInputChange}
                  />
                </div>
            
                <ul>
                  {filteredItems.map(item => (
                    <li className={classes.content_2_li} onClick={() => handleItemClick(item._id)} key={item._id}><span>{item.name}</span></li>
                  ))}
                </ul>
              </div>
            </div>
            )}
          </div>
      </div>
    </div>
  );

}

export default Categories;


/* <div className={classes.content_2_scroll}>
<div>
  <input
    type="text"
    placeholder="Serch it here!"
    value={searchTerm}
    onChange={handleInputChange}
  />
  <ul>
    {filteredItems.map(item => (
      <li className={classes.content_2_li} onClick={() => handleItemClick(item.id)} key={item.id}>{item.name}</li>
    ))}
  </ul>
</div>
</div>
<div className={classes.content_2_scroll_not}>
      {!selectedId && <h1>Please select any service category, we are there to help you!</h1>} 
      {selectedId && (
        <div>
          <h2>{data.find(item => item.id === selectedId).name}</h2>
          <p>{data.find(item => item.id === selectedId).description}</p>
          <p>Rating: {data.find(item => item.id === selectedId).rating}</p>
          <p>Reviews: {data.find(item => item.id === selectedId).reviews}</p>
          <button onClick={() => handleItemClick(null)}>Close</button>
        </div>
      )}
</div> */