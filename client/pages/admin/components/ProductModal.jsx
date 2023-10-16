import React from 'react';
import axios from 'axios'
import Image from "next/image";

const ProductModal = () => {
    const [categories, setCategories] = React.useState([])
    const [selectedItem, setSelectedItem] = React.useState('')
    const [products, setProducts] = React.useState([])

    const [name, setName] = React.useState('')
    const [price, setPrice] = React.useState('')

    const [img, setImg] = React.useState(null)

    const sendFile = React.useCallback(async (productId) => {
        try {
            const data = new FormData()
            data.append('image', img)

            await axios.post(`${process.env.SERVER_URL}/product/${productId}/uploadImage`, data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
        } catch (error) {
            console.log(error)
        }
    }, [img])

    React.useEffect(() => {
        axios.get(`${process.env.SERVER_URL}/category`)
            .then(res => setCategories(res.data))
            .catch(error => console.log(error))
    }, [])

    React.useEffect(() => {
        axios.get(`${process.env.SERVER_URL}/product`)
            .then(res => {
                setProducts(res.data)
                console.log(res.data)
            })
            .catch(error => console.log(error))
    }, [])

    const addNewProduct = () => {
        axios.post(`${process.env.SERVER_URL}/product`, {name: name, price: price, categoryId: selectedItem})
            .then(res => setProducts([...products, res.data]))
            .catch(error => console.log(error))
    }

    const deleteProduct = (productId) => {
        console.log(productId)
        axios.delete(`${process.env.SERVER_URL}/product/${productId}`)
            .then(res => {
                setProducts(products.filter(item => item.id !== productId))
                console.log(products, 'after delete')
            })
            .catch(error => console.log(error))
    }

    const findCategory = (id) => {
        const item = categories.find(item => item.id === id)
        return item?.name
    }

    React.useEffect(() => {

    }, [selectedItem])

    return (
        <div className='border flex flex-col'>
            <h3>Создание карточки товара</h3>
            <div className='flex flex-row'>
                <p>Выберите категорию для товара:</p>
                <select
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                >
                    {categories.map(category =>
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category?.name}
                        </option>)}
                </select>
            </div>
            <input type="text"
                   placeholder='Введите наименование товара'
                   value={name}
                   onChange={e => setName(e.target.value)}
                   className='border rounded w-full'
            />
            <input type="text"
                   placeholder='Введите цену товара'
                   value={price}
                   onChange={e => setPrice(e.target.value)}
                   className='border rounded w-full'
            />
            <button
                onClick={() => addNewProduct()}
                className='bg-blue-400'
            >
                Добавить товар
            </button>

            <h3>Список всех товаров</h3>
            <ul>
                {products.map((product, idx) =>
                    <li
                        key={idx}
                        className='flex flex-row justify-center px-6 items-center'
                        style={{display: 'grid', gridTemplateColumns: '1fr 3fr 3fr 4fr 1fr'}}
                    >
                        <p>{idx})</p>
                        <div>
                            <p>{`наименование: ${product.name}`}</p>
                            <p>{`категория: ${findCategory(product.categoryId)}`}</p>
                            <p>{`цена: ${product.price}`}</p>
                            {console.log(product.categoryId)}
                        </div>
                        <div>
                            <input type="file" onChange={e => setImg(e.target.files[0])}/>
                            <button onClick={() => sendFile(product.id)}>Добавить изображение</button>
                        </div>
                        <div>
                            {product.images.length !== 0
                                ? product.images.map(item =>
                                    <div className='relative'>
                                        {/*<Image*/}
                                        {/*    fill={true}*/}
                                        {/*    src={`http://localhost:3031/${item}`}*/}
                                        {/*    alt="no image"*/}
                                        {/*/>*/}
                                        <p>{item}</p>
                                    </div>
                                )
                                : <p>Фотографий нет</p>
                            }

                            {/*<div className='relative'>*/}
                            {/*    <Image*/}
                            {/*        src={`http://localhost:3031/images/20/1697376230682-76DC15A9-40B1-483B-8EAB-08F80949C712.jpg`}*/}
                            {/*        alt="no image"*/}
                            {/*        width={50}*/}
                            {/*        height={50}*/}
                            {/*    />*/}
                            {/*</div>*/}
                        </div>
                        <button onClick={() => deleteProduct(product.id)}>delete</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default ProductModal;