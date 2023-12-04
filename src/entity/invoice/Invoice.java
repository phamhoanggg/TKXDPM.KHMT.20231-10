package entity.invoice;

import entity.order.Order;

// no data coupling
public class Invoice {

    private Order order;
    private int amount;
    
    public Invoice(){

    }
    // Logical Cohesion
    public Invoice(Order order){
        this.order = order;
    }
    // Logical Cohesion
    public Order getOrder() {
        return order;
    }
    // Logical Cohesion
    public void setAmount(int amount) {
        this.amount = amount;
    }
    // Logical Cohesion
    public int getAmount() {
        return amount;
    }

    public void saveInvoice(){
        
    }
}
