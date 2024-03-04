import React from 'react'

const AddCates = () => {
  return (
    <div>
    <h3 className='my-4'>Categories</h3>
    <form className="py-4">
      <div className="mb-3">
        <label htmlFor="exampleInputName" className="form-label">Title</label>
        <input type="text" className="form-control" id="exampleInputName"/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputImage" className="form-label">Image</label>
        <input type="file" className="form-control border-0" id="exampleInputImage"/>
      </div>
      <button type="submit" className="btn btn-info text-light px-3">Add</button>

  </form>
    </div>
  )
}

export default AddCates
