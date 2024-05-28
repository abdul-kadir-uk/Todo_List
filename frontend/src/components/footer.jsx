import React from 'react';
import ReactDOM from 'react-dom/client'


const Footer = () => {
  return (
    <>
      <p className='footer bg-dark py-1'> &copy; 2024 Made By AK </p>
    </>
  )
}

ReactDOM.createRoot(document.getElementById("footer")).render(
  <React.StrictMode>

    {/* <Footer /> */}
  </React.StrictMode>

)

export default Footer;
