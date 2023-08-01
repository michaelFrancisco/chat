import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import {io} from "socket.io-client";
import {type ChatMessage, type JoinedProps, type JoinRoomProps, type User} from "common";

// Open issue regarding inferred types
// https://github.com/microsoft/TypeScript/issues/47663
export const useChatStore = defineStore('socket', () => {
    const url = import.meta.env.VITE_SERVER_URL;
    const socket = ref(io(url, {autoConnect: false, path: '/chat'}));
    const connected = computed(() => socket.value.connected)
    
    const messages = ref([] as Array<ChatMessage>)
    const users = ref([] as Array<User>)

    function connect() {
        if (socket.value.disconnected) socket.value.connect()
    }

    function disconnect() {
        socket.value.disconnect()
    }

    function sendMessage(msg: string) {
        socket.value.emit('message', msg)
    }

    function join(username: string, avatar: string, roomId: string) {
        messages.value = []
        users.value = []
        socket.value.emit('join', {username, roomId, avatar} as JoinRoomProps)
    }

    socket.value.on("connect", () => {
        console.log('connected')
    });

    socket.value.on("message", (msg: ChatMessage) => {
        console.log({msg})
        messages.value.push(msg)
    });
    
    socket.value.on("joined", (props: JoinedProps) => {
        messages.value = props.messages
        users.value = props.users
    });

    socket.value.on("disconnect", () => {
        console.log('disconnected')
    });

    return {
        socket,
        connected,
        connect,
        disconnect,
        sendMessage,
        join,
        messages,
        users
    }
})
