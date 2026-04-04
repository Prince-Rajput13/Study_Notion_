import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
function Home() {
  return (
    <div>
        {/* Section1 */}
        <div className='relative text-white w-11/12 mx-auto justify-between items-center flex flex-col'>
            <Link to={"/signup"}>
                <div>
                    <div>
                        <p>
                            Become an instructor
                            <FaArrowRight/>
                        </p>
                    </div>
                </div>
            </Link>
        </div>
        {/* Section2 */}
        {/* Section3 */}
        {/* Footer */}
    </div>
  )
}

export default Home