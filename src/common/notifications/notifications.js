import { Notification } from "rsuite";

const successNotification = (content) => {
    return (
        <Notification type='success' header='Transaction succeeded' closable>
            <div>{content}</div>
        </Notification>
    );
};

const errorNotification = (error) => {
    var reason = error.message;
    if (error.code == 4001) {
        reason = 'User denied the transaction';
    }
    else if (error.code == -32603) {
        reason = getRPCErrorMessage(error);
    }

    return (
        <Notification type='error' header='Transaction failed' closable>
            <div>{reason}</div>
        </Notification>
    );
};

function getRPCErrorMessage(err){
    const open = err.message.indexOf('revert');
    const close = err.message.indexOf('"', open + 7);
    const reason = err.message.substring(open + 7, close);
    return reason;
}

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