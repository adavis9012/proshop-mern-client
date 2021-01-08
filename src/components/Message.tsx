import React from "react";
import {Alert} from "react-bootstrap";
import {Variant} from "react-bootstrap/types";

interface MessageProps{
    variant?: Variant
}

const Message: React.FC<React.PropsWithChildren<MessageProps>> = ({variant, children}) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    );
};

Message.defaultProps = {
    variant: 'info',
};

export default Message;
