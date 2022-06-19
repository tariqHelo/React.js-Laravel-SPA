import { useEffect, useState } from 'react';

function PostIndex() {

    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState([]);

    console.log(category);
    async function fetchPosts() {
        const response = await fetch('http://127.0.0.1:8000/api/posts');
        const posts = await response.json();
        //console.log(posts);
        setPosts(posts.data);
    }
    // how to fetch categories
    async function fetchCategory() {
        const response = await fetch('http://127.0.0.1:8000/api/categories')
        const categories = await response.json();
       // console.log(response);
        setCategory(categories.data);
    }
    useEffect(() => {
        fetchPosts();
        fetchCategory()
    }, []);

    //how to make dropdown select category

    const categoryDropdown = category.map(category => {
        return <option key={category.id} value={category.id}>{category.name}</option>
     }
    )
    return (

        <div className="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
            <div className="min-w-full align-middle">
                <div className='mb-4'>
                    <select className="mt-1 w-full sm:mt-0 sm:w-1/4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" >
                        <option>-- all categories --</option>
                        {categoryDropdown}
                    </select>
                </div>
                <table className="table">

                    <thead className="table-header">
                        <tr>
                            <th>
                                <span>ID</span>
                            </th>
                            <th>
                                <span>Title</span>
                            </th>
                            <th>
                                <span>Category</span>
                            </th>
                            <th>
                                <span>Content</span>
                            </th>
                            <th>
                                <span>Created at</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {posts.map(post => {
                            return (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.category.name}</td>
                                    <td>{post.content}</td>
                                    <td>{post.created_at}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

}
export default PostIndex;