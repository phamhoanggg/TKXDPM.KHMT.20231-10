package controller;

import java.util.List;

import entity.cart.Cart;
import entity.cart.CartMedia;
import entity.media.Media;

/**
 * This class is the base controller for our AIMS project
 * 
 * @author nguyenlm
 */
// funcitonal cohesion
// communicational cohesion
// The Open Closed Principle
public class BaseController {

    /**
     * The method checks whether the Media in Cart, if it were in, we will return
     * the CartMedia else return null
     * 
     * @param media
     * @return CartMedia or null
     */
    // datacoupling with Cart
    // use Cart.getCart().checkMediaInCart ...
    public CartMedia checkMediaInCart(Media media) {
        return Cart.getCart().checkMediaInCart(media);
    }
    
    /**
     * This method gets the list of items in cart
     * 
     * @return List[CartMedia]
     */
    // datacoupling with cart
    // use Cart.getCart().getListMedia();
    public List getListCartMedia() {
        return Cart.getCart().getListMedia();
    }
}
