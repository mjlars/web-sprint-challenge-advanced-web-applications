import axiosWithAuth from './axiosWithAuth';

export const fetchColorList = () => {
    return(
        axiosWithAuth()
        .get('/colors')
        .then(res => {
            return res
        })
        .catch(err => {
            return err;
        })
    )
};
