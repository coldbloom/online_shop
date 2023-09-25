import React from 'react';
import axios from 'axios'

const ProductModal = () => {
    const [categories, setCategories] = React.useState([])
    const [selectedItem, setSelectedItem] = React.useState('')

    React.useEffect(() => {
        axios.get(`${process.env.SERVER_URL}/category`)
            .then(res => setCategories(res.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <h3>Создание карточки товара</h3>
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
    );
};

export default ProductModal;