document.addEventListener('DOMContentLoaded', async () => {
    const wishlistsContainer = document.getElementById('wishlists-container');

    // Fetch all wishlists for the user
    const response = await fetch('/api/wishlists', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'), // Assuming the token is stored in localStorage
        }
    });

    const wishlists = await response.json();

    // Display each wishlist
    wishlists.forEach(wishlist => {
        const wishlistElement = document.createElement('div');
        wishlistElement.classList.add('wishlist');
        wishlistElement.innerHTML = `
            <h2>${wishlist.name}</h2>
            <div class="wishlist-items">
                ${wishlist.items.map(item => `
                    <div class="wishlist-item">
                        <span>${item.name}</span>
                        <button class="provide-item" data-id="${item._id}" ${item.isProvided ? 'disabled' : ''}>${item.isProvided ? 'Provided' : 'Provide'}</button>
                    </div>
                `).join('')}
            </div>
        `;
        wishlistsContainer.appendChild(wishlistElement);
    });
});

// Handle providing items
document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('provide-item')) {
        const itemId = e.target.getAttribute('data-id');

        const response = await fetch(`/api/items/${itemId}/provide`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'), // Assuming the token is stored in localStorage
            }
        });

        if (response.ok) {
            e.target.textContent = 'Provided';
            e.target.disabled = true;
        }
    }
});

// Handle creating a new wishlist
document.getElementById('create-wishlist').addEventListener('click', async () => {
    const name = prompt('Enter the name of the new wishlist:');
    if (name) {
        const response = await fetch('/api/wishlists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'), // Assuming the token is stored in localStorage
            },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            location.reload(); // Reload the page to see the new wishlist
        }
    }
});
