import axios from "axios"

export const callSignup = async (user) => {
    try {
        const response = await axios.post(
            "http://localhost:1111/signup", user
        );
        // Add this line
        return response;
    } catch (err) {
        console.error(err);
        return "An error occurred while fetching data.";
    }
};


export const callSignin = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:1111/signin", user
      );
      if (response.data.user) {
        sessionStorage.setItem('logged', response.data.user.username);
        window.location.assign("/home");
      }
    } catch (err) {
      console.error(err);
      return "An error occurred while signing in.";
    }
  };

export const getWishlist = async (username) => {
    try {
      const response = await axios.get(`/getwishlist/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      throw error;
    }
  };


export const updateWishlist = async (username, wishlist) => {
        const response = await axios.put(`http://localhost:1111/update/${username}/${wishlist}`);
        console.log('Wishlist added:', response.data);
  
};

export  const callcred = async (users)=>{
    const log = await axios.post(`http://localhost:1111/signin`,users)
    return log
}