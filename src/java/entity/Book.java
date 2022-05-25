/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 *
 * @author Melnikov
 */
@Entity
public class Book implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String caption;
    @OneToOne
    private List<Author> authors;
    private int publishedYear;
    private String price;
    private String cover;
    
    public Book() {
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public List<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(List<Author> authors) {
        this.authors = authors;
    }

    public int getPublishedYear() {
        return publishedYear;
    }

    public void setPublishedYear(int publishedYear) {
        this.publishedYear = publishedYear;
    }
    
    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
    public BigDecimal getDecimalPrice() {
        return new BigDecimal(price);
    }

    public void setDecimalPrice(BigDecimal price) {
        this.price = price.toString();
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 31 * hash + Objects.hashCode(this.id);
        hash = 31 * hash + Objects.hashCode(this.caption);
        hash = 31 * hash + Objects.hashCode(this.authors);
        hash = 31 * hash + this.publishedYear;
        hash = 31 * hash + Objects.hashCode(this.price);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Book other = (Book) obj;
        if (this.publishedYear != other.publishedYear) {
            return false;
        }
        if (!Objects.equals(this.caption, other.caption)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.authors, other.authors)) {
            return false;
        }
        if (!Objects.equals(this.price, other.price)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        StringBuilder authorsStr = new StringBuilder();
        authorsStr.append("[");
        for(Author a : authors){
            authorsStr.append(a.getName());
            authorsStr.append(" ");
            authorsStr.append(a.getLastname());
            authorsStr.append(". ");
        }
        authorsStr.append("]");
        return "Book{" 
                + "id=" + id 
                + ", caption=" + caption 
                + ", authors=" + authorsStr.toString()
                + ", publishedYear=" + publishedYear 
                + ", price=" + price 
                + '}';
    }

    

   
}
