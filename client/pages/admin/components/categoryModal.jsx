import React from 'react';
import axios from "axios";

const CategoryModal = () => {
    const [name, setName] = React.useState('')
    const [categories, setCategories] = React.useState([])

    const addNewCategory = () => {
        axios.post(`${process.env.SERVER_URL}/category`, {"name": name})
            .then(res => {
                setCategories([...categories, res.data]);
                setName('');
            })
            .catch(error => console.log(error))
    }

    const deleteCategory = (categoryId) => {
        axios.delete(`${process.env.SERVER_URL}/category/${categoryId}`)
            .then(res =>
                setCategories(categories.filter(item => item.id !== categoryId))
            )
            .catch(error => console.log(error))
    }

    React.useEffect(() => {
        axios.get(`${process.env.SERVER_URL}/category`)
            .then(res => setCategories(res.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div className='border flex flex-col'>
            <h3>Создание новой категории товаров</h3>
            <input
                type="text"
                placeholder="Введите наименование категории"
                value={name}
                onChange={(e) =>setName(e.target.value)}
            />
            <button onClick={() => addNewCategory()}>Создать</button>

            <h3>Список всех категорий</h3>
            <div className=''>
                <ul>
                    {categories.map((category, idx) =>
                        <li
                            key={idx}
                            className='flex flex-row justify-between px-6'
                        >
                            <p>{`${idx}) ${category.name}`}</p>
                            <button onClick={() => deleteCategory(category.id)}>delete</button>
                        </li>
                    )}

                </ul>
            </div>
        </div>
    );
};

export default CategoryModal;