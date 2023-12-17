package common.exception;

;

/**
 * The AimsException wraps all unchecked exceptions You can use this
 * exception to inform
 * 
 * @author nguyenlm
 */
// The Open Closed Principle
public class AimsException extends RuntimeException {

	public AimsException() {

	}

	public AimsException(String message) {
		super(message);
	}
}