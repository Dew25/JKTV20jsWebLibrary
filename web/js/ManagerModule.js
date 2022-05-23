import {viewModule} from './ViewModule.js';
class ManagerModule{
    insertAuthorOptions(){
        let promiseListAuthors = fetch('getListAuthors', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: 'include'
        });
        promiseListAuthors.then(response => response.json())
                    .then(response =>{
                        if(response.status){
                            let select = document.getElementById('changeAuthorId');
                            select.options.length = 0;
                            let option = document.createElement('option');
                            option.text = 'Выберите автора';
                            option.value = '#';
                            select.options.add(option);
                            for (let i=0; i<response.authors.length;i++) {
                                option = document.createElement('option');
                                option.text = response.authors[i].name+' '+response.authors[i].lastname;
                                option.value = response.authors[i].id;
                                select.options.add(option);
                            }
                        }
                    })
                    .catch(error => {
                        document.getElementById('info').innerHTML="Ошибка insertAuthorOptions: "+error;
                    });
    }
    createNewAuthor(){
        const name = document.getElementById('name').value;
        const lastname = document.getElementById('lastname').value;
        const year = document.getElementById('year').value;
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const author = {
            "name": name,
            "lastname": lastname,
            "year": year,
            "day": day,
            "month": month
        };
        let promiseCreateAuthor = fetch('createAuthor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: 'include',
            body: JSON.stringify(author)
        });
        promiseCreateAuthor.then(response => response.json())
                    .then(response =>{
                        document.getElementById('info').innerHTML=response.info;
                        viewModule.showNewAuthorForm();
                    })
                    .catch(error => {
                        document.getElementById('info').innerHTML="Ошибка createNewAuthor: "+error;
                    })
    }
}
const managerModule = new ManagerModule();
export {managerModule};
