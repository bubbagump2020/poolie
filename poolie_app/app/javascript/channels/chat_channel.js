import consumer from "./consumer"

consumer.subscriptions.create({ channel: 
"ChatChannel", room: "Best Room"}, {
    received(data){
        this.appendLine(data)
    },

    appendLine(data){
        const html = this.createLine(data)
        const element = document.querySelector("[data-chat-room='Best Room']")
        element.insertAdjacentHTML("beforeend", html)
    },

    createLine(data){
        return
            <article class="chat-line">
                <span class="speaker">${data["sent_by"]}</span>
                <span class="body">${data["body"]}</span>
            </article>
    }
})


// When a consumer is subscribed to a channel, they act as a subscriber
// This connection is called a subscription. INcoming Messages
// are then routed to these channel subscriptions based on an identifier sent by the cable consumer

