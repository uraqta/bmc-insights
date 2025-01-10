'use client';
import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  title: string;
  text: string;
  imageUrl: string | null;
}

interface User {
  username: string;
  title: string;
  text: string;
  imageUrl: string | null;
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsersWithPosts = async () => {
      try {
        const response = await axios.get("/api/getpost");
        console.log("API Response:", response.data);

        const postArray: User[] = response.data.posts || [];
        console.log("Post Array:", postArray);

        setUsers(postArray);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersWithPosts();
  }, []);

  const handleAccept = async (index: number) => {
    const acceptedPost = users[index];

    try {
      // Remove the accepted post from the users array
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);

      // Send the accepted post data to the backend
      await axios.post("/api/handelpost", {
        username: acceptedPost.username,
        title: acceptedPost.title,
        text: acceptedPost.text,
        imageUrl: acceptedPost.imageUrl,
      });
      await axios.post('/api/newsletter', acceptedPost);

      console.log("Accepted Post:", acceptedPost);
    } catch (error) {
      console.error("Error accepting post:", error);
    }
  };

  const handleReject = async (index: number) => {
    const rejectedPost = users[index];

    try {
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
      await axios.post("/api/handelpost", {
        username: rejectedPost.username,
        title: rejectedPost.title,
        text: rejectedPost.text,
        imageUrl: rejectedPost.imageUrl,
      });

    }catch(error){
      console.error("Error accepting post:", error);


    }
  };

  return (
    <div className="p-4">
      {users && users.length > 0 ? (
        users.map((user, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1>{user.title}</h1>
                <h2 className="text-lg font-semibold">{user.username}</h2>
                <div className="mt-2">
                  <p>{user.text}</p>
                  {user.imageUrl && (
                    <img
                      src={user.imageUrl}
                      alt="Post Image"
                      className="mt-2 max-w-full"
                    />
                  )}
                </div>
              </div>
              {/* Buttons Section */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(index)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading users or no users found...</p>
      )}
    </div>
  );
};

export default Dashboard;
