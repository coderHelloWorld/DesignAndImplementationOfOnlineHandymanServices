import React, {useRef, useState, useEffect} from 'react';
import { json, useParams } from 'react-router-dom';
import classes from './individualCategory.module.css'
//import jsonData from './data/workers.json';
//import jsonData1 from './data/subservices.json';
import TypingAnimation from '../subcomponents/TypingAnimation/TypingAnimation';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../../actions/index';


function IndividualCategory() {
  let { id } = useParams();
  console.log("id is",id);
  const workers = useSelector(state => state.workerReducer.workers);
  const dispatch = useDispatch();
  const [jsonData, setjsonData] = useState([]);
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(allActions.fetchWorkerData());
    console.log("data being called");
  }, [dispatch]);

  useEffect(() => {
    console.log("from workers")
    if (workers.length > 0) {
      setjsonData(workers);
      console.log("workers:", workers)
    }
  }, [workers]);  
  // Filter out all objects with the same category id as useParams id

  useEffect(() => {
    const func = () => {
      let filteredData = jsonData.filter((item) => item.category === id);
      // Shuffle the filtered array
      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };
      const shuffledData = shuffleArray(filteredData);
      setMyArray(shuffledData);
    };
    func();
  }, [jsonData]);


  //////////////////////////////////

  const categories = useSelector(state => state.categoryReducer.categories);
  const [jsonData1, setjsonData1] = useState([]);
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categories.length > 0) {
      setjsonData1(categories);
      console.log("hi from 394");
    }
  }, [categories]); 

  const [myArray2, setmyArray2] = useState([]);

  useEffect(() => {
    const funct = () => {
      if(myArray[0]){
        let filteredData2 = jsonData1.filter((item) => item._id === myArray[0].category);
        console.log("Filtred Data 2 is: ",filteredData2)
        if(filteredData2[0]){
          let d = filteredData2[0].Sub_Category;
          setmyArray2(d);
        }
      }
    };
    funct();
  }, [jsonData1]);

  

  const [myArray, setMyArray] = useState([]);

  const [cs, setCS] = useState(1);

  const [isA, setisA] = useState("");

  // Reset the scroll position on page/component load:
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

//////////////////////////////// ----- Scroll Thing Starts ----------- //////////////////

  const componentXRef = useRef(null);
  const handleWheel = (event) => {
    const ul = componentXRef.current;
    const body = document.getElementsByTagName("body")[0];
    let executed = false; // flag variable
    // Check if the wheel event happened inside the componentX element
    if (ul && (event.target === ul || ul.contains(event.target))) {
        body.style.overflow = "hidden";
        const scrollDelta = Math.abs(event.deltaY);
        const scrollThresold = window.innerHeight*0.10;
        if(scrollDelta >= scrollThresold && !executed){
          executed = true;
          if (event.deltaY > 0) {
            // Perform your desired actions for downward scrolling here
            console.log('Downward scrolling happened inside componentX');
            let removedElement = [...myArray];
            let rm = removedElement.splice(0, 1)[0];
            removedElement.splice(removedElement.length, 0, rm);
            console.log(removedElement);
            setMyArray(removedElement);
            let ccounter = cs;
            if(ccounter > totalccounter-1){
              ccounter = 1;
            }
            else{
              ccounter = ccounter + 1;
            }
            setCS(ccounter);
          } else if (event.deltaY < 0) {
            // Perform your desired actions for upward scrolling here
            console.log('Upward scrolling happened inside componentX');
            console.log('Upward scrolling happened inside componentX');
            let removedElementd = [...myArray];
            let rmd = removedElementd.splice(removedElementd.length - 1, 1)[0];
            removedElementd.splice(1, 0, rmd);
            console.log(removedElementd);
            setMyArray(removedElementd);
            let ccounter = cs;
            if(ccounter < 2){
              ccounter = totalccounter;
            }
            else{
              ccounter = ccounter - 1;
            }
            setCS(ccounter);
          }
          setTimeout(() => {
            executed = false;
          }, 5);
        }
    }
    else{
      body.style.overflow = "auto";
    }
  }

  const handleMouseLeave = () => {
    const body = document.getElementsByTagName("body")[0];
    body.style.overflow = "auto";
  };
  const handleMouseEnter = () => {
    const body = document.getElementsByTagName("body")[0];
    body.style.overflow = "hidden";
  };
  const handleTouchStart = (event) => {
    const ul = componentXRef.current;
    const body = document.getElementsByTagName("body")[0];
    if (ul && (event.target === ul || ul.contains(event.target))) {
        body.style.overflow = "hidden";
        startY = event.touches[0].clientY;
    }
    const element = componentXRef.current;
    if (element && element.contains(event.target)) {
      body.style.overflow = "hidden";
    }
  };
  const handleTouchMove = (event) => {
    const ul = componentXRef.current;
    const body = document.getElementsByTagName("body")[0];
    let executed = false; // flag variable
    // Check if the wheel event happened inside the componentX element
    if (ul && (event.target === ul || ul.contains(event.target))) {
        body.style.overflow = "hidden";
        const deltaY = event.touches[0].clientY - startY;
        if(deltaY && !executed){
          executed = true;
          if (deltaY > 0) {
            // Perform your desired actions for downward scrolling here
            console.log('Downward scrolling happened inside componentX');
            let removedElement = [...myArray];
            let rm = removedElement.splice(0, 1)[0];
            removedElement.splice(removedElement.length, 0, rm);
            console.log(removedElement);
            setMyArray(removedElement);
            let ccounter = cs;
            if(ccounter > totalccounter-1){
              ccounter = 1;
            }
            else{
              ccounter = ccounter + 1;
            }
            setCS(ccounter);
          } else if (deltaY < 0) {
            // Perform your desired actions for upward scrolling here
            console.log('Upward scrolling happened inside componentX');
            let removedElementds = [...myArray];
            let rmds = removedElementds.splice(removedElementds.length - 1, 1)[0];
            removedElementds.splice(1, 0, rmds);
            console.log(removedElementds);
            setMyArray(removedElementds);
            let ccounter = cs;
            if(ccounter < 2){
              ccounter = totalccounter;
            }
            else{
              ccounter = ccounter - 1;
            }
            setCS(ccounter);
          }
          setTimeout(() => {
            executed = false;
          }, 5);
      }
    }
    else{
      body.style.overflow = "auto";
    }
  };
  
  const handleTouchEnd = () => {
    const body = document.getElementsByTagName("body")[0];
    body.style.overflow = "auto";
  };

  let startY = 0;

//////////////////////////////// ----- Scroll Thing Ends ----------- //////////////////


 let changehandlerD = () => {
  let removedElement = [...myArray];
  let rm = removedElement.splice(0, 1)[0];
  removedElement.splice(removedElement.length, 0, rm);
  console.log(removedElement);
  setMyArray(removedElement);
  let ccounter = cs;
  if(ccounter > totalccounter-1){
    ccounter = 1;
  }
  else{
    ccounter = ccounter + 1;
  }
  setCS(ccounter);
  console.log("Down pressed");
 }

 let changehandlerU = () => {
  let removedElementd = [...myArray];
  let rmd = removedElementd.splice(removedElementd.length - 1, 1)[0];
  removedElementd.splice(1, 0, rmd);
  console.log(removedElementd);
  setMyArray(removedElementd);
  let ccounter = cs;
  if(ccounter < 2){
    ccounter = totalccounter;
  }
  else{
    ccounter = ccounter - 1;
  }
  setCS(ccounter);
 }

//  const handleKeyPress = (event) => {
//     if (event.keyCode === 'ArrowUp') { // Up arrow key
//       let removedElementd = [...myArray];
//       let rmd = removedElementd.splice(removedElementd.length - 1, 1)[0];
//       removedElementd.splice(1, 0, rmd);
//       console.log(removedElementd);
//       setMyArray(removedElementd);
//       let ccounter = cs;
//       if(ccounter < 2){
//         ccounter = totalccounter;
//       }
//       else{
//         ccounter = ccounter - 1;
//       }
//       setCS(ccounter);
//     } else if (event.key === 'ArrowDown') { // Down arrow key
//       let removedElement = [...myArray];
//       let rm = removedElement.splice(0, 1)[0];
//       removedElement.splice(removedElement.length, 0, rm);
//       console.log(removedElement);
//       setMyArray(removedElement);
//       let ccounter = cs;
//       if(ccounter > totalccounter-1){
//         ccounter = 1;
//       }
//       else{
//         ccounter = ccounter + 1;
//       }
//       setCS(ccounter);
//     }
//   };


 const scrollToRef = useRef(null);
 const otherpagehandler = () => {
  scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
 };


  let exp = (joining_date) => {
    const startDate = new Date(joining_date);
    const today = new Date();
    const diffInMs = today.getTime() - startDate.getTime();
    const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
    const experienceInYears = Math.round(diffInYears);
    console.log(experienceInYears); // Output: 4
    return(experienceInYears)
  }

  let sub = (subcategories) => {
    if (subcategories.length <= 3) {
      // If there are three or fewer subcategories, display all of them
      return subcategories.map((item, index) => (
        <li key={index}>{item.Name}</li>
      ));
    } else {
      // If there are more than three subcategories, display the first three
      // followed by an ellipsis
      return (
        <>
          {subcategories.slice(0, 3).map((item, index) => (
            <li key={index}>{item.Name}</li>
          ))}
          <li key="more">...</li>
        </>
      );
    }
  };
  

  let display = myArray.slice(0,7).map((item, index) => {
    return(
      <li key={index} className={classes.li}>
        <div className={classes.all}>
          <div className={classes.front}>
            <div className={classes.name}>
              <h1>{item.name}</h1>
            </div>
            {index === 3 && (
            <div className={classes.det}>
              <p>Available: {item.availability ? "Yes" : "No"}</p>
              <p>Rating: {item.rating}</p>
              <p> Experience: {exp(item.joining_date)} Yrs</p>
            </div>
            )} 
          </div>

          {index === 3 && (
          <hr className="vertical_line" />)
          }

          {index === 3 && (
          <div className={classes.back}>
            <div className={classes.head}>
              <h1> Subcategories</h1>
            </div>
            <div className={classes.subc}>
              {sub(item.subcategories)}
            </div>
          </div>
          )}

        </div>

        {index === 3 && (
        <div className={classes.line}>
          <hr className="horizontal_line" />
        </div>
        )}

        {index === 3 && (
        <div className={classes.extra}>
          <p onClick={() => handleItemClickt(item._id)}> click to get more details !</p>
        </div>
        )}      

      </li>
    );
  })

  function getNumberOfAvailableWorkers(workers, subcategoryName) {
    let numberOfAvailableWorkers = 0;
  
    workers.forEach(worker => {
      if (worker.availability) {
        const subcategory = worker.subcategories.find(subcategory => subcategory.Name === subcategoryName);
        if (subcategory) {
          numberOfAvailableWorkers++;
        }
      }
    });
  
    return numberOfAvailableWorkers;
  }

  function getAveragePriceForSubcategory(workers, subcategoryName) {
    const subcategoryPrices = workers.reduce((accumulator, currentWorker) => {
      const subcategory = currentWorker.subcategories.find(subcategory => subcategory.Name === subcategoryName);
      if (subcategory) {
        accumulator.totalPrice += currentWorker.prices[subcategoryName];
        accumulator.numberOfWorkers++;
      }
      return accumulator;
    }, { totalPrice: 0, numberOfWorkers: 0 });
    
    return (subcategoryPrices.totalPrice / subcategoryPrices.numberOfWorkers).toFixed(0);
  }


  
  
    // Filter out all objects with the same category id as useParams id
  
  //console.log(filteredData2, " Filtered Data");
  console.log(myArray2, "Myarray2");


  let ssdisplay = myArray2.map((item, index) => {
    const backg = index % 2 === 0 ? classes.blackbg : classes.whitebg;

    return(
      <div className={classes.ssdisp}>
        <div className={`${classes.ssdisp1} ${backg}`}>
          <h1>{item.Name}</h1>
        </div>
        <div className={`${classes.ssdisp2} ${backg}`}>
          <h4>{getNumberOfAvailableWorkers(jsonData, item.Name)}</h4>
          <p> {window.innerWidth < 600 ? "Avai. Handyman's" : "Available Handyman's"}</p>
        </div>
        <div className={`${classes.ssdisp3} ${backg}`}>
          <h4>{getAveragePriceForSubcategory(jsonData, item.Name)}</h4>
          <p> {window.innerWidth < 600 ? "Avg Cost" : "Average Cost"}</p>
        </div>
      </div>
    );
  })





  const handleItemClickt = (id) => {
    let de = id;
    setisA(de);
  }
  const backtoP = () => {
    setisA("")
  }

  const cart = useSelector(state => state.cart);
  //const dispatch = useDispatch();


  let sswithp = (worker) => {
    return (
      <div className={classes.workdata2}>
        {Object.entries(worker.prices).map(([key, value], index) => (
          <div key={index} className={classes.workdata21}>
            <div>{key}</div>
            <div className={classes.workdata23}>
              <div> ${value}</div>
              <div className={classes.workdata232} onClick={() => dispatch(allActions.addCart(worker._id, worker.name, key, value))}><img className={classes.imgadd} src={require('./images/add_white.png')} alt="notfound" /></div> 
            </div>
            <div className={classes.workdata22}></div>
          </div>
        ))}
      </div>
    );
  };
  console.log("inside cart: ", cart);
  

  let workdisp = () => {
    const worker = jsonData.find(worker => worker._id === isA);;
    return(
      <div className={classes.workdata}>
        <div className={classes.workdata1}>
          <div className={classes.workdata11}>
            <div>
              {worker.name}
            </div>
            <div>
              <img src={require('./images/close_white.png')} alt="notfound" onClick={backtoP}/>
            </div>
          </div>
          <div className={classes.workdata12}></div>
          <div className={classes.workdata13}>
            <div>
              Ratings : {worker.rating}
            </div>
            <div> | </div>
            <div>
              Avalibility : {(worker.availibility) ? "Yes" : "No"}
            </div>
          </div>
          {sswithp(worker)}       
        </div>
      </div>
    );
  }



  let totalccounter = myArray.length;
  //let ddname = myArray[0].category; // needs to be changed as no category.name
  //console.log(ddname);
  return (
    <div className={classes.main}>
        { (isA === "") &&
            <div>
              <div className={classes.display} >
                <h1 className={classes.heading}>  Handyman's</h1>
                <ul className={classes.ul} ref={componentXRef} onWheel={handleWheel} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                  {display}</ul>
              </div>
              <div className={classes.other}>
                <div className={classes.o1}>
                  <div className={classes.down}>
                    <img src={require('./images/black_down.png')} alt="notfound" onClick={changehandlerD}/>
                  </div>
                  <div className={classes.counter}>
                    <div>{cs}/{(totalccounter)}</div>
                    <div className={classes.next} onClick={otherpagehandler}>Next Page</div>
                  </div>
                  <div className={classes.up}>
                    <img src={require('./images/black_up.png')} alt="notfound" onClick={changehandlerU}/>
                  </div>
                </div>
              </div>
            </div> }

        { (isA !== "") && 
          <div>{workdisp()}</div>
        }

        { (isA === "")  && 
           <div className={classes.nextpage} ref={scrollToRef} >
             <div className={classes.np1}>
               <div className={classes.tt}>
                 <TypingAnimation text="Get what you need!" interval={100}/>
               </div>
             </div>
             <div className={classes.np2}>
               {ssdisplay}
             </div>
             <div className={classes.np3}>

             </div>
           </div>}
    </div>
  );

}

export default IndividualCategory;


//import React from 'react';
//import { useParams } from 'react-router-dom';
//import classes from './individualCategory.module.css'
//import jsonData from './data/workers.json';
//
//
//function IndividualCategory() {
//  let { id } = useParams();
//
//  // Filter out all objects with the same category id as useParams id
//  let filteredData = jsonData.filter((item) => item.category.id.toString() === id);
//
//  // Shuffle the filtered array
//  const shuffleArray = (array) => {
//    for (let i = array.length - 1; i > 0; i--) {
//      const j = Math.floor(Math.random() * (i + 1));
//      [array[i], array[j]] = [array[j], array[i]];
//    }
//    return array;
//  };
//
//  const shuffledData = shuffleArray(filteredData);
//
//  let i = 4;
//  return (
//    <div className={classes.main}>
//      {shuffledData.length}
//      {shuffledData[i].name}
//
//      {shuffledData.map((item) => (
//        <div key={item.name}>
//          <h2>{item.name}</h2>
//          <p>Age: {item.age}</p>
//          <p>Availability: {item.availability ? 'Available' : 'Not Available'}</p>
//          <p>Latitude: {item.latitude}</p>
//          <p>Longitude: {item.longitude}</p>
//          <p>Working Hours: {item.working_hours}</p>
//          <p>Joining Date: {item.joining_date}</p>
//          <p>Rating: {item.rating}</p>
//          <p>Reviews: {item.reviews}</p>
//          <p>Category Name: {item.category.name}</p>
//          <p>Description: {item.category.description}</p>
//          {item.subcategories.map((sub) => (
//            <p key={sub.Name}>
//              {sub.Name}: {item.prices[sub.Name]}
//            </p>
//          ))}
//          <p>Subcategories: {item.subcategories.map((sub) => sub.Name).join(', ')}</p>
//          <p>Prices: {JSON.stringify(item.prices)}</p>
//        </div>
//      ))}
//    </div>
//  );
//  
//}

