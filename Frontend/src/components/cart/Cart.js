import React, {useState, useEffect} from "react";
import classes from './cart.module.css';
import {useSelector, useDispatch} from 'react-redux'
import img from './images/black_down.png'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import allActions from '../../actions/index';

function Cart(){

    const cart = useSelector(state => state.cart.details);
    const dispatch = useDispatch();
    const [details, setdetails] = useState([]);
  
    useEffect(() => {
      dispatch(allActions.getCart());
      console.log("data being called");
    }, [dispatch]);
  
    useEffect(() => {
      console.log("from cart")
      if (cart.length > 0) {
        setdetails(cart);
        console.log("details:", details)
      }
    }, [cart]); 

    const [finalstateover, setfinalstateover] = useState(false); 

    const [isdisp, setisdisp] = useState(false);

    const [finc, setfinc] = useState(false);

    const [currentComboIndex, setCurrentComboIndex] = useState(0);

    const [uniqueCombosFinal, setUniqueCombosFinal] = useState([]);

    const show = () => {
        let s = isdisp;
        setisdisp(!s);
    }


    let showdata = details.map((item, index) => {
        return (
            <div className={classes.data}>
                <div className={classes.dataA} key={index}>
                    <div className={classes.dataA1}>{item.subcategoryName}</div>
                    <div className={classes.dataA2}> | </div>
                    <div className={classes.dataA3}>$ {item.price}</div>
                </div>
                <div className={classes.dataB}></div>
                <div className={classes.dataC}>
                    <div>To be fulfilled by {item.name}</div>
                </div>
            </div>

        )
    })

    const finalC = () => {
        let s = finc;
        setfinc(!s);
    }
    
    const subtotal = details.reduce((total, item) => total + item.price, 0);


    const [address, setAddress] = useState('');
    //const [instructions, setInstructions] = useState([]);
    //const [date, setDate] = useState(null);
    //const [time, setTime] = useState(null);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission
    };
  


    useEffect(() => {
      const uniqueCombos = [];
      details.forEach(item => {
        const combo = {id: item._id, subcategory: item.subcategoryName, name: item.name, price: item.price, date: null, instruction: null, time:null, wid: item.worker};
        if (!uniqueCombos.some(c => c.id === combo.id && c.subcategory === combo.subcategory)) {
          uniqueCombos.push(combo);
        }
      });
      setUniqueCombosFinal(uniqueCombos);
    }, [details]);

    const currentCombo = uniqueCombosFinal[currentComboIndex];
    //const currentCombo = uniqueCombosFinal[currentComboIndex];

    const handleDateChange = (date) => {
      const updatedCombos = [...uniqueCombosFinal];
      updatedCombos[currentComboIndex].date = date;
      setUniqueCombosFinal(updatedCombos);
    };

    const handleTimeChange = (time) => {
      const updatedCombos = [...uniqueCombosFinal];
      updatedCombos[currentComboIndex].time = time;
      setUniqueCombosFinal(updatedCombos);
    };

    const handleInstructionsChange = (event, comboIndex) => {
      const { value, checked } = event.target;
      console.log("value ", value)
      if (!checked) {
        const updatedCombos = [...uniqueCombosFinal];
        updatedCombos[comboIndex].instruction = value;
        setUniqueCombosFinal(updatedCombos);
      }
    };    

    const specialInstructions = (currentCombo) => {
      return(
              <div>
                <div className={classes.schedule}>
                  <div className={classes.schedule1}> Schedule {currentCombo.subcategory} service</div>
                  <div className={classes.schedule2}>
                    <div>
                      <DatePicker
                        selected={currentCombo.date}
                        placeholderText="Select Date"
                        onChange={date => handleDateChange(date)}
                        dateFormat="dd/MM/yyyy"
                        className={classes['form-control']}
                      />
                    </div>
                  </div>
                  <div className={classes.schedule3}>
                    <div>
                      <DatePicker
                        selected={currentCombo.time}
                        placeholderText="Select Time"
                        onChange={time => handleTimeChange(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className={classes['form-control']}
                      />
                    </div>
                  </div>
                </div>

                <div className={classes.instructionsdet}>
                  <div className={classes.instructionsdet1}>Instructions for {currentCombo.name} (if any)</div>
                  <div className={classes.instructionsdet2}>
                    <input
                      type="text"
                      placeholder="Enter Details"
                      id={`member${currentComboIndex}`}
                      name={`member${currentComboIndex}`}
                      className={classes['form-control']}
                      value={(currentComboIndex+1) ? uniqueCombosFinal[currentComboIndex].instruction : ''}
                      onChange={event => handleInstructionsChange(event, currentComboIndex)}
                    />
                  </div>
                </div>
              </div>
          );
        }
  
        const prevCombo = () => {
          setCurrentComboIndex(currentComboIndex - 1);
        };
        
        const nextCombo = () => {
          setCurrentComboIndex(currentComboIndex + 1);
        };
        
        const prevButtonDisabled = currentComboIndex === 0;
        const nextButtonDisabled = currentComboIndex === uniqueCombosFinal.length - 1;
        
        const prevButton = (
          <button onClick={prevCombo} disabled={prevButtonDisabled} className={classes.button}>
            Previous
          </button>
        );
        
        const nextButton = (
          <button onClick={nextCombo} disabled={nextButtonDisabled} className={classes.button}>
            Next
          </button>
        );
        

        const navigate = useNavigate();
        const dispatchd = useDispatch();

        const finalData = {
          add: address,
          item_det: uniqueCombosFinal
        }

        const erase = () => {
         let x = finalstateover
         setfinalstateover(!x)
         console.log("Final Data : ", finalData);
         dispatchd(allActions.removeCart())
         dispatchd(allActions.addOrder(finalData));
         setTimeout(() => {
          navigate('/');
          }, 3000);
        }
    
      
    return(
      <div>
        {
            (!finalstateover) &&
            <div className={classes.o}>
                <div>
                    <div className={classes.title}>
                        C A R T
                    </div>

                    <div>
                      {
                          !finc &&
                          <div className={classes.totalitem}>
                              <button className={classes.button_86} onClick={show}><span>Cart Items: {details.length}</span></button>
                          </div>
                        } 
                        {
                            isdisp && !finc &&
                            <div className={classes.datawrapt}>
                                 <div className={classes.datawrap}>
                                    {showdata}
                                </div> 
                            </div>

                        }
                        {
                            isdisp && (details.length > 0) && !finc &&
                            <div className={classes.datawrap2}>
                                <div className={classes.datawrap211}>Subtotal  ${subtotal}</div>
                            </div>    
                        }
                        {
                            isdisp && (details.length > 0) && !finc &&
                            <div className={classes.datawrap3}>
                                <div className={classes.datawrap31}>Checkout</div>
                                <div className={classes.submitbutton}>
                                    <img src={img} alt="Submit" onClick={finalC}/>
                                </div>
                            </div>    
                        }
                    </div>
                    <div>
                       {
                        finc &&
                        <div>
                            <form className={classes.forme}onSubmit={handleSubmit}>
                                <div>
                                    <div className={classes.address}>
                                      <div className={classes.address1}>
                                        <div className={classes.address11}><div>Enter your Address</div></div>
                                        <div className={classes.address12}><input className={`${classes['form-control']} ${classes.address12}`} type="text" value={address} onChange={event => setAddress(event.target.value)} placeholder="Enter your address"/></div>
                                      </div>
                      
                                    </div>
                                    <div className={classes.instructions}>
                                      <div className={classes.tpspace}></div>
                                      <div>
                                        {specialInstructions(currentCombo)}
                                        <div className={classes.btnn}>
                                          {prevButton}
                                          {nextButton}
                                        </div>                                
                                      </div>
                                    </div>
                                </div>
                                <div className={classes.finalbutton}>
                                    <div>Place your order!</div>
                                    <div className={classes.submitbutton}>
                                        <img src={img} alt="Submit" onClick={erase}/>
                                    </div>                      
                                </div>

                            </form>
                      
                        </div>
                       } 
                    </div>
                </div>
            </div> 
          }
          {
            finalstateover && 
            <div className={classes.goodbyemessage}>
              <div>Order Placed!</div>
              <div>Redirecting you to home page</div>
            </div>

          }
          </div>
    )
}

export default Cart;

//                            <button className={classes.button_86} type="submit">Click to Place Order!</button>

/* <div>
  <div className={classes.Final}>Place your order!</div>
  <div className={classes.submitbutton}>
      <img src={img} alt="Submit"/>
  </div>
</div>  */