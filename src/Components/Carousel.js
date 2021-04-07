import React, {useState} from "react";
import background from './background.jpg';
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import './Carousel.css'

const Carousel = (props) =>{

    //Array of images to be displayed
    const images = [
        background,
        img1,
        img2
    ];

    const captions = [  //captions corresponding to each images
       'Background Image',
       'Hardware Image 2',
       'Hardware Image 1'
    ];

    const[index,setIndex] = useState(props.init);   //index of image to be displayed

    //mouse clicks modify to change the index being displayed
    const leftClick = () =>{
        setIndex((index+1)%images.length);
    };
    const rightClick = () =>{
        const new_i = index-1
        if(new_i<0){
            setIndex(images.length-1)
        }
        else{
            setIndex(new_i)
        }
    };
    return(
        <div>
            <h2 class="title">Click to view images</h2>
            <br></br>
            <button className="left" onClick={leftClick}>{"<"}</button>
            <img className="pic" src={images[index]} alt={index}/>
            <button className="right" onClick={rightClick}>{">"}</button>
            <p className="caption">{captions[index]}</p>
        </div>
    )
}

export default Carousel;