import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Card from './Card'
import axios from 'axios'
import logo from './pexels-ash-craig-122861-376464.jpg'
import logo1 from './pexels-chanwalrus-958545.jpg'
import logo2 from './pexels-ella-olsson-572949-1640777.jpg'
function Home() {
    const [search,setSearch] = useState("")
    const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([])

    const loadData = async () => {
        try {
            await axios.post("http://localhost:4000/api/foodData")
                .then(function (response) {
                    // console.log(response.data[0],response.data[1]);
                    setFoodItem(response.data[0])
                    setFoodCat(response.data[1])

                })

        } catch (err) {
            console.error(err); // Log error for debugging
        }
    };

    useEffect(() => {
        loadData();
    }, []); // Empty 
    return (
        <>
            <div>
                <Navbar />
            </div>

            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: 'contain' }}>
                <div className="carousel-inner" id='carousel' >
                    <div className='carousel-caption' style={{ zIndex: "10" }}>
                        <div class="d-flex justify-contend-center">
                            <input class="form-control me-2 bg-dark text-white" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
                            {/* <button class="btn btn-outline-success bg-success text-white" type="submit">Search</button> */}
                        </div>
                    </div>

                    <div className="carousel-item active">
                        <img src={logo} className="d-block w-100 " style={{ filter: "brightness(30%)", height: '700px' }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={logo1} className="d-block w-100" style={{ filter: "brightness(30%)", height: '700px' }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={logo2} className="d-block w-100" style={{ filter: "brightness(30%)", height: '700px' }} alt="..." />
                    </div>
                </div>


                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            
            <div className='container-fluid'>
                {
                    (foodCat !== "")
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {foodItem !== ""
                                        ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())))
                                            .map(filterItem => {
                                                return (
                                                    <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                                                        <Card foodItems={filterItem}
                                                            options={filterItem.options}
                                                            
                                                        ></Card>
                                                    </div>
                                                )
                                            }) : <div>No such data found</div>
                                    }
                                </div>
                            )
                        }) : <div>""""""""""</div>

                }
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Home
