import React from 'react';
import axios from 'axios'

const ProductModal = () => {
    const [categories, setCategories] = React.useState([])
    const [selectedItem, setSelectedItem] = React.useState('')

    const [name, setName] = React.useState('')
    const [price, setPrice] = React.useState('')

    React.useEffect(() => {
        axios.get(`${process.env.SERVER_URL}/category`)
            .then(res => setCategories(res.data))
            .catch(error => console.log(error))
    }, [])

    const addNewProduct = () => {

    }

    return (
        <div>
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
                            {category.name}
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
        </div>
    );
};

export default ProductModal;