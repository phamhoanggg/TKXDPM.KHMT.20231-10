import React from 'react';
import Footer from "../../Footer";
import Header from "../../Header";
import Card from "../../Contents/Cards/card";
import search from '../../../images/search.png'
import {useState,useEffect} from 'react';
import mediaService from "../../../api/mediaApi";
import SelectCategory from "../../Contents/Select/selectCategory";

const mediaServiceInstance = new mediaService();

export default function Search({categories}){
    const [state, setState] = useState('');
    const [medialist, setMediaList] = useState([]);
    const [keywordInput, setKeywordInput] = useState('');
    const [keyword, setKeyword] = useState('');
    
    const handleChangeCategory = (selectedOption) =>{
        setState(selectedOption);
        setKeyword('');
    }
    const handleChangeKeyword = (event) => {
        setKeywordInput(event.target.value);
    }

    function onClickSearch(){
        setState('all');
        setKeyword(keywordInput);
    }
    useEffect(()=>{
      // call api
      (async () => {
        const res = await mediaServiceInstance.getAllMedia();
        setMediaList(res);
      })()
    },[])

    return(
        <>
            <Header />
            <p className="text-xl font-bold ml-32 pb-8 pt-32">Tìm kiếm sản phẩm</p>

            <div className="flex flex-col flex-wrap lg:flex-row items-center justify-center space-y-8">
                <div className="mb-6 mx-4 flex flex-row items-center w-max">
                    <input
                        type="search"
                        onChange={handleChangeKeyword}
                        className="bg-gray-50 border border-blue-400 text-gray-900 border-2
                        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                        flex w-96 p-2.5"
                        placeholder="Nhập tên sản phẩm"/>

                    <div
                      className="cursor-pointer text-lg font-medium text-gray-500 hover:text-gray-900 w-12"
                      onClick={onClickSearch}  
                    >
                      <div className="cursor-pointer flex items-center">
                        <img
                          className="h-5 ml-3 w-auto sm:h-5"
                          src= {search}
                          alt=""
                        />
                      </div>
                    </div>

                    <div className='w-40'>
                        <SelectCategory
                          onSelectCategory={handleChangeCategory}
                          categories={categories}
                        />
                    </div>
                </div>
            </div>

            <Card mediaList={medialist} state={state} setState={setState} keyword={keyword.trim().toLowerCase()}/>

            <Footer />
        </>

    );
}