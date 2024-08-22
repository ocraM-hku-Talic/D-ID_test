import * as sdk from "@d-id/client-sdk";

new Vue({
    el: '#app',
    data: {
        message: '',
        agentManager: null
    },
    methods: {
        async sendMessage() {
            try {
                await this.agentManager.sendMessage({ text: this.message });
                console.log("Message sent:", this.message);
                this.message = ''; // Clear the input field
            } catch (error) {
                console.error("Failed to send message:", error);
            }
        }
    },
    async created() {
        let agentId = "agt_FFLXUvoT";
        let auth = {
            type: 'key', 
            clientKey: "YXV0aDB8NjZiMDMyNTUzOTNiZGMyZWE3OGQ5YmFmOng4TzFHaGtIZkt6TGVSRERzc245aw=="
        };

        const callbacks = {
            onMessage: (message) => {
                console.log("Received message:", message);
                const messageContainer = document.getElementById('messages');
                const messageElement = document.createElement('p');
                messageElement.textContent = message.text;
                messageContainer.appendChild(messageElement);
            },
            onError: (error) => {
                console.error("Error:", error);
            }
        };

        let streamOptions = { compatibilityMode: "auto", streamWarmup: true };

        try {
            this.agentManager = await sdk.createAgentManager(agentId, { auth, callbacks, streamOptions });
            console.log("Agent Manager created successfully");
        } catch (error) {
            console.error("Failed to create Agent Manager:", error);
        }
    }
});
