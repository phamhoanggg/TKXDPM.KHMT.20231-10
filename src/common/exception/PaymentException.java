package common.exception;

;
//The Open Closed Principle
public class PaymentException extends RuntimeException {
	public PaymentException(String message) {
		super(message);
	}
}
