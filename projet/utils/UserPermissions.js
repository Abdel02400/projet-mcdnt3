import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

class UserPermissions {
    getCameraPermission = async () => {
        if (Constants.platform.ios) {
            const { statusCamera } = await Permissions.askAsync(Permissions.CAMERA);
            const { statusCameraRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

/*            if (statusCamera !== "granted" && statusCameraRoll !== "granted") {
                alert("Nous avons besoin des permissions, si vous voulez ajouter une photo.");
            }*/
        }
    };
}

export default new UserPermissions();