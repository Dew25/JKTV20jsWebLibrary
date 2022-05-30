import {viewModule} from './ViewModule.js';
class ManagerModule{
    insertAuthorOptions(combobox){
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
                            if(combobox){
                                option.text = 'Выберите автора';
                                option.value = '#';
                                select.options.add(option);
                            }
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
    insertAuthorDataToChange(){
        const authorId = document.getElementById('changeAuthorId').value;
        let promiseInsertAuthorData = fetch('getChangeAuthor?authorId='+authorId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: 'include',
        });
        promiseInsertAuthorData.then(response => response.json())
                    .then(response =>{
                        if(response.status){
                            document.getElementById('info').innerHTML=response.info;
                            document.getElementById('id').value = response.changeAuthor.id;
                            document.getElementById('name').value = response.changeAuthor.name;
                            document.getElementById('lastname').value= response.changeAuthor.lastname;
                            document.getElementById('year').value= response.changeAuthor.year;
                            document.getElementById('day').value= response.changeAuthor.day;
                            document.getElementById('month').value= response.changeAuthor.month;
                            document.getElementById('titlePage').innerHTML = 'Изменение данных автора';
                            document.getElementById('btn_change_author').classList.remove('d-none');
                            document.getElementById('btn_add_author').classList.add('d-none');
                        }else{
                            document.getElementById('info').innerHTML=response.info;
                        }
                    })
                    .catch(error => {
                        document.getElementById('info').innerHTML="Ошибка insertAuthorDataToChange: "+error;
                    })
    }
    changeAuthor(){
        const id = document.getElementById('id').value;
        const name = document.getElementById('name').value;
        const lastname = document.getElementById('lastname').value;
        const year = document.getElementById('year').value;
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const changeAuthor = {
            "id": id,
            "name": name,
            "lastname": lastname,
            "year": year,
            "day": day,
            "month": month
        };
        let promiseUpdateAuthor = fetch('updateAuthor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: 'include',
            body: JSON.stringify(changeAuthor)
        });
        promiseUpdateAuthor.then(response => response.json())
                    .then(response =>{
                        document.getElementById('info').innerHTML=response.info;
                        viewModule.showNewAuthorForm();
                    })
                    .catch(error => {
                        document.getElementById('info').innerHTML="Ошибка changeAuthor: "+error;
                    })
    }
    createNewBook(){
        let promiseCreateBook = fetch('createBook', {
            method: 'POST',
            credentials: 'include',
            body: new FormData(document.getElementById('createBookForm'))
        });
        promiseCreateBook.then(response => response.json())
                    .then(response =>{
                        document.getElementById('info').innerHTML=response.info;
                        viewModule.showNewBookForm();
                    })
                    .catch(error => {
                        document.getElementById('info').innerHTML="Ошибка createNewBook: "+error;
                    })
    }
    insertBookOptions(combobox){
         let promiseListBooks = fetch('getListBooks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: 'include'
        });
        promiseListBooks.then(response => response.json())
                    .then(response =>{
                        if(response.status){
                            let select = document.getElementById('changeBookId');
                            select.options.length = 0;
                            let option = document.createElement('option');
                            if(combobox){
                                option.text = 'Выберите книгу';
                                option.value = '#';
                                select.options.add(option);
                            }
                            for (let i=0; i<response.books.length;i++) {
                                option = document.createElement('option');
                                option.text = response.books[i].caption;
                                option.value = response.books[i].id;
                                select.options.add(option);
                            }
                        }
                    })
                    .catch(error => {
                        document.getElementById('info').innerHTML="Ошибка insertAuthorOptions: "+error;
                    });
    }
    insertBookDataToChange(){
        const bookId = document.getElementById('changeBookId').value;
        let promiseInsertBookData = fetch('getChangeBook?changeBookId='+bookId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: 'include',
        });
        promiseInsertBookData.then(response => response.json())
                    .then(response =>{
                        if(response.status){
                            document.getElementById('id').value=response.changeBook.id;
                            document.getElementById('caption').value=response.changeBook.caption;
                            document.getElementById('publishedYear').value=response.changeBook.publishedYear;
                            document.getElementById('price').value=response.changeBook.price;
                            managerModule.insertAuthorOptions(false);
                            let select = document.getElementById('changeAuthorId');
                            for (var i = 0; i < select.options.length; i++) {
                                for (var j = 0; j < response.changeBook.authors.length; j++) {
                                    if(response.changeBook.authors[j].id === select.options[i]){
                                        select.options[i].selected = true;
                                    }
                                }
                            }
//                            managerModule.isertCovers();
                        }
                    })
                    .catch(error => {
                        document.getElementById('info').innerHTML="Ошибка insertBookDataToChange: "+error;
                    })
    }
}
const managerModule = new ManagerModule();
export {managerModule};
