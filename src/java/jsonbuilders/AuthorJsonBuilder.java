/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jsonbuilders;

import entity.Author;
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
public class AuthorJsonBuilder {
    public JsonObject getJsonObjectAuthor(Author author){
        JsonObjectBuilder job = Json.createObjectBuilder();
        job.add("id", author.getId());
        job.add("name", author.getName());
        job.add("lastname", author.getLastname());
        job.add("year", author.getYear());
        job.add("day", author.getDay());
        job.add("month", author.getMonth());
        return job.build();
    }
    public JsonArray getJsonArrayAuthors(List<Author> authors){
        JsonArrayBuilder jab = Json.createArrayBuilder();
        for (int i = 0; i < authors.size(); i++) {
            jab.add(getJsonObjectAuthor(authors.get(i)));
        }
        return jab.build();
    }
}
