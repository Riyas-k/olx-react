import React, { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import './Create.css';
import Header from '../Header/Header';
import { addDoc, getFirestore } from "firebase/firestore";
import { AuthContext } from '../../store/Context';
import { collection } from 'firebase/firestore';

const Create = () => {
  const [formData,setFormData] = useState({});
  const [image,setImage] = useState(null)
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const db = getFirestore();
  const handleForm = (e)=>{
      const {name,value} = e.target;

      setFormData((prevData)=>({
        ...prevData,
        [name]:value
      }))
      // console.log(formData);
  }
  const storage = getStorage();

const handleSubmit = async (e) => {
  e.preventDefault();
  const storageRef = ref(storage, image.name);
  const file = image;
  try {
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);

    const productsCollection = collection(db, 'products');
    const productData = {
      name: formData.Name,
      category: formData.category,
      price: formData.Price,
      image: downloadURL,
      createdAt: new Date().toDateString(),
      userId: user.uid
    };

    await addDoc(productsCollection, productData);
    navigate('/');
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input" 
              value={formData.Name || ''}
              onChange={handleForm}
              type="text"
              id="fname"
              name="Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              value={formData.category || ''}
              onChange={handleForm}
              type="text"
              id="fname"
              name="category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={formData.Price || ''}
              onChange={handleForm} />
            <br />
          <br />
          {
            image && (
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''}></img>

            )
          }
            <br />
            <input type="file" name='image' 
              onChange={(e)=>{
                setImage(e.target.files[0])
              }}/>
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;

