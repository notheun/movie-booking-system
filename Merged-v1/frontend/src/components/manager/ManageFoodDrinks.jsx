import React, { useState, useEffect } from 'react';

import FoodDrinkService from '../../services/FoodDrinkService';
import ImageService from '../../services/ImageService';

const ManageFoodDrinks = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItem();
    }, []);

    const getItem = () => {
        FoodDrinkService.viewFoodDrinks()
        .then((res) => {
            setItems(res.data);
        })
        .catch((e) => {
            console.log(e);
        });
    };

    const deleteItem = (itemNumber) => {
        FoodDrinkService.deleteFoodDrinks(itemNumber)
            .then(() => {
                alert(`Food and drinks item ${itemNumber} deleted successfully`);
                getItem();
                // delete the image file from the server
                const imageURL = items.find(item => item.itemNumber === itemNumber).poster;
                if (imageURL) {
                    const filename = imageURL.split("/").pop();
                    ImageService.delete(filename)
                        .then(() => {
                            console.log("Image deleted successfully");
                            // re-render new list
                            getItem();
                        })
                        .catch((error) => {
                            console.log("Failed to delete image:", error);
                        });
                } else {
                    console.log("No image associated with the item.");
                    // re-render new list
                    getItem();
                }
            })
            .catch((error) => {
                alert("Failed to delete food and drinks item:", error);
            });
    };
    

    return (
        <div>
            {items.map((item, index) => (
                <div key={index}>
                    <img src={item.poster} alt={`${item.description}`} />
                    <h3>Item: {item.itemNumber}</h3>
                    <p>Description: {item.description}</p>
                    <p>Price: ${item.price}</p>
                    <button onClick={() => deleteItem(item.itemNumber)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ManageFoodDrinks;
