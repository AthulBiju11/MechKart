package com.mechkart.mechkart_backend.entity;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "products")
public class Product {

    @Id
    private String id;

    private String title;

    private String img;

    private String cat;

    private double price;

    private ProductAttributes attribute = new ProductAttributes();

    public Product() {
    }

    public Product(String id, String title, String img, String cat, double price, ProductAttributes attribute) {
        this.id = id;
        this.title = title;
        this.img = img;
        this.cat = cat;
        this.price = price;
        this.attribute = attribute;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getCat() {
        return cat;
    }

    public void setCat(String cat) {
        this.cat = cat;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public ProductAttributes getAttribute() {
        return attribute;
    }

    public void setAttribute(ProductAttributes attribute) {
        this.attribute = attribute;
    }

    @Data
    public static class ProductAttributes {
        private boolean featured = false;
        private boolean latest = false;
        private boolean trending = false;

        public ProductAttributes() {
        }

        public ProductAttributes(boolean featured, boolean latest, boolean trending) {
            this.featured = featured;
            this.latest = latest;
            this.trending = trending;
        }

        public boolean isFeatured() {
            return featured;
        }

        public void setFeatured(boolean featured) {
            this.featured = featured;
        }

        public boolean isLatest() {
            return latest;
        }

        public void setLatest(boolean latest) {
            this.latest = latest;
        }

        public boolean isTrending() {
            return trending;
        }

        public void setTrending(boolean trending) {
            this.trending = trending;
        }
    }
}
