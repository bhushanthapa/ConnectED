import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        const sessionId = Cookies.get('sessionid');
        const csrfToken = Cookies.get('csrftoken');
        console.log(csrfToken);
        console.log(sessionId);
        axios.get('http://192.168.1.7:8000/user-profile/', {
            withCredentials: true,
            // headers: {
            //     'Content-Type': 'application/json',
            //     'sessionid': sessionId,
            //     'X-CSRFToken': csrfToken,
            // },
        })
            .then(response => {
                const data = response.data;
                console.log('User profile data:', data);
                setUserProfile(data);

                if (data.user_role === '0') {
                    window.location.href = '/mentor-wait';
                }
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);

                if (error.response && error.response.status === 401) {
                    window.location.href = '/login';
                } else {
                    window.location.href = '/login';
                }
            });
    }, []);
    return (
        <div>
            {userProfile ? (
                <div>
                    <h2>User Profile Details</h2>
                    <p><strong>Profile Image:</strong> <br />
                        <img
                            alt="profile"
                            style={{
                                border: `1px solid ${userProfile.profile.user_role === '1' ? 'blue' : '#ddd'}`,
                                borderRadius: '50%',
                                width: '250px',
                                height: '250px'
                            }}
                            src={userProfile.profile.display_image}
                        />
                    </p>
                    {/* <p>
                        <strong>Mentor Image:</strong>
                        <br />
                        <img src={`data:image/png;base64, ${userProfile.mentor_id_image_data}`} style={{ border: '1px solid #ddd', height: '250px' }} alt="Mentor ID" />
                    </p> */}
                    <p><strong>Name:</strong> {userProfile.profile.full_name}</p>
                    <p><strong>Email:</strong> {userProfile.email}</p>
                    <p><strong>College:</strong> {userProfile.profile.college_name}</p>
                    <p><strong>Course:</strong>
                        {userProfile.profile.community_id === 1 ? 'BCA' :
                            userProfile.profile.community_id === 2 ? 'BCom' :
                                userProfile.profile.community_id === 3 ? 'BCom Hons' :
                                    userProfile.profile.community_id === 4 ? 'BBA' :
                                        'Unknown Course'}
                    </p>

                </div>
            ) : (
                <p>Loading...</p>
            )}
            <Link to="/homepage">
                <button className="register-button">Homepage</button>
            </Link>
        </div>
    );
};

export default ProfilePage;
