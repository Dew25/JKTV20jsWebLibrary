"use strict";

import {viewModule} from './ViewModule.js';
import {loginModule} from './LoginModule.js';


export {checkMenu};
const newAuthor = document.getElementById('menu_new_author');
newAuthor.addEventListener('click',(e)=>{
    e.preventDefault();
    toggleMenuActive('menu_new_author');
    viewModule.showNewAuthorForm();
});
const newBook = document.getElementById('menu_new_book');
newBook.addEventListener('click',(e)=>{
    e.preventDefault();
    toggleMenuActive('menu_new_book');
    viewModule.showNewBookForm();
});
const buyBook = document.getElementById('menu_buy_book');
buyBook.addEventListener('click',(e)=>{
    e.preventDefault();
    toggleMenuActive('menu_buy_book');
});
const profile = document.getElementById('menu_profile');
profile.addEventListener('click',(e)=>{
    e.preventDefault();
    toggleMenuActive('menu_profile');
});
const adminPanel = document.getElementById('menu_admin_panel');
adminPanel.addEventListener('click',(e)=>{
    e.preventDefault();
    toggleMenuActive('menu_admin_panel');
});
const menuLogin = document.getElementById('menu_login');
menuLogin.addEventListener('click',(e)=>{
    e.preventDefault();
    viewModule.showLoginForm();
});
const menuLogout = document.getElementById('menu_logout');
menuLogout.addEventListener('click',(e)=>{
    e.preventDefault();
    loginModule.logout();
});

function toggleMenuActive(selectedElementId){
    const menuElements = document.getElementsByClassName('nav-item');
    for (var i = 0; i < menuElements.length; i++) {
        if(menuElements[i].id === selectedElementId){
            if(!menuElements[i].classList.contains('active')){
                menuElements[i].classList.add('active');
            }
        }else{
            if(menuElements[i].classList.contains('active')){
                menuElements[i].classList.remove('active');
            }
        }
    }
}

function checkMenu(){
    const userRole = JSON.parse(sessionStorage.getItem('role'));
    if(userRole === null){
        if(!newAuthor.classList.contains('d-none')){
            newAuthor.classList.add('d-none');
        }
        if(!newBook.classList.contains('d-none')){
            newBook.classList.add('d-none');
        }
        if(!buyBook.classList.contains('d-none')){
            buyBook.classList.add('d-none');
        }
        if(!profile.classList.contains('d-none')){
            profile.classList.add('d-none');
        }
        if(!adminPanel.classList.contains('d-none')){
            adminPanel.classList.add('d-none');
        }
        if(menuLogin.classList.contains('d-none')){
            menuLogin.classList.remove('d-none');
        }
        if(!menuLogout.classList.contains('d-none')){
            menuLogout.classList.add('d-none');
        }
        
        return;
    }else if('READER'===userRole){
        if(!newAuthor.classList.contains('d-none')){
            newAuthor.classList.add('d-none');
        }
        if(!newBook.classList.contains('d-none')){
            newBook.classList.add('d-none');
        }
        if(buyBook.classList.contains('d-none')){
            buyBook.classList.remove('d-none');
        }
        if(profile.classList.contains('d-none')){
            profile.classList.remove('d-none');
        }
        if(!adminPanel.classList.contains('d-none')){
            adminPanel.classList.add('d-none');
        }
        if(!menuLogin.classList.contains('d-none')){
            menuLogin.classList.add('d-none');
        }
        if(menuLogout.classList.contains('d-none')){
            menuLogout.classList.remove('d-none');
        }
    }else if('MANAGER'===userRole){
        if(newAuthor.classList.contains('d-none')){
            newAuthor.classList.remove('d-none');
        }
        if(newBook.classList.contains('d-none')){
            newBook.classList.remove('d-none');
        }
        if(buyBook.classList.contains('d-none')){
            buyBook.classList.remove('d-none');
        }
        if(profile.classList.contains('d-none')){
            profile.classList.remove('d-none');
        }
        if(!adminPanel.classList.contains('d-none')){
            adminPanel.classList.add('d-none');
        }
        if(!menuLogin.classList.contains('d-none')){
            menuLogin.classList.add('d-none');
        }
        if(menuLogout.classList.contains('d-none')){
            menuLogout.classList.remove('d-none');
        }
    }else if('ADMINISTRATOR'===userRole){
        if(newAuthor.classList.contains('d-none')){
            newAuthor.classList.remove('d-none');
        }
        if(newBook.classList.contains('d-none')){
            newBook.classList.remove('d-none');
        }
        if(buyBook.classList.contains('d-none')){
            buyBook.classList.remove('d-none');
        }
        if(profile.classList.contains('d-none')){
            profile.classList.remove('d-none');
        }
        if(adminPanel.classList.contains('d-none')){
            adminPanel.classList.remove('d-none');
        }
        if(!menuLogin.classList.contains('d-none')){
            menuLogin.classList.add('d-none');
        }
        if(menuLogout.classList.contains('d-none')){
            menuLogout.classList.remove('d-none');
        }
    }
}
checkMenu();
