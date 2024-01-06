import * as React from "react";
import { fetchUtils, Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'
import { ListCategories, EditCategory, CreateCategory } from './categories'
import { ListProducts, CreateProduct, EditProduct } from "./products";
import axios from '../../../setup/CustomAxios';
import { CreateDish, ListOrders } from "./order";
import { AppBar, Layout } from "react-admin";
import { useNavigate } from "react-router-dom";

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('user');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
}


export default function AdminPage() {
    const navigate = useNavigate ();

    const MyAppBar = () => <AppBar position="absolute">
        <div onClick={() => {
            localStorage.removeItem('user');
            alert ("Bạn đã đăng xuất")
            navigate('/login');
        }} className="float-right px-4 py-2 rounded-lg bg-white text-cyan-700 hover:bg-cyan-100 hover:cursor-grab">Logout</div></AppBar>;

    const MyLayout = props => <Layout {...props} appBar={MyAppBar} />;
    return (
        <div><Admin basename="/admin"
            dataProvider={simpleRestProvider('http://localhost:8080', httpClient)}
            layout={MyLayout}
        >
            <Resource
                name='categories'
                list={ListCategories}
                edit={EditCategory}
                create={CreateCategory}
                
            />

            <Resource
                name="products"
                list={ListProducts}
                edit={EditProduct}
                create={CreateProduct}
            />

            <Resource
                name="orders"
                list={ListOrders}
            />

        </Admin></div>
    )
}