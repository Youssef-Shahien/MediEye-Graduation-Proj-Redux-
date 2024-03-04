import React from 'react'

const AddUser = () => {
  return (
    <div className="container ">
    <form className="py-4">
      <input type="text" className='form-control mb-3 ps-3' placeholder='Company Name' />
      <input type="tel" className='form-control mb-3 ps-3' placeholder='Company phone' />
      <input type="text" className='form-control mb-3 ps-3' placeholder='Company Area' />
      <input type="text" className='form-control mb-3 ps-3' placeholder='Company Working hours' />
      <input type="text" className='form-control mb-3 ps-3' placeholder='Company Manager Name' />
      <input type="tel" className='form-control mb-3 ps-3' placeholder='Company Manager phone' />
      <input type="text" className='form-control mb-3 ps-3' placeholder='user Name' />
      <input type="email" className='form-control mb-3 ps-3' placeholder='Email' />
      <input type="password" className='form-control mb-3 ps-3' placeholder='Password' />
      <select className='form-control ps-3 mb-4 text-secondary'>
        <option selected disabled>Select role </option>
        <option>Adimn</option>
        <option>Company</option>
        <option>Pharmacy</option>
      </select>
      
      <button type="submit" className="btn btn-info text-light px-3">Add</button>
    </form>
  </div>
  )
}

export default AddUser
