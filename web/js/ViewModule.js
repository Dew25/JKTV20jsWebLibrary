
import {loginModule} from './LoginModule.js';
import {managerModule} from './ManagerModule.js';

class ViewModule{
    showLoginForm(){
        document.getElementById('content').innerHTML = 
            `<div class="card border-light my-5" style="width: 30rem;">
                <div class="card-body">
                  <legend>Авторизация</legend>
                  <div class="form-group mb-3">
                    <label for="login">Логин</label>
                    <input type="text" class="form-control" id="login" name="login" aria-describedby="login" placeholder="">
                    <small id="login_error" class="form-text text-muted d-none">Это поле не должно быть пустым</small>
                  </div>
                  <div class="form-group mb-3">
                    <labelpassword">Пароль</label>
                    <input type="password" class="form-control" id="password" name="password" aria-describedby="password" placeholder="">
                    <small id="password_error" class="form-text text-muted d-none">Это поле не должно быть пустым</small>
                  </div>
                  <button id="btn_login" type="submit" class="btn btn-primary mt-4">Войти</button>
                  <p class="text-info w-100 text-center my-3">Нет логина? <a href="showRegistration">Зарегистрироваться</a></p>
                </div>
            </div>`;
        document.getElementById('password').addEventListener('keypress',e=>{
            if(e.key === 'Enter'){
               loginModule.login(); 
            }
        });
        document.getElementById('btn_login').addEventListener('click',e=>{
            e.preventDefault();
            loginModule.login();
        });
    }
    showNewAuthorForm(){
        document.getElementById('content').innerHTML = 
                    `<div class="d-flex flex-column">
                        <div class="card border-light my-5" style="width: 30rem;">
                            <div class="card-body">
                              <legend>Добавление автора</legend>
                              <div class="form-group mb-3">
                                <label for="name">Имя</label>
                                <input type="text" class="form-control" id="name" name="name" aria-describedby="name" placeholder="" value="">
                                <small id="caption" class="form-text text-muted d-none">Это поле не должно быть пустым</small>
                              </div>
                              <div class="form-group mt-3">
                                <label for="lastname">Фамилия</label>
                                <input type="text" class="form-control" id="lastname" name="lastname" aria-describedby="lastname" placeholder="" value="">
                                <small id="publishedYear" class="form-text text-muted d-none">Это поле не должно быть пустым</small>
                              </div>
                              <div class="form-group  mt-3">
                                <label for="year">Год рождения</label>
                                <input type="text" class="form-control" id="year" name="year" aria-describedby="year" placeholder="" value="">
                                <small id="quantity" class="form-text text-muted d-none">Это поле не должно быть пустым</small>
                              </div>
                              <div class="form-group  mt-3">
                                <label for="day">День рождения</label>
                                <input type="text" class="form-control" id="day" name="day" aria-describedby="day" placeholder="" value="">
                                <small id="quantity" class="form-text text-muted d-none">Это поле не должно быть пустым</small>
                              </div>
                              <div class="form-group  mt-3">
                                <label for="month">Месяц рождения</label>
                                <input type="text" class="form-control" id="month" name="month" aria-describedby="month" placeholder="" value="">
                                <small id="quantity" class="form-text text-muted d-none">Это поле не должно быть пустым</small>
                              </div>
                                <button id="btn_add_author" type="submit" class="btn btn-primary mt-4">Добавить автора</button>
                            </div>
                        </div>
                        <div class="card border-light my-5" style="width: 30rem;">
                            <div class="card-body">
                                <h3 class="card-body">Изменить автора</h3>
                              <select id="changeAuthorId"></select>
                            </div>
                        </div>
                    </div>`;
        managerModule.insertAuthorOptions();
        document.getElementById('changeAuthorId').addEventListener('change',e=>{
            managerModule.insertAuthorData();
        });
        document.getElementById('btn_add_author').addEventListener('click',e=>{
            e.preventDefault();
            managerModule.createNewAuthor();
        });
    }
}
const viewModule = new ViewModule();
export {viewModule};

