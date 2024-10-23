const chatbotResponses = {
    hello: "Halo! Bagaimana kabar Anda hari ini?",
    goodbye: "Selamat tinggal! Senang berbincang dengan Anda.",
    recommend: [
        "Nasi Goreng",
        "Sate Ayam",
        "Rendang",
        "Gado-Gado",
        "Soto Ayam",
        "Bakso",
        "Nasi Padang",
        "Mie Goreng",
    ],
    destinations: [
        { 
            name: "Bali", 
            attractions: ["Pantai Kuta", "Ubud", "Tanah Lot"], 
            city: "Denpasar",
            description: "Bali adalah pulau yang terkenal dengan budaya dan keindahan alamnya.",
            events: ["Festival Kecak", "Hari Raya Nyepi"],
            weather: "Tropis",
            transportation: "Taxi, Bus, Rental Mobil",
            restaurant: "Naughty Nuri's, Bebek Bengil, Warung Cisu"
        },
        { 
            name: "Lombok", 
            attractions: ["Pantai Senggigi", "Gili Trawangan", "Air Terjun Tiu Kelep"], 
            city: "Mataram",
            description: "Lombok dikenal dengan pantai-pantai yang indah dan Gunung Rinjani.",
            events: ["Festival Bau Nyale"],
            weather: "Tropis",
            transportation: "Taxi, Bus, Rental Mobil",
            restaurant: "Taliwang Restaurant, Warung Menega, El Bazar Cafe"
        },
        // Tambahkan destinasi lain dengan cara yang sama...
    ],
};

function getRandomRecommendation() {
    const recommendations = chatbotResponses.recommend;
    const randomIndex = Math.floor(Math.random() * recommendations.length);
    return recommendations[randomIndex];
}

function getRandomDestination() {
    const destinations = chatbotResponses.destinations;
    const randomIndex = Math.floor(Math.random() * destinations.length);
    return destinations[randomIndex];
}

function getAttractionsForDestination(destinationName) {
    const destination = chatbotResponses.destinations.find(dest => dest.name.toLowerCase() === destinationName.toLowerCase());
    if (destination) {
        const randomAttractionIndex = Math.floor(Math.random() * destination.attractions.length);
        return { 
            attraction: destination.attractions[randomAttractionIndex], 
            city: destination.city,
            description: destination.description,
            events: destination.events,
            weather: destination.weather,
            transportation: destination.transportation,
            restaurant: destination.restaurant 
        };
    }
    return null;
}

function handleInput(input) {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("halo") || lowerInput.includes("hai")) {
        return chatbotResponses.hello;
    } else if (lowerInput.includes("selamat tinggal") || lowerInput.includes("goodbye")) {
        return chatbotResponses.goodbye;
    } else if (lowerInput.includes("rekomendasi makanan")) {
        return `Ini dia rekomendasi makanan dari kami: ${getRandomRecommendation()}`;
    } else if (lowerInput.includes("rekomendasi tempat staycation") || lowerInput.includes("rekomendasi tempat liburan") || lowerInput.includes("rekomendasi destinasi wisata")) {
        const destination = getRandomDestination();
        const { attraction, city, description, events } = getAttractionsForDestination(destination.name);
        return `Ini dia rekomendasi destinasi wisata dari kami: ${destination.name}. Anda harus mengunjungi ${attraction}! ${description} Acara yang akan datang: ${events.join(", ")}.`;
    } else if (lowerInput.includes("cuaca")) {
        const destination = getRandomDestination();
        const weather = getAttractionsForDestination(destination.name).weather;
        return `Cuaca di ${destination.name} adalah ${weather}.`;
    } else if (lowerInput.includes("transportasi")) {
        const destination = getRandomDestination();
        const transportation = getAttractionsForDestination(destination.name).transportation;
        return `Transportasi di ${destination.name} adalah ${transportation}.`;
    } else if (lowerInput.includes("tempat makan")) {
        const destination = getRandomDestination();
        const restaurant = getAttractionsForDestination(destination.name).restaurant;
        return `Tempat makan yang direkomendasikan di ${destination.name} adalah ${restaurant}.`;
    } else {
        return "Saya tidak mengerti itu. Coba lagi!";
    }
}

document.getElementById("send-button").addEventListener("click", function() {
    const userInput = document.getElementById("user-input").value;
    if (userInput) {
        const chatBox = document.getElementById("chat-box");
        chatBox.innerHTML += `<div><strong>Anda:</strong> ${userInput}</div>`;
        
        const botResponse = handleInput(userInput);
        chatBox.innerHTML += `<div><strong>Bot:</strong> ${botResponse}</div>`;
        
        document.getElementById("user-input").value = ""; // Reset input
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll ke bawah
    }
});

document.getElementById("clear-button").addEventListener("click", function() {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = ""; // Menghapus semua isi chat
});

// Mendapatkan elemen chat box dan input pengguna
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Fungsi untuk menambahkan pesan ke chat box
function addMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.innerHTML = `<span class="${type}">${type === 'bot' ? 'Nina Chatbot' : 'User'} :</span> ${message}`;
    chatBox.appendChild(messageElement);
}

// Menambahkan pesan perkenalan bot
addMessage('Halo! Saya Nina Chatbot. Ada yang bisa saya bantu?', 'bot');

// Event listener untuk tombol kirim
sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        userInput.value = '';
        // Tambahkan logika untuk menanggapi pesan pengguna di sini
    }
});

