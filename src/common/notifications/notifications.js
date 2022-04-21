import { Notification } from "rsuite";

const successNotification = (content) => {
    return (
        <Notification type='success' header='Transaction succeeded' closable>
            <div>{content}</div>
        </Notification>
    );
};

const errorNotification = (error) => {
    return (
        <Notification type='error' header='Transaction failed' closable>
            <div>{error.message}</div>
        </Notification>
    );
};

const loadingNotification = (txid) => {
    return (
        <Notification type='info' header='Transaction initiated' closable>
            <div style={{'wordWrap': 'break-word'}}>TXID: {txid}</div>
        </Notification>
    );
};

export {
    successNotification,
    errorNotification,
    loadingNotification
}