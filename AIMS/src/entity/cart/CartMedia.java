package entity.cart;

import entity.media.Media;

// no datacoupling
// no stampcoupling 
// functional cohesion 
public class CartMedia {
    
    private Media media;
    private int quantity;
    private int price;

    public CartMedia(){

    }

    // import cart but not used ? 
    public CartMedia(Media media, Cart cart, int quantity, int price) {
        this.media = media;
        this.quantity = quantity;
        this.price = price;
    }
    // Logical Cohesion
    public Media getMedia() {
        return this.media;
    }
    // Logical Cohesion
    public void setMedia(Media media) {
        this.media = media;
    }
    // Logical Cohesion
    public int getQuantity() {
        return this.quantity;
    }
    // Logical Cohesion
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    // Logical Cohesion
    public int getPrice() {
        return this.price;
    }
    // Logical Cohesion
    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "{" 
            + " media='" + media + "'" 
            + ", quantity='" + quantity + "'" 
            + "}";
    }

}

    
