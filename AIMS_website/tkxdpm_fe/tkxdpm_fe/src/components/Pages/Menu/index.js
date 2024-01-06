import Card from "../../Contents/Cards/card";
import SelectCard from "../../Contents/ExampleCard/SelectCard";
import Footer from "../../Footer";
import Header from "../../Header";
import {useState,useEffect} from 'react';


let cate ='all';
let mediaList=[];
export default function Menu({mediaList,cateList}) {

    const [state, setState] = useState(cate);

    return (
      <>
        <Header></Header>
        <SelectCard cateList={cateList} state={state} setState={setState}/>
        <Card mediaList={mediaList} state={state} setState={setState} keyword={''}/>
        <Footer/>
      </>
    )
}
  
