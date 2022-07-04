import { extract } from "laravel-mix";
import React from "react";

function CategoriesService () {

    getAll = () => {
        return fetch('http://localhost:8000/api/categories')
            .then(response => response.json())
            .then(data => {
                return data.data;
            })
    }

}

export default CategoriesService