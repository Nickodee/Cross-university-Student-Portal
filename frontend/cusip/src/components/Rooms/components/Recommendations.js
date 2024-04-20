import React, { useState,useEffect } from 'react';

function Recommendations() {
    const [course, setCourse] = useState('');
    const [department, setDepartment] = useState('');
    const [recommendationsData, setRecommendationsData] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Fetch recommendations from the backend API
        try {
            const response = await fetch('http://localhost:8000/api/get_recommendations/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ course, department }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch recommendations');
            }

            const data = await response.json();
            setRecommendationsData(data.recommendations);
            setError('');
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setError('Failed to fetch recommendations');
            setRecommendationsData([]);
        }
    };

    useEffect(() => {
        console.log("Recommendations", recommendationsData);
    }, [recommendationsData]);



    return (
        <div>
            <h1 className='text-center text-3xl mt-3'>Would you want a Project Partner?</h1>
            <div className='w-full bg-white p-2 mt-2 rounded flex flex-col gap-2'>
                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label>Course</label>
                        <input
                            className='outline-none p-1 border'
                            placeholder='Enter Your Course'
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label>Department</label>
                        <input
                            className='outline-none p-1 border'
                            placeholder='Enter Your Department'
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='bg-[#2dabb1] p-1 text-white'>
                        Get Recommendations
                    </button>
                </form>
                <div className='bg-white mt-2 p-2'>
                    { Array.isArray(recommendationsData) && recommendationsData.length > 0 ? (
                        <ul>
                            {recommendationsData.map((recommendation, index) => (
                                <li key={index}>
                                    {/* Display recommendation details */}
                                    <p><span className='font-bold'>Name:</span>{recommendation.name}</p>
                                    <p><span className='font-bold'>University:</span> {recommendation.university}</p>
                                    <p><span className='font-bold'>Course:</span> {recommendation.course}</p>
                                    <p><span className='font-bold'>Department:</span> {recommendation.department}</p>
                                    <p ><span className='font-bold'>profile link:</span> <a href={recommendation.profile_link} target="_blank" rel="noopener noreferrer" className='text-blue-400'>{recommendation.profile_link}</a></p>
                                    <p className='mb-5'><span className='font-bold'>Region:</span> {recommendation.region}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No recommendations available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Recommendations;
