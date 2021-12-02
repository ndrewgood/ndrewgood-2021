import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import * as moment from "moment"

import Layout from "../components/layout"
import HelloSketch from "../components/hello-sketch"

import andrew1 from '../assets/img/andrew1.png'
import andrew2 from '../assets/img/andrew2.png'
import andrew3 from '../assets/img/andrew3.png'
import andrew4 from '../assets/img/andrew4.png'
import andrew5 from '../assets/img/andrew5.png'
import andrew6 from '../assets/img/andrew6.png'

import '../styles/global.scss'


const getRandom = (max) => {
  return Math.floor(Math.random() * max);
}

const Nav = ({color}) => {

  const [email, setEmail] = useState("Email")

  const emailOnClick = () => {
    navigator.clipboard.writeText("hey@ndrewgood.com");
    setEmail("Copied");
  }
  if (typeof window !== "undefined") {

    return (
      <div className={"center-container nav-container "+ color}>
        <nav className="center-margin">
          <div className="links">
            <div className="left">
              <a href="/">@ndrewgood</a>
            </div>
            <div className="right">
              <span className={email == "Copy" ? "copy" : null} onMouseEnter={()=>setEmail("Copy")} onMouseLeave={()=>setEmail("Email")} onClick={()=>emailOnClick()}>{email}</span>
              <a target="_blank" href="https://docs.google.com/document/d/1x_PenvOjmvEvuvBfDN1WLW0QFO7iYJlkzArQvboT2Us/edit?usp=sharing">Resume</a>
            </div>
          </div>
          <div className="bar"></div>
        </nav>  
      </div>
    )
} else {
    return null
}


}

const Website = ({year, title, stack, link, color, order}) => {

  const [hoverStatus, setHoverStatus] = useState(null)

  const [backgroundColor, setColor] = useState(color);

  const bgColors = [
    "bg-tan",
    "bg-green",
    "bg-blue",
    "bg-purple",
    "bg-yellow"
  ]

  return(
    <a className="website" href={link} onMouseEnter={() => {setHoverStatus(true); console.log(backgroundColor)}} onMouseLeave={() => {setHoverStatus(false); console.log(backgroundColor)}}>
      <span className={"title " + bgColors[order]}>{title}</span>
      <span className="year">{backgroundColor}, {order}</span>
      <span className={"stack " + bgColors[order]}>{stack}</span>
    </a>
  )
}

const Footer = () => {

  const [time, setTime] = useState(moment().format('hh:mm:ss A'));

  setInterval(
    () => {setTime(moment().format('hh:mm:ss A'))},
    1000
  )

  return(  
    <footer className="center-margin">
      <div className="bar"></div>
      <div className="links">
        <span className="time">{time} EST</span>
        <div className="right">
          <a target="_blank" href="https://instagram.com/ndrewgood">IG</a>
          <a target="_blank" href="https://www.linkedin.com/in/ndrewgood/">LI</a>
          <a target="_blank" href="https://github.com/ndrewgood/">GH</a>
          <a target="_blank" href="https://www.are.na/andrew-goodridge">AR</a>
        </div>
      </div>
      <a className="quote" target="_blank" href="https://thecreativeindependent.com/essays/laurel-schwulst-my-website-is-a-shifting-house-next-to-a-river-of-knowledge-what-could-yours-be/">My website is a time machine to past versions of myself. <br/>What could yours be?</a>
    </footer>
  )

}

const P5sketch = ({order}) => {

  if (typeof window !== "undefined") {
    return (
      <div className="p5-parent">
          <HelloSketch color={order}/>
      </div>
      )
  } else {
      return null
  }
}

let orderQueue = [0,1,2,3,4,5];

const Paragraphs = () => {

  const [andrewStatus, setAndrewStatus] = useState(false);
  const [andrewOrder, setAndrewOrder] = useState(getRandom(6));
  const [mouse, setMouse] = useState([0, 0]);
  
  const images = [
    {
      src: andrew1,
      width: "400px",
      alt: "Me taking a photo a mirror photo"
    },
    {
      src: andrew2,
      width: "370px",
      alt: "A photo of me taken in a nature reserve"
    },
    {
      src: andrew3,
      width: "350px",
      alt: "Me being held by a stuffed animal in IKEA"
    },
    {
      src: andrew4,
      width: "350px",
      alt: "A nice photo of me taken at sunset"
    },
    {
      src: andrew5,
      width: "400px",
      alt: "A photo of me in the NYC Subway"
    },
    {
      src: andrew6,
      width: "400px",
      alt: "A picture of me and my cousin as toddlers"
    }
  ]

  const order = [0,1,2,3,4,5];
  const displayAndrew = () => {
    let num = orderQueue[getRandom(orderQueue.length)];
    setAndrewOrder(num);
    orderQueue = orderQueue.filter(item => item !== num);
    if (orderQueue.length == 0) {
      orderQueue = [...order]
    }
  }

  return (
    <>
      <img className="andrew" src={images[andrewOrder].src} alt={images[andrewOrder].alt} style={{"width": images[andrewOrder].width, "top": mouse[1] + 20 + "px", "left": mouse[0] + 20 + "px", "display": andrewStatus ? "block" : "none"}} />
      <p className="first center-margin">My name is <a className="noselect andrew-photos" onMouseMove={(e) => setMouse([e.clientX, e.pageY])} onMouseEnter={() => { setAndrewStatus(true); displayAndrew(); }} onMouseLeave={() => setAndrewStatus(false)} onClick={() => displayAndrew()}>Andrew</a><span className="andrew-noPhotos">Andrew</span> Goodridge, I'm a designer and developer who loves to make digital products of all shapes and sizes. I’m also an incoming Interaction Designer at <a target="_blank" href="https://design.google">Google</a>.</p>
      <p className="center-margin">While my website is currently <i>under construction</i>, I thought that this would be a great opportunity to showcase my archived personal websites. I started making personal websites during my senior year of highschool, and since then have grown significantly as a designer, developer, and person.</p>
      <p className="center-margin">Always open to chat, feel free to reach out via <a href="mailto:hey@ndrewgood.com">email</a> or DM on any of my social channels! ✌️</p>
    </>
  )

}

const IndexPage = () => {

  const bgColors = [
    "bg-tan",
    "bg-green",
    "bg-blue",
    "bg-purple",
    "bg-yellow"
  ]

  let colorOrder;
  let bgColor;

  colorOrder = getRandom(bgColors.length);
  bgColor = bgColors[colorOrder]

  return(
    <Layout>
      <Helmet
        title="@ndrewgood" 
        bodyAttributes={{
          class: bgColor
        }}
      />
      <P5sketch order={colorOrder}/>
      <Nav color={bgColor} />
      <Paragraphs />
       {/* https://github.com/ndrewgood/pwb2 */}
      <Website year="Nov. 2017 - July 2018" title="My first website" stack="Jekyll, Github Pages" link="https://2017.ndrewgood.com" color={bgColor} order={colorOrder}/>
      {/* https://github.com/ndrewgood/pwb3-gatsby */}
      <Website year="July 2018 - Sept. 2018" title="First Gatsby website" stack="Gatsby, Github Pages" link="https://2018.ndrewgood.com" color={bgColor} order={colorOrder}/>
      {/* https://github.com/ndrewgood/pwb4 */}
      <Website year="Sept. 2018 - Aug. 2019" title="Freshman year portfolio" stack="Vanilla, Github Pages" link="https://2019.ndrewgood.com" color={bgColor} order={colorOrder}/>
      {/* https://github.com/ndrewgood/website2020 */}
      <Website year="Aug. 2019 - July 2020" title="Sophomore year portfolio" stack="Vanilla, Firebase" link="https://2020.ndrewgood.com" color={bgColor} order={colorOrder}/>
      {/* https://github.com/ndrewgood/ndrewgood-sanity-gatsby */}
      <Website year="July 2020 - Dec. 2021" title="Junior year portfolio" stack="Gatsby, Sanity, Netlify" link="https://2021.ndrewgood.com" color={bgColor} order={colorOrder}/>
      <Footer />
    </Layout>
  )
}



export default IndexPage