import React from 'react'

const env = import.meta.env.VITE_ENV

const WrapperBasicPage = ({ children }) => {
  return (
    <section className={'section' + (env === 'win' ? '-win' : '')}>
      <div className="section-center">{children}</div>
    </section>
  )
}

export default WrapperBasicPage
