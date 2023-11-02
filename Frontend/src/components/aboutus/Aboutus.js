import React, {useRef, useEffect} from "react";
import classes from './aboutus.module.css';

function Aboutus(){
    const data = "Handyman is founded in 2023 with a mission to provide exceptional customer service and build long-term relationships with our clients based on trust, reliability, and professionalism. We believe in Quality, Expertise and Efficienty. Moreover, we strive to deliver services in more than 50 cagetogies with the highest quality to our customers. Our goal is to be a services provider company may set a goal to improve the efficiency of its operations in order to provide services more quickly and at a lower cost, while still maintaining quality. At Handyman we prioritize sustainability, innovation, or transparency, and we are committed to supporting local communities. We take pride in unique qualities of the company, such as a creative approach to problem-solving, a friendly and welcoming atmosphere, or a focus on personalized customer service. Our team is dedicated to go above and beyond to meet customer needs or staying up-to-date with the latest industry trends and technologies. Thank you for choosing Handyman. We look forward to serve you, work with you."
    const data_members = [
        {
          id: 1,
          name: "Purvam Sheth",
          designation: "Student"
        },
        {
          id: 2,
          name: "Dev Patel",
          designation: "Industry Advisor"
        },
        {
          id: 3,
          name: "Kuntal Patel",
          designation: "Faculty Advisor"
        }
    ];

    // Reset the scroll position on page/component load:
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []); // It sounds like you're experiencing an issue with scroll position persistence across different pages or components. When you navigate to a new page or component, the browser or React may retain the previous scroll position, causing the new page to start at a certain offset from the top.
      //To solve this issue, you can use one of the following approaches:
     // Reset the scroll position on page/component load: You can reset the scroll position to the top of the page or component using the window.scrollTo method. For example, you can add the following code to the componentDidMount or useEffect hook of your component to reset the scroll position to the top:

    const scrollToRef = useRef(null);
    const scrollToRefs = useRef(null);
    const handleButtonClick = () => {
        scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const handleButtonClicks = () => {
        scrollToRefs.current.scrollIntoView({ behavior: 'smooth' });
    };
    
    const listItems = data_members.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <h4>{item.designation}</h4>
        </div>
    ));

    return(
        <div className={classes.mainclass}>
            <div ref={scrollToRefs} className={classes.otherdiv}>
                <div className={classes.otherotherdiv}>
                    <div>
                        <h1 className={classes.h1}>About Us</h1>
                    </div>
                    <div>
                        <p className={classes.p}>{data}</p> 
                    </div>
                </div>
                <div className={classes.otherindiv}>
                        <img src={require('./white_down.png')} alt="notfound" onClick={handleButtonClick}/>
                </div>
            </div>
            <div ref={scrollToRef} className={classes.anotherdiv}>
                <div className={classes.anotherdiva}>
                    <h1 className={classes.h1}>Meet the Team</h1>
                </div>
                <div className={classes.anotherdivb}>
                    {listItems}
                </div>
                <div className={classes.anotherdivc}>
                    <img src={require('./black_up.png')} alt="notfound" onClick={handleButtonClicks}/>
                </div>
            </div>
        </div>
    );
}

export default Aboutus;