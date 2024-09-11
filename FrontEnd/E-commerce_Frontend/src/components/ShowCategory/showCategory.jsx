import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

export default function ShowCategory() {
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

  useEffect(() => {
    // Retrieve token from local storage
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }

    // Fetch categories when component mounts
    axios.get('http://localhost:8080/api/admin/category/all', {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleDeleteCategory = () => {
    // Send DELETE request to delete category by id
    axios.delete(`http://localhost:8080/api/admin/category/delete/${categoryIdToDelete}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Category deleted successfully:', categoryIdToDelete);
        // Update categories state after deletion
        setCategories(categories.filter(category => category.id !== categoryIdToDelete));
        setShowModal(false); // Close the modal after deletion
      })
      .catch(error => {
        console.error('Error deleting category:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>All Categories</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Category Name</th>
            <th scope="col">Parent Category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.categoryName}</td>
              <td>{category.parentCategory ? category.parentCategory.categoryName : '-'}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setCategoryIdToDelete(category.id);
                    setShowModal(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to confirm delete */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteCategory}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
