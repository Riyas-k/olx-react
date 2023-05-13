import React, { useContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import Heart from "../../assets/Heart";
import "./Post.css";
import { useNavigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { PostContext } from "../../store/PostContext";
import Loader from "../../Loader";

function Posts() {
  const [products, setProducts] = useState([]);
  const {setPostDetails} = useContext(PostContext)
  const db = getFirestore();
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsCollection = collection(db, "products");
        const querySnapshot = await getDocs(productsCollection);
  
        const updatedProducts = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          const product = doc.data();
          const { id } = doc;
          updatedProducts.push({ id, ...product });
        });
  
        setProducts(updatedProducts);
        console.log(updatedProducts);
      } catch (error) {
        console.error("Error getting products:", error);
      }
    }
  
    fetchProducts();
  }, []);

  if(!products){
      return (
        <Loader />
      )
  
  }
  

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((data) => {
            return (
              <div className="card" onClick={()=>{setPostDetails(data); navigate('/view')}}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={data.image} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9;{data.price}</p>
                  <span className="kilometer">{data.category}</span>
                  <p className="name"> {data.name}</p>
                </div>
                <div className="date">
                  <span>{data.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
