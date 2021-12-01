import React, { useState } from "react"
import { Helmet } from "react-helmet"
import * as moment from "moment"

import Layout from "../components/layout"
import HelloSketch from "../components/hello-sketch"

import '../styles/global.scss'


const bgColor = "bg-tan"

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

const Website = ({year, title, stack, link}) => (
  <a className="website" href={link}>
    <span className={"title " + bgColor}>{title}</span>
    <span className="year">{year}</span>
    <span className={"stack " + bgColor}>{stack}</span>
  </a>
)

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

const P5sketch = () => {
  if (typeof window !== "undefined") {
    return (
      <div className="p5-parent">
          <HelloSketch />
      </div>
      )
} else {
    return null
}

}

const IndexPage = () => (
  <Layout>
    <Helmet
      title="@ndrewgood" 
      bodyAttributes={{
        class: bgColor
      }}
    />
    <P5sketch />
    <Nav color={bgColor} />
    <p className="first center-margin">My name is Andrew Goodridge, I'm a designer and developer who loves to make digital products of all shapes and sizes. I’m also an incoming Interaction Designer at <a target="_blank" href="https://design.google">Google</a>.</p>
    <p className="center-margin">While my website is currently <i>under construction</i>, I thought that this would be a great opportunity to showcase my archived personal websites. I started making personal websites during my senior year of highschool, and since then have grown significantly as a design, developer, and person. Websites have been left completely untouched, so be nice! :)</p>
    {/* https://github.com/ndrewgood/pwb2 */}
    <Website year="Nov. 2017 - July 2018" title="My first website" stack="Jekyll, Github Pages" link="https://2017.ndrewgood.com"/>
    {/* https://github.com/ndrewgood/pwb3-gatsby */}
    <Website year="July 2018 - Sept. 2018" title="First Gatsby website" stack="Gatsby.js, Github Pages" link="https://2018.ndrewgood.com"/>
    {/* https://github.com/ndrewgood/pwb4 */}
    <Website year="Sept. 2018 - Aug. 2019" title="Freshman year portfolio" stack="Vanilla, Github Pages" link="https://2019.ndrewgood.com"/>
    {/* https://github.com/ndrewgood/website2020 */}
    <Website year="Aug. 2019 - July 2020" title="Sophomore year portfolio" stack="Vanilla, Firebase" link="https://2020.ndrewgood.com"/>
    {/* https://github.com/ndrewgood/ndrewgood-sanity-gatsby */}
    <Website year="July 2020 - Dec. 2021" title="Junior year portfolio" stack="Gatsby, Sanity, Netlify" link="https://2021.ndrewgood.com"/>
    <Footer />


  </Layout>
)

export default IndexPage