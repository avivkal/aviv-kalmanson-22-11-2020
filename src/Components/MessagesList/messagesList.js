import React from 'react'
import './messagesList.scss'
import { isPartOfString } from '../../UtilityFunctions/functions'
import Message from '../Message/message'
import PropTypes from 'prop-types';
import { messagesExist } from '../../UtilityFunctions/functions'
const messagesList = (props) => {
    if (messagesExist(props.messages)) {
        return props.messages.filter(current => isPartOfString(current, props.submitText, props.isReceiver) || props.submitText === '')
            .map(current => {
                return <Message messageContent={current}
                    key={current._id}
                    delete={() => props.delete(current._id)}
                    openMail={() => props.openPrompt(
                        'To:' + current.receiver,
                        current.message,
                        'Subject: ' + current.subject,
                    )}
                />
            })
    }
    return (
        <h1 className="nothing-found">No messages found</h1>
    );
}

messagesList.propTypes = {
    submitText: PropTypes.string,
    isReceiver: PropTypes.bool,
    messages: PropTypes.array,
    openPrompt: PropTypes.func,
    delete: PropTypes.func,
};

export default messagesList;