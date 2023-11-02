import React,  { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from './topcategories.module.css'
import { useNavigate } from 'react-router-dom';

function TopCategories(props){
    console.log("props data in topCategory",props.data);
    // let data_members = [
    //     {
    //         id:1,
    //         name: "Electrician"
    //     },
    //     {
    //         id:2,
    //         name: "Plumber"
    //     },
    //     {
    //         id:3,
    //         name: "Carpenter"
    //     }
    // ]
    let data_members = props.data;


    const ref = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
  
    useEffect(() => {
        const currentRef = ref.current; // create a variable that references ref.current
    
        const observer = new IntersectionObserver(
          ([entry]) => {
            setIsIntersecting(entry.isIntersecting);
          },
          {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
          }
        );
    
        if (currentRef) {
          observer.observe(currentRef);
        }
    
        return () => {
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        };
      }, []);

    const navigate = useNavigate();
    const handleItemClickt = (id) => {
      console.log("final id from categories is:", id)
      navigate(`/shop/${id}`);
    }

    const listItems = data_members.map((item,index) => (
        <div key={item.id} className={classes[`member_${(index+1)}`]} onClick={() => handleItemClickt(item._id)}>
          <h2 className={classes.h2}>{item.name}</h2>
        </div>
    ));

    return(
        <div ref={ref} className={classes.topdiv}>
            {isIntersecting && (<h1 className={classes.h1}> Top Categories </h1>)}
            {isIntersecting && (<div className={classes.listitems}>{listItems}</div>)}    
            {isIntersecting && (<NavLink to="/shop" className={classes.explore}> See all Categories, here!</NavLink>)}     
        </div>
    );
}

export default TopCategories;