import React from 'react'
import Sliders from './Sliders'

const RemoteNewsList = React.lazy((() => import("remote/NewsList")))
const Banner = React.lazy((() => import("remote/Banner")))
const App = () => {
  return (
    <div>
      <h2>本地组件Sliders</h2>
      <Sliders />
      <h2>远程组件NewsList</h2>
      <React.Suspense fallback="loading NewsList">
        <RemoteNewsList />
        <Banner />
      </React.Suspense>
    </div>
  )
}

export default App