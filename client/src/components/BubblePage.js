import React, { useEffect, useState } from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from '../utils/axiosWithAuth';
import { fetchColorList } from '../utils/fetchColorData'


const BubblePage = () => {

  const [colorList, setColorList] = useState([]);

  const getListData = () => {
    fetchColorList()
      .then((req => {
        setColorList(req.data);
      }))
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getListData()
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getColorList={getListData} />
      <BubblesForm />
      <Bubbles colors={colorList} />
    </>
  );
};

const BubblesForm = () => {
    const [formValues, setFormValues] = useState({
        color: '',
        code: null,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth()
        .post('/colors', formValues)
        .then()
            console.log(formValues);
    };

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
      };

    return(
        <div>
            <form onSubmit={onSubmit}>
                <label>color name: </label>
                <input 
                type='text'
                name='color'
                value={formValues.color}
                onChange={handleChange}
                />
                <label>hex code: </label>
                <input
                type='text'
                name='code'
                value={formValues.code}
                onChange={handleChange}
                />
                <button>submit</button>
            </form>
        </div>
    )
}

export default BubblePage;