import React from 'react';


const CreateProduct = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <h2>Create Product</h2>
            <form>
                <p>
                    Title:
                    <input
                        type="text"
                        name="title"
                    />
                </p>
                <p>
                    description:
                    <textarea
                        name='description'
                    >
                    </textarea>
                </p>
                <p>
                    price:
                    <input
                        type="number"
                        name="price"
                    />
                </p>
                <p>
                    discount Percentage:
                    <input
                        type="number"
                        name="discountPercentage"
                    />
                </p>
                <p>
                    rating:
                    <input
                        type="number"
                        name="rating"
                    />
                </p>
                <p>
                    stock:
                    <input
                        type="number"
                        name="stock"
                    />
                </p>
                <p>
                    brand:
                    <input
                        type="text"
                        name="brand"
                    />
                </p>
                <p>
                    category:
                    <input
                        type="text"
                        name="category"
                    />
                </p>
                <p>
                    thumbnail:
                    <input
                        type="text"
                        name="thumbnail"
                    />
                </p>
                <p>
                    images:
                    <input
                        type="text"
                        name="images"
                    />
                </p>
                <p>
                    <button
                        type='submit'
                        onClick={handleSubmit}
                    >Add Product</button>
                </p>
            </form>
        </div>
    )
}

export default CreateProduct;