import React from 'react'

const WrapperBasicPage = ({ children }) => {
  return (
    <section
      className={
        'section' + (process.env.REACT_APP_MYVAR === 'win' ? '-win' : '')
      }
    >
      <div className="section-center">{children}</div>
    </section>
  )
}

export default WrapperBasicPage
