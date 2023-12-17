package views.screen.popup;

import java.io.IOException;

import javafx.animation.PauseTransition;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.image.ImageView;
import javafx.scene.shape.Circle;
import javafx.stage.Popup;
import javafx.stage.Stage;
import javafx.stage.StageStyle;
import javafx.util.Duration;
import utils.Configs;
import views.screen.BaseScreenHandler;

// datacoupling with CONFIGS
// datacoupling with BaseScreenHandler
// no LSP violation found
public class PopupScreen extends BaseScreenHandler{
    

    @FXML
    ImageView tickicon;

    @FXML
    Label message;

    // use Configs.POPUP_PATH
    public PopupScreen(Stage stage) throws IOException{
        super(stage, Configs.POPUP_PATH);
    }
    // Control couping
    private static PopupScreen popup(String message, String imagepath, Boolean undecorated) throws IOException{
        PopupScreen popup = new PopupScreen(new Stage());
        if (undecorated) popup.stage.initStyle(StageStyle.UNDECORATED);
        popup.message.setText(message);
        popup.setImage(imagepath);
        return popup;
    }

    // use Configs.IMG_PATH
    public static void success(String message) throws IOException{
        popup(message, Configs.IMAGE_PATH + "/" + "tickgreen.png", true).show(true);
    }

    public static void error(String message) throws IOException{
        popup(message, Configs.IMAGE_PATH + "/" + "tickerror.png", false).show(false);
    }

    public static PopupScreen loading(String message) throws IOException{
        return popup(message, Configs.IMAGE_PATH + "/" + "loading.gif", true);
    }

    public void setImage(String path) {
        super.setImage(tickicon, path);
    }

    public void show(Boolean autoclose) {
        super.show();
        if (autoclose) close(0.8);
    }

    public void show(double time) {
        super.show();
        close(time);
    }

    public void close(double time){
        PauseTransition delay = new PauseTransition(Duration.seconds(time));
        delay.setOnFinished( event -> stage.close() );
        delay.play();
    }
}
