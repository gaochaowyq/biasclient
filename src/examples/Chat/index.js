import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {useRef, useState,useEffect} from "react";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
    Conversation,
    ConversationHeader
} from "@chatscope/chat-ui-kit-react";

const AiChat = ({question,aicallback}) => {
    const inputRef = useRef();
    const [msgInputValue, setMsgInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([]);
    useEffect(
        ()=>{
            setMessages([...messages, {
            message:aicallback,
            direction: 'incoming'
        }
        ]);
            setIsTyping(false)
        },[aicallback]
    )


    const handleSend = message => {
        setMessages([...messages, {
            message:message,
            direction: 'outgoing'
        }
        ]);
        question(message)
        setMsgInputValue("");
        inputRef.current.focus();
        setIsTyping(true)
    };

    return (
        <div style={{height: "90vh"}}>
            <MainContainer>
                <ChatContainer>
                    <ConversationHeader>
                        <ConversationHeader.Back/>
                        <ConversationHeader.Content userName="AI建筑师"/>
                    </ConversationHeader>
                    <MessageList scrollBehavior="smooth"
                                 typingIndicator={
                        isTyping&&<TypingIndicator content="AI is typing"/>
                    }
                    >
                        {messages.map((m, i) => <Message key={i} model={m}/>)}
                    </MessageList>
                    <MessageInput placeholder="Type message here" onSend={handleSend} onChange={setMsgInputValue}
                                  value={msgInputValue} ref={inputRef}/>
                </ChatContainer>
            </MainContainer>
        </div>

    )
}

export {AiChat}