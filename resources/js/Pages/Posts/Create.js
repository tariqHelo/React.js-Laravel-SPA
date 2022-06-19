
import axios from 'axios';
import React,{ useEffect, useState } from 'react';
import { Navigate , Route } from "react-router-dom";
function PostsCreate() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category_id, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    async function fetchCategory() {
        const response = await fetch('http://127.0.0.1:8000/api/categories')
        const cateogry = await response.json();
        //console.log(response);
        setCategories(cateogry.data);
    }
    useEffect(() => {
        fetchCategory()
    }, []);
   
    const categoryDropdown = categories.map(category => {
        return <option key={category.id} value={category.id}>{category.name}</option>
        }
    )

   const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(title, content, category_id);
        //send multipart form data to server

        // cheack is loading is true
        if(loading) {
            return  setSatate({error: "Please wait..."} , setLoading(true))
        }

        // setLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category_id', category_id);
        const response = await axios.post('http://127.0.0.1:8000/api/posts', formData)
       .then(res => window.location.href = "/" )
       .catch(err => setError(err.response.data.errors))
       .finally(() => setLoading(false));
    }

   
    //   ErrorMsg = (filed) => {
    //      return <div className="alert alert-danger">
    //         {
    //             error.map(err => {
    //         }
    //      </div> 
    //     }

    // let errorMsg = error.map(error => {
    //     return <div className="text-red-500">{error}</div>
    // }
    // )

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title" className="block font-medium text-sm text-gray-700">
                    Title
                </label>
                <input value={title} onChange={(e) => setTitle(e.target.value) }  id="title" type="text" className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                <div className='text-red-600 mt-2'>
                    {/* {errorMsg} */}
                    {error.title && <p className="text-red-500 text-xs italic">{error.title}</p>}
                </div>
            </div>
            <div className="mt-4">
                <label htmlFor="content" className="block font-medium text-sm text-gray-700">
                    Content
                </label>
                <textarea value={content} onChange={(e) => setContent(e.target.value) }  id="content" type="text" className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                <div className='text-red-600 mt-2'>
                    {error.content && <p className="text-red-500 text-xs italic">{error.content}</p>}
                </div>
            </div>
            <div className="mt-4">
                <label htmlFor="category" className="block font-medium text-sm text-gray-700">
                    Category
                </label>
                <select  value={category_id} onChange={(e) => setCategoryId(e.target.value)} id="category" className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option value="">-- Select category --</option>
                    {categoryDropdown}
                </select>
                <div className='text-red-600 mt-2'>
                    {error.category_id && <p className="text-red-500 text-xs italic">{error.category_id}</p>}
                </div>
            </div>
            <div className="mt-4">
                    <button type="submit" className="flex items-center px-3 py-2 bg-blue-600 text-white rounded" disabled={loading}>
                        <svg role="status" className={`w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 inline ${!loading ? 'hidden' : ''}`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span>Save</span>
                    </button>
            </div>
        </form>
        
    );
}

export default PostsCreate;