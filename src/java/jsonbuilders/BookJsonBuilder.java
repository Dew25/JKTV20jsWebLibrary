/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jsonbuilders;

import entity.Book;
import java.util.List;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author teacher
 */
public class BookJsonBuilder {
    public JsonObject getJsonObjectBook(Book book){
        JsonObjectBuilder job = Json.createObjectBuilder();
        job.add("id", book.getId());
        job.add("caption", book.getCaption());
        job.add("publishedYear", book.getPublishedYear());
        job.add("price", book.getPrice());
        job.add("cover", book.getCover());
        job.add("authors", new AuthorJsonBuilder().getJsonArrayAuthors(book.getAuthors()));
        return job.build();
    }
    public JsonArray getJsonArrayBooks(List<Book> books){
        JsonArrayBuilder jab = Json.createArrayBuilder();
        for (int i = 0; i < books.size(); i++) {
            jab.add(getJsonObjectBook(books.get(i)));
        }
        return jab.build();
    }
}
