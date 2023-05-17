import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {useRef, useState, useEffect} from "react";
import {fetchChatGpt} from "../../util/bimmanagementAPI/chatGpt";
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
import {pdfjs} from "react-pdf";

const BatChatGptCom = ({token}) => {
    const inputRef = useRef();
    const [msgInputValue, setMsgInputValue] = useState("");
    const [returnInfo, setreturnInfo] = useState("hi,我可以帮助你什么？");
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([]);
    const gptchatHandle = async (prompt) => {
        const result = await fetchChatGpt(token, prompt)
        return JSON.parse(result).choices[0].message.content
    }
    useEffect(
        () => {
            setMessages([...messages, {
                message: returnInfo,
                direction: 'incoming'
            }
            ]);
            setIsTyping(false)
        }, [returnInfo]
    )


    const handleSend = message => {
        setMessages([...messages, {
            message: message,
            direction: 'outgoing'
        }
        ]);
        gptchatHandle(message).then(
            res => {

                setMsgInputValue("");
                inputRef.current.focus();
                setIsTyping(true)
                setreturnInfo(res)
            }
        )

    };

    return (
        <div style={{height: "90vh"}}>
            <MainContainer>
                <ChatContainer>
                    <ConversationHeader>
                        <ConversationHeader.Back/>
                        <ConversationHeader.Content userName="云梯&bull;聊"/>
                    </ConversationHeader>
                    <MessageList scrollBehavior="smooth"
                                 typingIndicator={
                                     isTyping && <TypingIndicator content="AI is typing"/>
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

export {BatChatGptCom}