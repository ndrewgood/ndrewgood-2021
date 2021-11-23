import React from "react"
import { Helmet } from "react-helmet"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import HelloSketch from "../components/hello-sketch"

import '../styles/global.scss'

const IndexPage = () => (
  <Layout>
    <Helmet 
      bodyAttributes={{
        class: 'bg-tan'
      }}
    />

    <HelloSketch />

    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
  </Layout>
)

export default IndexPage