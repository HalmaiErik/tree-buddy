import { Notification } from "rsuite";

const successNotification = (content) => {
    return (
        <Notification type='success' header='Transaction succeeded' closable duration={10000}>
            <div>{content}</div>
        </Notification>
    );
};

const errorNotification = (error) => {
    var reason = error.message;

    if (error.code == 4001) {
        reason = 'User denied the transaction';
    }
    else {
        const endIndex = error.message.search('{')
        if (endIndex >= 0) {
            reason = error.message.substring(0, endIndex)
        }
    }

    return (
        <Notification type='error' header='Transaction failed' closable duration={10000}>
            <div>{reason}</div>
        </Notification>
    );
};

const loadingNotification = (txid) => {
    return (
        <Notification type='info' header='Transaction initiated' closable duration={10000}>
            <div style={{ 'wordWrap': 'break-word' }}>TXID: {txid}</div>
        </Notification>
    );
};

export {
    successNotification,
    errorNotification,
    loadingNotification
}