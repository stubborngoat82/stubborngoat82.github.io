document.addEventListener('DOMContentLoaded', () => {
    const contacts = [{ id: 1, name: 'John Doe', phone: '+18777804236' }, {id: 2, name: 'Wesley Thompson', phone: '+16232412549'}, {id:3, name:'Test Phone', phone: '+14806085081'}, { id: 4, name: 'John Doe', phone: '+18777804236' }, {id: 5, name: 'Wesley Thompson', phone: '+16232412549'}, {id:6, name:'Test Phone', phone: '+14806085081'}];
   
    let selectedContact = null;
    let selectedMessage = null;

    const contactsList = document.getElementById('contacts-list');
    const messagesList = document.getElementById('messages-interface');
    const categoriesInterface = document.getElementById('categories-interface');
    const sendButton = document.getElementById('send-button');
    const contactsInterface = document.getElementById('contacts-interface');

    const cannedMessagesByCategory = {
        "Basic Needs & Comfort": [
            "Please bring me some water.",
            "I need help getting to the restroom.",
            "Could you adjust my pillows/bedding?",
            "I'm feeling cold. Can you bring me an extra blanket?",
            "Please open/close the window.",
            "Could you turn the lights on/off?",
            "I need to change my position.  Can you help me move?",
            "I'm in pain.  Can you check onmy medication?"
            // More messages in this category...
        ],
        "Meals & Dietary Needs": [
            "I'm ready for my next meal. Can we go over the menu options?",
            "I'm feeling hungry. Can I have a snack?",
            "Can you help me with my meal?  I need assistance eating.",
            "Plesae bring me my medication with my meal."
            // More messages in this category...
        ],
        "Personal Care": [
            "I need assistance with personal grooming.",
            "It's time for my bath. Can you help me prepare?",
            "I need fresh clothing."
            // More messages in this category...
        ],
        "Entertainment & Social Interaction": [
            "Can you bring me a book to read or my reading device?",
            "I'd like to watch TV.  Can you turn it on and set it to my favorite channel?",
            "I'm feeling lonely.  Can you stay and chat for a while?",
            "Can you st up a call with my family/friend?"
        ],
        "Health & Wellbeing": [
            "I need to speak with a doctor/nurse about how I'm feeling.",
            "Can we go over my treatment plan or medication schedule.",
            "I'm feeling anxious.  Can we talk about it.",
        ],
        "Miscellaneous Requests": [
            "Can you update me on today's news/weather?",
            "I would like some quiet time now.  Please minimize interruptions.",
            "Please let me know when my next visitor arrives."
        ],
        "Emergencies": [
            "I need help immediately.  Please come quickly!",
            "I think there's an emergency.  Can you check on me?"
        ]
        // Add more categories and messages as needed...
    };

    //Initialize UI
    sendButton.style.display= 'none';
    categoriesInterface.style.display= 'none';
    messagesList.style.display= 'none';
    populateContacts();




    function selectContact(contact) {
        selectedContact = contact;
        contactsList.style.display = 'none';
        openCategoriesInterface();
        updateSelectedInfo();
    }

    function populateContacts () {
        contactsInterface.innerHTML = '';
        contacts.forEach(contact => {
            const contactElement = document.createElement('button');
            contactElement.className='contact-btn';
            contactElement.textContent = contact.name;
            contactElement.addEventListener('click', () => selectContact(contact));
        contactsInterface.appendChild(contactElement);
        });
    }

    function openCategoriesInterface() {
        categoriesInterface.innerHTML = '';
        Object.keys(cannedMessagesByCategory).forEach(category => {
            const categoryElement = document.createElement('button');
            categoryElement.className = 'category-btn';
            categoryElement.textContent = category;
            categoryElement.onclick = () => openMessageInterface(category);
            categoriesInterface.appendChild(categoryElement);
        });
        categoriesInterface.style.display= 'block';

    }

    function openMessageInterface(category) {
        categoriesInterface.style.display = 'none';
        messagesList.innerHTML = '';
        cannedMessagesByCategory[category].forEach(message => {
            const messageElement = document.createElement('button');
            messageElement.className = 'message-btn';
            messageElement.textContent = message;
            messageElement.addEventListener('click', () => {
                selectedMessage = message;
                messagesList.style.display= 'none';
                sendButton.style.display= 'block';
                updateSelectedInfo();
            });
            messagesList.appendChild(messageElement);
        });
        messagesList.style.display = 'block';
    }

    sendButton.addEventListener('click', () => {
        sendMessage(selectedContact, selectedMessage);
        sendButton.style.display = 'none';
    });

    function sendMessage(contact, message) {
        if (!contact || !message) {
            alert('No contact or message selected!');
            return;
        }

        fetch('https://subtle-rat-free.ngrok-free.app/send-sms', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                to: contact.phone,
                body: message,
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('SMS sent:', data);
            alert('Message sent successfully!');
        })
        .catch(error => console.error('Error:', error));
    }

    function updateSelectedInfo() {
        const selectedInfo = document.getElementById('selected-info');
        selectedInfo.innerHTML = ''; // Clear previous selections
    
        if (selectedContact) {
            const contactInfo = document.createElement('div');
            contactInfo.className = 'selected-info-item';
            contactInfo.textContent = `Selected Contact: ${selectedContact.name}`;
            selectedInfo.appendChild(contactInfo);
        }
    
        if (selectedMessage) {
            const messageInfo = document.createElement('div');
            messageInfo.className = 'selected-info-item';
            messageInfo.textContent = `Selected Message: ${selectedMessage}`;
            selectedInfo.appendChild(messageInfo);
        }
    }
    
    // Call this function within selectContact and selectMessage after setting the selected values.
    

    openCategoriesInterface();

});

       
