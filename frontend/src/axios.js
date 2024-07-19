import axios from "axios"

export const callSignup = async (user) => {
    try {
        const response = await axios.post(
            "http://localhost:1111/signup", user
        );
        // Add this line
        return response.data;
    } catch (err) {
        console.error(err);
        return "An error occurred while fetching data.";
    }
};

export const callSignin = async (user) => {

    const response = await axios.post(
        "http://localhost:1111/signin", user
    );
    if (response.user) {
        sessionStorage.setItem('logged', response.data.user.username)
        window.location.assign("/home")
    }
};

export const fetchRecipes = async (user) => {


}


export const updateWishlist = async (username, wishlist) => {
        const response = await axios.put(`http://localhost:1111/update/${username}/${wishlist}`);
        console.log('Wishlist added:', response.data);
  
};
