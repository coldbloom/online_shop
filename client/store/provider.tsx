import {Provider} from "react-redux";
import {store} from "../store";

export function provider({children}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}