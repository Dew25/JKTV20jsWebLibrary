/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import entity.Author;
import entity.Book;
import entity.User;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import jsonbuilders.AuthorJsonBuilder;
import jsonbuilders.BookJsonBuilder;
import session.AuthorFacade;
import session.BookFacade;
import session.ReaderFacade;
import session.RoleFacade;
import session.UserFacade;
import session.UserRolesFacade;

/**
 *
 * @author teacher
 */
@WebServlet(name = "ManagerServlet", urlPatterns = {
    "/getListAuthors",
    "/createAuthor",
    "/getChangeAuthor",
    "/updateAuthor",
    "/createBook",
     "/getListBooks",
    "/getChangeBook",
    "/getListCoverFileNames",
    "/updateBook",
    
})
@MultipartConfig
public class ManagerServlet extends HttpServlet {
    @EJB private ReaderFacade readerFacade;
    @EJB private AuthorFacade authorFacade;
    @EJB private BookFacade bookFacade;
    @EJB private UserFacade userFacade;
    @EJB private RoleFacade roleFacade;
    @EJB private UserRolesFacade userRolesFacade;
    
    private final String pathToDir = "D:\\UploadDir\\JKTV20jsWebLibrary";
   
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        HttpSession session = request.getSession(false);
        if(session == null){
            request.setAttribute("info", "У вас нет прав. Войдите с правами менеджера");
            request.getRequestDispatcher("/showLogin").forward(request, response);
            return;
        }
        User authUser = (User) session.getAttribute("authUser");
        if(authUser == null){
            request.setAttribute("info", "У вас нет прав. Войдите с правами менеджера");
            request.getRequestDispatcher("/showLogin").forward(request, response);
            return;
        }
        
        if(!userRolesFacade.isRole("MANAGER", authUser)){
            request.setAttribute("info", "У вас нет прав. Войдите с правами менеджера");
            request.getRequestDispatcher("/showLogin").forward(request, response);
            return;
        }
        JsonObjectBuilder job = Json.createObjectBuilder();
        String path = request.getServletPath();
        switch (path) {
            case "/getListAuthors":
                List<Author> listAuthors = authorFacade.findAll();
                AuthorJsonBuilder ajb = new AuthorJsonBuilder();
                job.add("status", true);
                job.add("info", "");
                job.add("authors", ajb.getJsonArrayAuthors(listAuthors));
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/createAuthor":
                JsonReader jr = Json.createReader(request.getInputStream());
                JsonObject jo = jr.readObject();
                String name = jo.getString("name","");
                String lastname = jo.getString("lastname","");
                String year = jo.getString("year","");
                String day = jo.getString("day","");
                String month = jo.getString("month","");
                Author newAuthor = new Author();
                newAuthor.setName(name);
                newAuthor.setLastname(lastname);
                newAuthor.setDay(Integer.parseInt(day));
                newAuthor.setYear(Integer.parseInt(year));
                newAuthor.setMonth(Integer.parseInt(month));
                try {
                    authorFacade.create(newAuthor);
                    job.add("status", true);
                    job.add("info", "Автор успешно добавлен в базу");
                } catch (Exception e) {
                    job.add("status", false);
                    job.add("info", "Добавить автора не удалось");
                }
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/getChangeAuthor":
                String authorId = request.getParameter("authorId");
                Author author = authorFacade.find(Long.parseLong(authorId));
                ajb = new AuthorJsonBuilder();
                JsonObject joAuthor = ajb.getJsonObjectAuthor(author);
                job.add("status", true);
                job.add("info", "Редактируем автора");
                job.add("changeAuthor", joAuthor);
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/updateAuthor":
                jr = Json.createReader(request.getInputStream());
                jo = jr.readObject();
                name = jo.getString("name","");
                lastname = jo.getString("lastname","");
                year = jo.getString("year","");
                day = jo.getString("day","");
                month = jo.getString("month","");
                String id = jo.getString("id","");
                Author changeAuthor = authorFacade.find(Long.parseLong(id));
                changeAuthor.setName(name);
                changeAuthor.setLastname(lastname);
                changeAuthor.setDay(Integer.parseInt(day));
                changeAuthor.setYear(Integer.parseInt(year));
                changeAuthor.setMonth(Integer.parseInt(month));
                try {
                    authorFacade.edit(changeAuthor);
                    job.add("status", true);
                    job.add("info", "Автор успешно изменен");
                } catch (Exception e) {
                    job.add("status", false);
                    job.add("info", "Изменить автора не удалось");
                }
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/createBook":
                String caption = request.getParameter("caption");
                String[] authorsId = request.getParameterValues("authors");
                String publishedYear = request.getParameter("publishedYear");
                String price = request.getParameter("price");
                Part part = request.getPart("cover");
                String filename = getFileName(part);
                String pathToFile = pathToDir+File.separator+filename;
                File file = new File(pathToFile);
                file.mkdirs();
                try(InputStream fileContent = part.getInputStream()){
                    Files.copy(fileContent, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
                }
                Book newBook = new Book();
                newBook.setCaption(caption);
                newBook.setPrice(price);
                newBook.setCover(pathToFile);
                newBook.setPublishedYear(Integer.parseInt(publishedYear));
                List<Author> authors = new ArrayList<>();
                for (int i = 0; i < authorsId.length; i++) {
                    authors.add(authorFacade.find(Long.parseLong(authorsId[i])));
                }
                newBook.setAuthors(authors);
                try {
                    bookFacade.create(newBook);
                    job.add("status", true);
                    job.add("info", "Добавлена новая книга");
                } catch (Exception e) {
                    job.add("status", false);
                    job.add("info", "Добавить книгу не удалось");
                }
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/getListBooks":
                List<Book> books = bookFacade.findAll();
                job.add("status", true);
                job.add("info", "Список книг");
                job.add("books", new BookJsonBuilder().getJsonArrayBooks(books));
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case  "/getChangeBook":
                String changeBookId = request.getParameter("changeBookId");
                Book changeBook = bookFacade.find(Long.parseLong(changeBookId));
                job.add("status", true);
                job.add("info", "Редактируем книгу");
                job.add("changeBook", new BookJsonBuilder().getJsonObjectBook(changeBook));
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/getListCoverFileNames":
                List<String> coverFileNames = new ArrayList<>();
                File uploadDirFolder = new File(pathToDir);
                File[] listOfFiles = uploadDirFolder.listFiles();
                for (int i = 0; i < listOfFiles.length; i++) {
                    if(listOfFiles[i].isFile()){
                        coverFileNames.add(listOfFiles[i].getName());
                    }
                }
                JsonArrayBuilder jab = Json.createArrayBuilder();
                for (int i = 0; i < coverFileNames.size(); i++) {
                    jab.add(coverFileNames.get(i));
                }
                job.add("status", true);
                job.add("info", "список имен файлов обложек");
                job.add("coverFileNames", jab.build());
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/updateBook":
                id = request.getParameter("id");
                caption = request.getParameter("caption");
                authorsId = request.getParameterValues("authors");
                publishedYear = request.getParameter("publishedYear");
                price = request.getParameter("price");
                try {
                    part = request.getPart("cover");
                    if(part == null) throw new Exception();
                    filename = getFileName(part);
                    pathToFile = pathToDir+File.separator+filename;
                    file = new File(pathToFile);
                    file.mkdirs();
                    try(InputStream fileContent = part.getInputStream()){
                        Files.copy(fileContent, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
                    }
                } catch (Exception e) {
                    filename = request.getParameter("coverFileName");
                    pathToFile = pathToDir+File.separator+filename;
                }
                Book updateBook = bookFacade.find(Long.parseLong(id));
                updateBook.setCaption(caption);
                updateBook.setPrice(price);
                updateBook.setPublishedYear(Integer.parseInt(publishedYear));
                authors = new ArrayList<>();
                for (int i = 0; i < authorsId.length; i++) {
                    authors.add(authorFacade.find(Long.parseLong(authorsId[i])));
                }
                updateBook.setAuthors(authors);
                updateBook.setCover(pathToFile);
                bookFacade.edit(updateBook);
                job.add("status", true);
                job.add("info", "книга изменена");
                
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
        }
    }
    private String getFileName(Part part){
        final String partHeader = part.getHeader("content-disposition");
        for (String content : part.getHeader("content-disposition").split(";")){
            if(content.trim().startsWith("filename")){
                return content
                        .substring(content.indexOf('=')+1)
                        .trim()
                        .replace("\"",""); 
            }
        }
        return null;
    }
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
