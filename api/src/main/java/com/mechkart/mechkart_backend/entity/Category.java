package com.mechkart.mechkart_backend.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "categorycards")
public class Category {

    @Id
    private String id;

    private String title;

    private String img;

    private String cat;

    public Category(String id, String title, String img, String cat) {
        this.id = id;
        this.title = title;
        this.img = img;
        this.cat = cat;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getImg() {
        return img;
    }

    public String getCat() {
        return cat;
    }
}
